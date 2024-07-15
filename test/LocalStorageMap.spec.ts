import { stubInterface } from 'ts-sinon';
import { LocalStorageMap } from '../src/LocalStorageMap';
import { expect } from 'chai';

describe('LocalStorageMap', () => {
    describe('when constructed', () => {
        it('should try to get stored value from storage by master key', () => {
            const { storage, masterKey } = setup();
            expect(storage.getItem).to.be.calledOnceWithExactly(masterKey);
        });

        describe('and no value is stored in storage under master key', () => {
            it('should store new empty object in storage', () => {
                const { storage, masterKey } = setup();
                expect(storage.setItem).to.be.calledOnceWithExactly(masterKey, JSON.stringify({}));
            });
        });

        describe('and value stored in storage under master key is not object', () => {
            it('should store new empty object in storage', () => {
                const { storage, masterKey } = setup('non-object-value');
                expect(storage.setItem).to.be.calledOnceWithExactly(masterKey, JSON.stringify({}));
            });
        });
    });

    describe('when asked to set', () => {});

    describe('when asked to get', () => {});

    function setup(stored?: any) {
        const masterKey = 'test-master-key';
        const storage = stubInterface<Storage>();
        storage.getItem.returns(stored ? JSON.stringify(stored) : null);
        const localStorageMap = new LocalStorageMap(masterKey, storage);
        return { masterKey, storage, localStorageMap };
    }
});
