import {ActionType} from "@typescript/interfaces";
import {NewsReducerType} from "@typescript/interfaces/reducers/NewsReducerType";
import {
    SET_MORE_NEWS,
    SET_NEWS_DETAIL,
    SET_NEWS_ID,
    SET_NEWS_LIST
} from "@store/actions/actionTypes";

const initialState: NewsReducerType = {
    news: [],
    newsId: null,
    newsDetail: null
};

export const newsReducer = (state = initialState, action: ActionType) => {

    let data = action.payload;

    switch (action.type) {
        case SET_NEWS_LIST:
            return {
                ...state,
                news: data
            }
        case SET_NEWS_ID:
            return {
                ...state,
                newsId: data
            }
        case SET_NEWS_DETAIL:
            return {
                ...state,
                newsDetail: data
            }
        case SET_MORE_NEWS:
            return {
                ...state,
                news: state.news.concat(data)
            }
        default:
            return state
    }

}