import { SerializableValue } from "./Serializable";

export interface DynamicStorageValue<VALUE extends SerializableValue> {
    get(): VALUE | undefined;
    set(value: VALUE): void;
}
