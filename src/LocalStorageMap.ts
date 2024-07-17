import { SerializableValue } from "./Serializable";

export class LocalStorageMap<VALUE extends SerializableValue> implements Map<string, Readonly<VALUE>> {
    private data: Record<string, VALUE>;

    constructor(private readonly masterKey: string, private readonly storage: Storage = localStorage) {
        this.data = this.loadData();
    }

    public has(key: string): boolean {
        return key in this.data;
    }
    
    public get(key: string): Readonly<VALUE> | undefined {
        return this.data[key];
    }
    
    public set(key: string, value: VALUE): this {
        this.data[key] = value
        this.saveData();
        return this
    }

    public clear(): void {
        this.data = {};
        this.saveData();
    }

    public delete(key: string): boolean {
        if (this.has(key)) {
            delete this.data[key];
            this.saveData();
            return true;
        }
        return false;
    }

    public forEach(callback: (value: Readonly<VALUE>, key: string, map: Map<string, Readonly<VALUE>>) => void): void {
        Array.from(this.entries()).forEach(([key, value]) => callback(value, key, this));
    }

    public entries(): IterableIterator<[string, Readonly<VALUE>]> {
        return Object.entries(this.data)[Symbol.iterator]();
    }

    public keys(): IterableIterator<string> {
        return Object.keys(this.data)[Symbol.iterator]();
    }

    public values(): IterableIterator<Readonly<VALUE>> {
        return Object.values(this.data)[Symbol.iterator]();
    }

    public [Symbol.iterator](): IterableIterator<[string, Readonly<VALUE>]> {
        return this.entries();
    }

    public get size(): number {
        return Object.entries(this.data).length;
    }

    public get [Symbol.toStringTag](): string {
        return LocalStorageMap.name;
    }
    
    private saveData() {
        this.storage.setItem(this.masterKey, JSON.stringify(this.data));
    }

    private loadData(): Record<string, Readonly<VALUE>> {
        const value = this.storage.getItem(this.masterKey);
        if (value) {
            const parsed = JSON.parse(value);
            if (typeof parsed === 'object') {
                return parsed;
            }
        }
        return {};
    }
}
