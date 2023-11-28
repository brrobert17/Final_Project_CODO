import {useQuery} from "react-query";
import {get, getCore, getItem} from '@dbConn/calls/Items'
import {Item, ItemCore, QueryParam, ItemCoreQueryResult, ItemQueryResult} from "@interfaces";

export const useItems = (limit?: number, category?: string) => {
    return useQuery<Item[], Error>(
        "items",
        () => get(limit, category),
        {
            refetchOnWindowFocus: false,
        }
    )
}
export const useItemsCoreMulti = (params?: QueryParam[], enabled?: boolean) => {

    let queryKey = ['itemsCoreMulti',params]
    let options: { refetchOnWindowFocus: boolean, enabled?: boolean } = {refetchOnWindowFocus: false};
    if (enabled) options = {...options, enabled: enabled};

    return useQuery<ItemCoreQueryResult[], Error>(
        queryKey,
        () => getCore(params),
        options
    )
}

export const useItemsCoreSingle = (params?: QueryParam) => {

    const queryKey = ['itemsCoreSingle', params ? params.category : 'root']
    return useQuery<ItemCoreQueryResult[], Error>(
        queryKey,
        () => getCore(params ? [params] : undefined),
        {refetchOnWindowFocus: false}
    )
}

export const useItem = (id: string) => {
    return useQuery<Item, Error>(
        ['item',id], () => getItem(id),
        {enabled: !!id, refetchOnWindowFocus: false})
}