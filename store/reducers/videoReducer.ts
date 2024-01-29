import {ActionType} from "@typescript/interfaces";
import {
    SET_LIST_VALID_STATE,
    SET_CAMERA_CATEGORY,
    SET_CAMERAS_LIST,
    SET_CAMERA_PAGE, SET_CAMERA_CATEGORIES
} from "@store/actions/actionTypes";
import {VideoReducerType} from "@typescript/interfaces/reducers/VideoReducerType";

const initialState: VideoReducerType = {
    videoList: [],
    page: 0,
    category: "Все камеры",
    categories: ["Все камеры"]
};

export const videoReducer = (state = initialState, action: ActionType) => {

    let data = action.payload;

    switch (action.type) {
        case SET_CAMERAS_LIST: // Список камер
            return {
                ...state,
                videoList: data
            }
        case SET_CAMERA_PAGE: // Текущая страница
            return {
                ...state,
                page: data
            }
        case SET_CAMERA_CATEGORY: // Категория камер
            return {
                ...state,
                category: data
            }
        case SET_CAMERA_CATEGORIES: // Список категории
            return {
                ...state,
                categories: data
            }
        default:
            return state
    }
}