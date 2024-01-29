import {Context, createWrapper} from "next-redux-wrapper";
import {applyMiddleware, createStore, Store} from "redux";
import {parentReducer} from "./reducers";
import {RootStateType} from "@typescript/types";
import thunk from "redux-thunk";

const makeStore = (context: Context) => createStore(parentReducer, applyMiddleware(thunk));

export const wrapper = createWrapper<Store<RootStateType>>(makeStore, {debug: true});