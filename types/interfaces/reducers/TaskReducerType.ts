import {TaskLogType, TaskType} from "@typescript/interfaces";

export interface TaskReducerType {
    tasks: {
        apartmentHouseId: number | null
        all: {
            count: number,
            data: TaskType[]
        },
        local: {
            count: number,
            data: TaskType[]
        },
        filters: {
            status: string | null,
            creationDate: number | null,
            query: string | null,
            urgently: boolean | null
        }
    },
    task: {
        data: TaskType | null,
        logs: TaskLogType[] | []
    }
}