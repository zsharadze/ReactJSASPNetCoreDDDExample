import { ACTION_TYPES } from "../data/Types";

export const publisherReducer = (storeData, action) => {

    switch (action.type) {
        case ACTION_TYPES.PUBLISHERS_GETALL:
            return {
                ...storeData, [action.payload.dataType]: action.payload.data
            }
        case ACTION_TYPES.PUBLISHERS_GET:
            return {
                ...storeData, [action.payload.dataType]: action.payload.data
            }
        case ACTION_TYPES.PUBLISHER_CREATE:
            return {
                ...storeData, [action.payload.dataType]: action.payload.data
            }
        case ACTION_TYPES.PUBLISHER_UPDATE:
            return {
                ...storeData, [action.payload.dataType]: action.payload.data
            }
        case ACTION_TYPES.PUBLISHER_DELETE:
            return {
                ...storeData, [action.payload.dataType]: action.payload.data
            }
        default:
            return storeData || {};
    }
}
