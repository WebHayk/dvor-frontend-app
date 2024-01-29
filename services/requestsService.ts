import React from "react";
import {apiService} from "./apiService";
import {USER_SESSION} from "@api/query/query";
import {
    CHAT_PRIVATE_INSERT,
    DELETE_MESSAGE,
    GET_PROFILE,
    INSERT_CHAT_DRAFT,
    LOGOUT,
    TASK_ESTIMATE,
    TASK_UPDATE,
    USER_ONLINE
} from "@api/mutations/mutations";
import {FormikValues} from "formik";

export class requestsService {
    static taskEstimate = (
            values: FormikValues,
            setOpen: React.Dispatch<boolean>
    ) => {
        apiService.mutationRequest(TASK_ESTIMATE, {
            ...values
        })
            .then(() => {
                setOpen(false);
            })
            .catch(err => console.log(err))
    }

    static getUserSession = (
        setSessionUserAction: any,
        userLogoutAction: any
    ) => {
        apiService.queryRequest(USER_SESSION)
            .then(response => {
                let data = response.data.sessions;

                if (data.length) {
                    let session = data[0];
                    setSessionUserAction(session);
                } else {
                    userLogoutAction();
                }
            })
            .catch(() => {
                userLogoutAction();
            })
    }

    static userLogout = (userLogoutAction: any) => {
        apiService.mutationRequest(LOGOUT)
            .then(() => {
                userLogoutAction();
            })
            .catch(err => console.log(err))
    }

    static getUserProfile = (setSessionUserProfileAction: any, userLogoutAction: any) => {
        apiService.mutationRequest(GET_PROFILE)
            .then(response => {
                setSessionUserProfileAction(response.data.profile_get);
            })
            .catch(() => {
                userLogoutAction();
            })
    }

    static taskUpdate = (
        description: string,
        theme: string,
        urgently: boolean | string,
        id: number,
        type_key: string,
        owner_images: string[],
        setOpen: React.Dispatch<boolean>
    ) => {
        apiService.mutationRequest(TASK_UPDATE, {
            description,
            theme,
            urgently: urgently == "Высокая",
            id,
            type_key,
            owner_images
        })
            .then(() => {
                setOpen(false);
            })
            .catch(error => console.log(error))
    }

    static insertPrivateChat = (
        user_id: number
    ) => {
        return apiService.mutationRequest(CHAT_PRIVATE_INSERT, {
            user_id
        })
    }

    static userOnline = () => {
        apiService.mutationRequest(USER_ONLINE)
            .then(() => {
                console.log("online, ok!");
            })
            .catch(err => console.log(err))
    }

    static deleteMessages = (ids: number[]) => {
        apiService.mutationRequest(DELETE_MESSAGE, {
            ids
        })
            .then(() => {
                console.log(`Deleted message >> ${ids}`);
            })
            .catch(err => console.log(err))
    }

    static setChatDraft = (chat_id: number, content: string | null) => {
        apiService.mutationRequest(INSERT_CHAT_DRAFT, {
            chat_id,
            content
        })
            .then(() => {
                console.log("setted draft", content);
            })
            .catch(err => console.log(err))
    }

}