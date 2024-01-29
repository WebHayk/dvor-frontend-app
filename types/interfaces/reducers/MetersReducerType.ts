import {MetersType} from "@typescript/interfaces";

export interface MetersReducerType {
    meters: MetersType[] | [],
    meterRecords: any[] | [],
    filters: {
        types: string[] | null
    }
}