import {ActionType} from "@typescript/interfaces";
import {
    SET_ORGANIZATIONS,
    SET_ORGANIZATIONS_TYPES, SET_ORGANIZATIONS_UPDATE_STATE,
    SET_SEARCH_ORGANIZATIONS_TYPE
} from "@store/actions/actionTypes";
import {OrganizationsReducerType} from "@typescript/interfaces/reducers/OrganizationsReducerType";

const initialState: OrganizationsReducerType = {
    organizations: [],
    types: [],
    isUpdate: false,
    filters: {
        type: ""
    }
};

export const organizationsReducer = (state = initialState, action: ActionType) => {

    let data = action.payload;

    switch (action.type) {
        case SET_ORGANIZATIONS: // Список организации
            return {
                ...state,
                organizations: data
            }
        case SET_ORGANIZATIONS_TYPES: // Типы организации
            return {
                ...state,
                types: data
            }
        case SET_SEARCH_ORGANIZATIONS_TYPE: // Тип организации для фильтра
            return {
                ...state,
                filters: {
                    ...state.filters,
                    type: data
                }
            }
        case SET_ORGANIZATIONS_UPDATE_STATE: // Состояние обновления организации
            return {
                ...state,
                isUpdate: data
            }
        default:
            return state
    }
}