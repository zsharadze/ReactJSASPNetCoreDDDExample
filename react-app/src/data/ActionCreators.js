import { ACTION_TYPES } from "./Types";
import { publisher, book } from "./api";


export const getPublishers = (dataType) => (
    {
        type: ACTION_TYPES.PUBLISHERS_GETALL,
        payload: publisher().getAll(dataType).then(response =>
        ({
            dataType,
            data: response.data
        })
        )
    });

export const getPublisher = (dataType, publisherId, callback) => (
    {
        type: ACTION_TYPES.PUBLISHERS_GET,
        payload: publisher().getById(publisherId, callback)
            .then((response) => {
                callback(response.data);
                return ({
                    dataType,
                    data: response.data
                })
            })
    });

export const addPublisher = (dataType, publisherObject, callback) => (
    {
        type: ACTION_TYPES.PUBLISHER_CREATE,
        payload: publisher().create(publisherObject, callback)
            .then((response) => {
                callback();
                return ({
                    dataType,
                    data: response.data
                })
            })
    });

export const updatePublisher = (dataType, publisherObject, callback) => (
    {
        type: ACTION_TYPES.PUBLISHER_UPDATE,
        payload: publisher().update(publisherObject, callback)
            .then((response) => {
                callback();
                return ({
                    dataType,
                    data: response.data
                })
            })
    });

export const deletePublisher = (dataType, publisherId, callback) => (
    {
        type: ACTION_TYPES.PUBLISHER_DELETE,
        payload: publisher().delete(publisherId, callback)
            .then((response) => {
                callback();
                return ({
                    dataType,
                    data: response.data
                })
            })
    });

export const getBooks = (dataType, publisherId, pageIndex, searchText) => (
    {
        type: ACTION_TYPES.BOOK_GETALL,
        payload: book().getAll(publisherId, pageIndex, searchText).then(response =>
        ({
            dataType,
            data: response.data
        })
        )
    });

export const getBook = (dataType, bookId, callback) => (
    {
        type: ACTION_TYPES.BOOK_GET,
        payload: book().getById(bookId).then((response) => {
            callback(response.data);
            return ({
                dataType,
                data: response.data
            })
        })
    });

export const addBook = (dataType, newBook, callback) => (
    {
        type: ACTION_TYPES.BOOK_CREATE,
        payload: book().create(newBook).then((response) => {
            callback();
            return ({
                dataType,
                data: response.data
            })
        }
        )
    });

export const updateBook = (dataType, bookObject, callback) => (
    {
        type: ACTION_TYPES.BOOK_UPDATE,
        payload: book().update(bookObject).then((response) => {
            callback();
            return ({
                dataType,
                data: response.data
            })
        }
        )
    });

    export const deleteBook = (dataType, bookId, callback) => (
        {
            type: ACTION_TYPES.BOOK_DELETE,
            payload: book().delete(bookId, callback)
                .then((response) => {
                    callback();
                    return ({
                        dataType,
                        data: response.data
                    })
                })
        });