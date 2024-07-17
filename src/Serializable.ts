export type SerializableValue = string | number | SerializableObject | SerializableArray;
export interface SerializableObject extends Record<string, SerializableValue> {};
export interface SerializableArray extends Array<SerializableValue> {};
