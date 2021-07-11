import axios from "axios";
import { RestUrls } from "../data/Urls";
import { DataTypes } from "./Types";

export const publisher = () => {
    let url = RestUrls[DataTypes.PUBLISHERS];
    return {
        getAll: () => axios.get(url + 'getall'),
        getById: id => axios.get(url + "details/?id=" + id),
        create: (newRecord) => axios.post(url + 'create', newRecord),
        update: (updateRecord) => axios.post(url + "edit", updateRecord),
        delete: id => axios.post(url + "delete/?id=" + id)
    }
}

export const book = () => {
    let url = RestUrls[DataTypes.BOOKS];
    return {
        getAll: (publisherId, pageIndex, searchText) => axios.get(url + `getall?publisherId=${publisherId ? publisherId : ""}&pageIndex=${pageIndex ? pageIndex : ""}&searchText=${searchText ? searchText : ""}`),
        getById: id => axios.get(url + "details/?id=" + id),
        create: newRecord => axios.post(url + "create", newRecord),
        update: (updateRecord) => axios.post(url + "edit", updateRecord),
        delete: id => axios.post(url + "delete/?id=" + id)
    }
}