import {Item, ItemCore, QueryParam, QueryResult} from "@utils/interfaces";
import {api} from "@dbConn/axios";

export const get = async (limit?: number, category?: string): Promise<Item[]> => {
    return api.get("/items", {
        params: {
            limit: limit,
            category: category
        }
    }).then(res => res.data).catch(err => {
        throw err
    })
}
export const getCore = async (params?:QueryParam[]): Promise<QueryResult[]> => {
    return api.get("/items/cores", {
        params: params
    }).then(res => res.data).catch(err => {
        throw err
    })
}