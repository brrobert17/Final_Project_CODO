import {useQuery} from "react-query";
import {get, getCore} from '@dbConn/calls/Items'
import {Item, ItemCore, QueryParam, ItemCoreQueryResult} from "@utils/interfaces";

export const useItems = (limit?:number, category?: string) => {
    return useQuery<Item[],Error>(
        "items",
        ()=>get(limit, category),
        {
            refetchOnWindowFocus: false,
        }
    )
}
export const useItemsCore = (params?: QueryParam[], enabled?: boolean) => {

    let queryKey = 'itemsCore'
    let options:{refetchOnWindowFocus: boolean, enabled?: boolean} = { refetchOnWindowFocus: false };
    if(enabled) options = {...options, enabled: enabled};

    return useQuery<ItemCoreQueryResult[],Error>(
        queryKey,
        ()=>getCore(params),
        options
    )
}