import {ActionType} from "@typescript/interfaces";
import {PollsReducerType} from "@typescript/interfaces/reducers/PollsReducerType";
import {
    SET_CURRENT_POLLS,
    SET_PAST_POLLS, SET_POLL_ONE, SET_POLL_ONE_UPDATE_STATE, SET_POLLS_UPDATE_STATE,
    SET_SEARCH_POLL_DATE, SET_SEARCH_POLL_QUERY,
    SET_SEARCH_POLL_TYPE
} from "@store/actions/actionTypes";

const initialState: PollsReducerType = {
    isUpdate: false,
    polls: {
        current: [],
        past: [],
        poll: null,
        pollIsUpdate: false
    },
    filters: {
        creationDate: null,
        type: null,
        query: ""
    }
};

export const pollsReducer = (state = initialState, action: ActionType) => {
    let data = action.payload;

    switch (action.type) {
        case SET_CURRENT_POLLS: // Текущие голосования
            return {
                ...state,
                polls: {
                    ...state.polls,
                    current: data
                }
            }
        case SET_PAST_POLLS: // Завершенные голосования
            return {
                ...state,
                polls: {
                    ...state.polls,
                    past: data
                }
            }
        case SET_SEARCH_POLL_TYPE: // Тип для поиска
            return {
                ...state,
                filters: {
                    ...state.filters,
                    type: data
                }
            }
        case SET_SEARCH_POLL_DATE: // Дата для поиска
            return {
                ...state,
                filters: {
                    ...state.filters,
                    creationDate: data
                }
            }
        case SET_SEARCH_POLL_QUERY: // Название голосования для поиска
            return {
                ...state,
                filters: {
                    ...state.filters,
                    query: data
                }
            }
        case SET_POLL_ONE: // Одно голосование (детальная страница)
            return {
                ...state,
                polls: {
                    ...state.polls,
                    poll: data
                }
            }
        case SET_POLL_ONE_UPDATE_STATE: // Обновление одного голосования (очередной запрос)
            return {
                ...state,
                polls: {
                    ...state.polls,
                    pollIsUpdate: data
                }
            }
        case SET_POLLS_UPDATE_STATE: // Обновить список голосований
            return {
                ...state,
                isUpdate: true
            }
        default:
            return state
    }
}