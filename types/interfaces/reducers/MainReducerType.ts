import {
    ApartmentUserType, MessageModel,
    UserProfileType,
    UserSessionType
} from "@typescript/interfaces";

export interface MainReducerType {
    isAuth: boolean,
    user: UserSessionType | null,
    profile: UserProfileType | null,
    messages: MessageModel[],
    isUpdate: boolean,
    users: {
        data: ApartmentUserType[] | [],
        isUpdate: boolean
    },
    show: {
        sidebar: boolean,
        notifications: boolean
    }
}