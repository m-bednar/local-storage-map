import { stubInterface } from 'ts-sinon';
import { LocalStorageMap } from '../src/LocalStorageMap';
import { expect } from 'chai';

describe('LocalStorageMap', () => {
    describe('when asked if has key', () => {
        describe('and key does exists', () => {
            it('should return true', () => {
                const { localStorageMap } = setup({ key: 'value' });
                const result = localStorageMap.has('key');

                expect(result).to.be.true;
            });
        });

        describe('and key does not exists', () => {
            it('should return false', () => {
                const { localStorageMap } = setup();
                const result = localStorageMap.has('key');

                expect(result).to.be.false;
            });
        });
    });

    describe('when asked to set', () => {
        it('should set property onto stored object', () => {
            const { storage, localStorageMap, masterKey } = setup({ oldKey: 'value' });
            localStorageMap.set('newKey', 'another-value');

            expect(storage.setItem).to.be.calledOnceWithExactly(masterKey, JSON.stringify({
                oldKey: 'value',
                newKey: 'another-value'
            }));
        });
    });

    describe('when asked to get', () => {
        describe('and key does exists', () => {
            it('should return stored value', () => {
                const { localStorageMap } = setup({ key: 'value' });
                const result = localStorageMap.get('key');
    
                expect(result).to.be.equal('value');
            });
        });

        describe('and key does not exists', () => {
            it('should return undefined', () => {
                const { localStorageMap } = setup({});
                const result = localStorageMap.get('key');
    
                expect(result).to.be.undefined;
            });
        });
    });

    describe('when asked to clear', () => {
        it('should save empty object', () => {
            const { masterKey, storage, localStorageMap } = setup({});
            localStorageMap.clear();

            expect(storage.setItem).to.be.calledOnceWithExactly(masterKey, JSON.stringify({}));
        });
    });

    describe('when asked to delete key', () => {
        describe('and key does exists', () => {
            it('should return true and save object without the deleted key', () => {
                const { masterKey, storage, localStorageMap } = setup({ key: 'value', anotherKey: 'another-value' });
                const result = localStorageMap.delete('key');

                expect(result).to.be.true;
                expect(storage.setItem).to.be.calledOnceWithExactly(masterKey, JSON.stringify({ anotherKey: 'another-value' }));
            });
        });

        describe('and key does not exists', () => {
            it('should return false and not save stringthing', () => {
                const { storage, localStorageMap } = setup({});
                const result = localStorageMap.delete('key');

                expect(result).to.be.false;
                expect(storage.setItem).to.not.be.called;
            });
        });
    });

    describe('when called with forEach', () => {
        it('should call callback on every stored key-value', () => {
            const data: Record<string, string> = { key1: 'value1', key2: 'value2', key3: 'value3' };
            const { localStorageMap } = setup(data);

            localStorageMap.forEach((value, key, map) => {
                expect(key in data).to.be.true;
                expect(value).to.be.equal(data[key]);
                expect(map).to.be.equal(localStorageMap);
            });
        }); 
    });

    describe('when asked to get entries', () => {
        it('should return all entries', () => {
            const data: Record<string, string> = { key1: 'value1', key2: 'value2', key3: 'value3' };
            const { localStorageMap } = setup(data);

            const entries = Array.from(localStorageMap.entries());
            expect(entries).to.be.deep.equal([['key1', 'value1'], ['key2', 'value2'], ['key3', 'value3']]);
        }); 
    });

    describe('when asked to get keys', () => {
        it('should return all keys', () => {
            const data: Record<string, string> = { key1: 'value1', key2: 'value2', key3: 'value3' };
            const { localStorageMap } = setup(data);

            const entries = Array.from(localStorageMap.keys());
            expect(entries).to.be.deep.equal(['key1', 'key2', 'key3']);
        }); 
    });

    describe('when asked to get values', () => {
        it('should return all values', () => {
            const data: Record<string, string> = { key1: 'value1', key2: 'value2', key3: 'value3' };
            const { localStorageMap } = setup(data);

            const entries = Array.from(localStorageMap.values());
            expect(entries).to.be.deep.equal(['value1', 'value2', 'value3']);
        }); 
    });

    describe('when being iterated', () => {
        it('should iterate trough all entries', () => {
            const data: Record<string, string> = { key1: 'value1', key2: 'value2', key3: 'value3' };
            const { localStorageMap } = setup(data);

            for (const [key, value] of localStorageMap) {
                expect(key in data).to.be.true;
                expect(value).to.be.equal(data[key]);
            }
        }); 
    });

    describe('when asked for size', () => {
        it('should return number of entries', () => {
            const data: Record<string, string> = { key1: 'value1', key2: 'value2', key3: 'value3' };
            const { localStorageMap } = setup(data);
            const size = localStorageMap.size;
            
            expect(size).to.be.equal(3);
        }); 
    });
    
    describe('when asked for string tag', () => {
        it('should return its name', () => {
            const { localStorageMap } = setup();
            const stringTag = localStorageMap[Symbol.toStringTag];
            
            expect(stringTag).to.be.equal('LocalStorageMap');
        }); 
    });

    function setup(stored?: unknown) {
        const masterKey = 'test-master-key';
        const storage = stubInterface<Storage>();
        storage.getItem.returns(stored ? JSON.stringify(stored) : null);
        const localStorageMap = new LocalStorageMap(masterKey, storage);
        return { masterKey, storage, localStorageMap };
    }
});
