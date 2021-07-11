import { createStore, applyMiddleware } from "redux";
import { publisherReducer } from "../reducers/PublisherReducer";
import { bookReducer } from "../reducers/BookReducer";
import { asyncActions } from "./AsyncMiddleware";
import { CommonReducer } from "../reducers/CommonReducer";

//export const dataStore 
  //  = createStore(publisherReducer, applyMiddleware(asyncActions));


    export const dataStore
 = createStore(CommonReducer(publisherReducer, bookReducer), applyMiddleware(asyncActions));