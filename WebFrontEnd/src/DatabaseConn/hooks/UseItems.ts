import { useQuery } from "react-query";
import { get, getCoreMulti, getCoreSingle, getItem, getRelatedCores, getRelatedItems } from '@dbConn/calls/Items'
import { Item, ItemCore, QueryParam, ItemCoreQueryResult, ItemQueryResult } from "@interfaces";
import { isArray } from "util";

export const useItems = (category?: string, limit?: number) => {
    return useQuery<Item[], Error>(
        ["items", category, limit],
        () => get(limit, category),
        {
            refetchOnWindowFocus: false,
        }
    )
}
export const useItemsCoreMulti = (params?: QueryParam[], enabled?: boolean) => {

    let queryKey = ['itemsCoreMulti', params]
    let options: { refetchOnWindowFocus: boolean, enabled?: boolean } = { refetchOnWindowFocus: false };
    if (enabled) options = { ...options, enabled: enabled };

    return useQuery<ItemCoreQueryResult[], Error>(
        queryKey,
        () => getCoreMulti(params),
        options
    )
}

export const useItemsCoreSingle = (enabled: boolean, params?: QueryParam) => {

    const queryKey = ['itemsCoreSingle', params ? params.category : 'root']
    return useQuery<ItemCoreQueryResult, Error>(
        queryKey,
        () => getCoreSingle(params),
        { enabled: enabled, refetchOnWindowFocus: false }
    )
}

export const useItem = (id: string) => {
    return useQuery<Item, Error>(
        ['item', id], () => getItem(id),
        { enabled: !!id, refetchOnWindowFocus: false })
}

export const useRelatedItems = (id: string, limit: number) => {
    return useQuery<Item[], Error>(
        ["related items", id, limit], () => getRelatedItems(id, limit),
        { enabled: !!id, refetchOnWindowFocus: false }
    );
}

export const useRelatedItemsCores = (id: string, limit: number) => {
    return useQuery<ItemCore[], Error>(
        ["related items cores", id, limit], () => getRelatedCores(id, limit),
        { enabled: id ? id != '' : false, refetchOnWindowFocus: false }
    );
}