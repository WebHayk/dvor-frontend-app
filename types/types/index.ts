import {rootReducer} from "@store/reducers";
import {ActionType} from "../interfaces";

export type RootStateType = ReturnType<typeof rootReducer>;
export type DispatchType = (newState: ActionType) => void;
export type TOpen = {
    open: boolean
};
