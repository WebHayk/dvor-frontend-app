import {DocumentType, KeyType} from "@typescript/interfaces";

export interface DocumentsReducerType {
    documents: DocumentType[],
    types: KeyType[],
    targetGroups: KeyType[],
    isUpdate: boolean
}