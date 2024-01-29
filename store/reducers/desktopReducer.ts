import {DesktopReducerType} from "@typescript/interfaces/reducers/DesktopReducerType";
import {ActionType} from "@typescript/interfaces";
import {
    SET_APARTMENT_ID,
    SET_APARTMENT_MY_TASKS,
    SET_APARTMENT_NEWS,
    SET_APARTMENT_TASKS
} from "@store/actions/actionTypes";

const initialState: DesktopReducerType = {
    id: null,
    news: [],
    tasks: [],
    myTasks: []
};

export const desktopReducer = (state = initialState, action: ActionType) => {

    let data = action.payload;

    switch (action.type) {
        case SET_APARTMENT_ID: // ID квартиры
            return {
                ...state,
                id: data
            }
        case SET_APARTMENT_NEWS: // Новости каруселя (desktop)
            return {
                ...state,
                news: data
            }
        case SET_APARTMENT_TASKS: // Задачи дома (desktop)
            return {
                ...state,
                tasks: data
            }
        case SET_APARTMENT_MY_TASKS: // Мои задачи (desktop)
            return {
                ...state,
                myTasks: data
            }

        default:
            return state
    }

}