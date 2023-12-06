import { Item, ItemCore, QueryParam, ItemCoreQueryResult } from "@interfaces";
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
export const getCoreMulti = async (params?: QueryParam[]): Promise<ItemCoreQueryResult[]> => {
    const queryString = `?params=${encodeURIComponent(JSON.stringify(params))}`;
    let url = "/items/cores";
    if (params) url += queryString;

    return api.get(url).then(res => res.data).catch(err => {
        throw err
    })
}

export const getCoreSingle = async (param?: QueryParam): Promise<ItemCoreQueryResult> => {
    const fakeParams = [param];
    const queryString = `?params=${encodeURIComponent(JSON.stringify(fakeParams))}`;
    let url = "/items/cores";
    if (fakeParams) url += queryString;
    
    return api.get(url).then(res => res.data[0]).catch(err => {
        throw err
    });
}

export const getItem = async (id: string): Promise<Item> => {
    const url = `/items/${id}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}

export const getRelatedItems = async (id: string, limit: number): Promise<Item[]> => {
    const url = `/items/${id}/related?limit=${limit}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}
export const getRelatedCores = async (id: string, limit: number): Promise<ItemCore[]> => {
    const url = `/items/${id}/related/cores?limit=${limit}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}

