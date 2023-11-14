import {Item} from "@utils/interfaces";
import {api} from "@dbConn/axios";

export const get = async (): Promise<Item[]> => {
    return api.get("/items").then(res => res.data).catch(err => { throw err })
}