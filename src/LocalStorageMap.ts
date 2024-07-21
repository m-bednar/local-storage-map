import { DynamicStorageValue } from "./DynamicStorageValue";
import { SerializableValue } from "./Serializable";

export class LocalStorageMap<VALUE extends SerializableValue> implements Map<string, Readonly<VALUE>> {
    constructor(
        private readonly masterKey: string, 
        private readonly storage: Storage = localStorage
    ) {}

    public has(key: string): boolean {
        const data = this.loadData();
        return key in data;
    }
    
    public get(key: string): Readonly<VALUE> | undefined {
        const data = this.loadData();
        return data[key];
    }

    public dynamic(key: string): DynamicStorageValue<VALUE> | undefined {
        return {
            get: () => { return this.get(key); },
            set: (value) => { this.set(key, value); }
        };
    }
    
    public set(key: string, value: VALUE): this {
        const data = this.loadData();
        data[key] = value
        this.saveData(data);
        return this
    }

    public clear(): void {
        this.saveData({});
    }

    public delete(key: string): boolean {
        const data = this.loadData();
        if (key in data) {
            delete data[key];
            this.saveData(data);
            return true;
        }
        return false;
    }

    public forEach(callback: (value: Readonly<VALUE>, key: string, map: Map<string, Readonly<VALUE>>) => void): void {
        Array.from(this.entries()).forEach(([key, value]) => callback(value, key, this));
    }

    public entries(): IterableIterator<[string, Readonly<VALUE>]> {
        const data = this.loadData();
        return Object.entries(data)[Symbol.iterator]();
    }

    public keys(): IterableIterator<string> {
        const data = this.loadData();
        return Object.keys(data)[Symbol.iterator]();
    }

    public values(): IterableIterator<Readonly<VALUE>> {
        const data = this.loadData();
        return Object.values(data)[Symbol.iterator]();
    }

    public [Symbol.iterator](): IterableIterator<[string, Readonly<VALUE>]> {
        return this.entries();
    }

    public get size(): number {
        const data = this.loadData();
        return Object.entries(data).length;
    }

    public get [Symbol.toStringTag](): string {
        return LocalStorageMap.name;
    }
    
    private saveData(data: Record<string, VALUE>) {
        this.storage.setItem(this.masterKey, JSON.stringify(data));
    }

    private loadData(): Record<string, Readonly<VALUE>> {
        const value = this.storage.getItem(this.masterKey);
        return value ? this.loadValue(value) : {};
    }

    private loadValue(content: string): Record<string, Readonly<VALUE>> {
        const parsed = JSON.parse(content);
        return typeof parsed === 'object' ? parsed : {};
    }
}
