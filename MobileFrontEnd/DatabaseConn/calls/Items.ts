import {Item, ItemCore} from "@utils/interfaces";
import {api} from "@dbConn/axios";

export const get = async (limit?:number): Promise<Item[]> => {
    return api.get("/items",{params: {
        limit: limit
        }}).then(res => res.data).catch(err => { throw err })
}
export const getCore = async (limit?:number): Promise<ItemCore[]> => {
    return api.get("/items/cores", {params: {
        limit: limit
        }}).then(res => res.data).catch(err => { throw err })
}