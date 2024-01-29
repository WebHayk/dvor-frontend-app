import {ActionType} from "@typescript/interfaces";
import {MetersReducerType} from "@typescript/interfaces/reducers/MetersReducerType";
import {SET_METERS_FILTER_TYPE, SET_METERS_LIST, SET_METERS_RECORDS} from "@store/actions/actionTypes";

const initialState: MetersReducerType = {
    meters: [],
    meterRecords: [],
    filters: {
        types: null
    }
};

export const metersReducer = (state = initialState, action: ActionType) => {
    let data = action.payload;

    switch (action.type) {
        case SET_METERS_LIST: // Список приборов учета
            return {
                ...state,
                meters: data
            }
        case SET_METERS_RECORDS: // Список показаний (история)
            return {
                ...state,
                meterRecords: data
            }
        case SET_METERS_FILTER_TYPE: // Типы для фильтрации
            return {
                ...state,
                filters: {
                    ...state.filters,
                    types: data
                }
            }
        default:
            return state
    }
}