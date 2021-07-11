import { DataTypes } from "./Types";

const protocol = "https";
const hostname = "localhost";
const port = 44381;

export const RestUrls = {
    [DataTypes.BOOKS]: `${protocol}://${hostname}:${port}/api/book/`,
    [DataTypes.PUBLISHERS]: `${protocol}://${hostname}:${port}/api/publisher/`,
}
