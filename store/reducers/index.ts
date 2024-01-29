import {combineReducers} from "redux";
import {mainReducer} from "./mainReducer";
import {HYDRATE} from 'next-redux-wrapper';
import {ActionType} from "@typescript/interfaces";
import {chatReducer} from "@store/reducers/chatReducer";
import {newsReducer} from "@store/reducers/newsReducer";
import {videoReducer} from "@store/reducers/videoReducer";
import {metersReducer} from "@store/reducers/metersReducer";
import {tasksReducer} from "@store/reducers/tasksReducer";
import {pollsReducer} from "@store/reducers/pollsReducer";
import {apartmentsReducer} from "@store/reducers/apartmentsReducer";
import {organizationsReducer} from "@store/reducers/organizationsReducer";
import {USER_LOGOUT} from "@store/actions/actionTypes";
import {housesMapReducer} from "@store/reducers/housesMapReducer";
import {desktopReducer} from "@store/reducers/desktopReducer";
import {client} from "../../apollo-client";
import {documentsReducer} from "@store/reducers/documentsReducer";

export const rootReducer = combineReducers({
    main: mainReducer,
    chat: chatReducer,
    news: newsReducer,
    meters: metersReducer,
    videoObserving: videoReducer,
    tasks: tasksReducer,
    polls: pollsReducer,
    apartments: apartmentsReducer,
    organizations: organizationsReducer,
    housesMap: housesMapReducer,
    desktop: desktopReducer,
    documents: documentsReducer
});

export const parentReducer = (state: any, action: ActionType) => {
    if (action.type == HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        if (state.count) nextState.count = state.count;
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};