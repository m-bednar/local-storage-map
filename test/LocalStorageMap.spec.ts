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
            it('should return true and save object without the key', () => {
                const { masterKey, storage, localStorageMap } = setup({ key: 'value', anotherKey: 'another-value' });
                const result = localStorageMap.delete('key');

                expect(result).to.be.true;
                expect(storage.setItem).to.be.calledOnceWithExactly(masterKey, JSON.stringify({ anotherKey: 'another-value' }));
            });
        });

        describe('and key does not exists', () => {
            it('should return false and not save anything', () => {
                const { storage, localStorageMap } = setup({});
                const result = localStorageMap.delete('key');

                expect(result).to.be.false;
                expect(storage.setItem).to.not.be.called;
            });
        });
    });

    function setup(stored?: any) {
        const masterKey = 'test-master-key';
        const storage = stubInterface<Storage>();
        storage.getItem.returns(stored ? JSON.stringify(stored) : null);
        const localStorageMap = new LocalStorageMap(masterKey, storage);
        return { masterKey, storage, localStorageMap };
    }
});
