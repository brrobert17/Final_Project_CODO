import { Item, ItemCore, QueryParam, ItemCoreQueryResult } from "@utils/interfaces";
import { api } from "@dbConn/axios";

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
export const getCore = async (params?: QueryParam[]): Promise<ItemCoreQueryResult[]> => {
    const queryString = `?params=${encodeURIComponent(JSON.stringify(params))}`;
    let url = "/items/cores";
    if (params) url += queryString;

    return api.get(url).then(res => res.data).catch(err => {
        throw err
    })
}

export const getItem = async (id: string): Promise<Item> => {
    const url = `/items/${id}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err
    })
}