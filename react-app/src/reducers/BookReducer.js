import { ACTION_TYPES } from "../data/Types";

export const bookReducer = (storeData, action) => {

    switch (action.type) {
        case ACTION_TYPES.BOOK_GETALL:
            return {
                ...storeData, [action.payload.dataType]: action.payload.data
            }
        case ACTION_TYPES.BOOK_GET:
            return {
                ...storeData, [action.payload.dataType]: action.payload.data
            }
        case ACTION_TYPES.BOOK_CREATE:
            return {
                ...storeData, [action.payload.dataType]: action.payload.data
            }

        case ACTION_TYPES.BOOK_UPDATE:
            return {
                ...storeData, [action.payload.dataType]: action.payload.data
            }

        case ACTION_TYPES.BOOK_DELETE:
            return {
                ...storeData, [action.payload.dataType]: action.payload.data
            }
        default:
            return storeData || {};
    }
}
