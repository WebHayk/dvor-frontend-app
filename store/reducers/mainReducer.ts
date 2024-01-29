import {ActionType} from "@typescript/interfaces";
import {MainReducerType} from "@typescript/interfaces/reducers/MainReducerType";
import {
    AUTH_CHECKER,
    SET_NOTIFICATIONS_SHOW,
    SET_SIDEBAR_SHOW,
    USER_LOGIN,
    USER_LOGOUT,
    SET_SESSION_USER,
    SET_APARTMENT_USERS,
    SET_USER_PROFILE,
    SET_APARTMENT_USERS_UPDATE_STATE,
    SET_MESSAGE,
    DELETE_MESSAGE, SET_GLOBALLY_UPDATE_STATE
} from "../actions/actionTypes";

const initialState: MainReducerType = {
    isAuth: false,
    user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") as string) : null,
    profile: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("profile") as string) : null,
    isUpdate: false,
    messages: [],
    users: {
        data: [],
        isUpdate: false
    },
    show: {
        sidebar: true,
        notifications: false
    }
};

export const mainReducer = (state = initialState, action: ActionType) => {

    let data = action.payload;

    switch (action.type) {
        case SET_SIDEBAR_SHOW: // Показать/скрыть панель меню (sidebar)
            return {
                ...state,
                show: {
                    ...state.show,
                    sidebar: !state.show.sidebar
                }
            }
        case SET_NOTIFICATIONS_SHOW: // Показать/скрыть панель уведомлении
            return {
                ...state,
                show: {
                    ...state.show,
                    notifications: !state.show.notifications
                }
            }
        case USER_LOGIN: // Авторизация пользователя (user)
            return {
                ...state,
                isAuth: true
            }
        case SET_SESSION_USER: // Данные пользователя (session)
            return {
                ...state,
                user: data
            }
        case USER_LOGOUT: // Выход пользователя (user)
            return {
                ...state,
                isAuth: false,
                user: null,
                profile: null
            }
        case AUTH_CHECKER: // Проверка статуса авторизации
            return {
                ...state,
                isAuth: data
            }
        case SET_APARTMENT_USERS: // Список квартир
            return {
                ...state,
                users: {
                    ...state.users,
                    data
                }
            }
        case SET_APARTMENT_USERS_UPDATE_STATE: // Обновление списка квартир
            return {
                ...state,
                users: {
                    ...state.users,
                    isUpdate: data
                }
            }
        case SET_USER_PROFILE: // Информация профиля пользователя
            return {
                ...state,
                profile: data
            }
        case SET_MESSAGE: // Добавить сообщение
            return {
                ...state,
                messages: [...state.messages, data]
            }
        case DELETE_MESSAGE: // Удалить сообщение

            let messages = state.messages.filter(message => message.id !== data);

            return {
                ...state,
                messages
            }
        case SET_GLOBALLY_UPDATE_STATE: // Состояние обновления (глобальное)
            return {
                ...state,
                isUpdate: data
            }
        default:
            return state
    }
}