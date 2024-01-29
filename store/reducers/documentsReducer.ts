import {DocumentsReducerType} from "@typescript/interfaces/reducers/DocumentsReducerType";
import {ActionType} from "@typescript/interfaces";
import {
    SET_DOCUMENTS,
    SET_DOCUMENTS_TARGET_GROUPS_TYPES,
    SET_DOCUMENTS_TYPES,
    SET_DOCUMENTS_UPDATE_STATE
} from "@store/actions/actionTypes";

const initialState: DocumentsReducerType = {
    documents: [],
    types: [],
    isUpdate: false,
    targetGroups: []
};

export const documentsReducer = (state = initialState, action: ActionType) => {
    let {type, payload} = action;

    switch (type) {
        case SET_DOCUMENTS: // Список документов
            return {
                ...state,
                documents: payload
            }
        case SET_DOCUMENTS_TYPES: // Типы документов (для чего предназначены)
            return {
                ...state,
                types: payload
            }
        case SET_DOCUMENTS_TARGET_GROUPS_TYPES: // Список доступов (target_groups)
            return {
                ...state,
                targetGroups: payload
            }
        case SET_DOCUMENTS_UPDATE_STATE: // Состояние обновления документов
            return {
                ...state,
                isUpdate: payload
            }
        default:
            return state
    }
}