declare type JsonField = boolean | number | string | null;
export interface JsonMap {
    [key: string]: JsonField | JsonMap | JsonArray;
}
export interface JsonArray extends Array<JsonField> {
}
export {};
