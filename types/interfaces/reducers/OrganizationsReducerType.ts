import {OrganizationsType} from "@typescript/interfaces";

export interface OrganizationsReducerType {
    organizations: OrganizationsType[],
    types: KeyType[],
    isUpdate: boolean,
    filters: {
        type: string
    }
}