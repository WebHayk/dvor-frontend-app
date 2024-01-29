import {PollListType, PollType} from "../index";

export interface PollsReducerType {
    isUpdate: boolean,
    polls: {
        current: PollListType[],
        past: PollListType[],
        poll: PollType | null,
        pollIsUpdate: boolean
    },
    filters: {
        creationDate: string | null,
        type: string | null,
        query: string
    }
}