import {useQuery} from "react-query";
import {get, getCore} from '@dbConn/calls/Items'
import {Item, ItemCore, QueryParam, QueryResult} from "@utils/interfaces";

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
    console.log(queryKey);

    let options:{refetchOnWindowFocus: boolean, enabled?: boolean} = { refetchOnWindowFocus: false };
    if(enabled) options = {...options, enabled: enabled};

    return useQuery<QueryResult[],Error>(
        queryKey,
        ()=>getCore(params),
        options
    )
}