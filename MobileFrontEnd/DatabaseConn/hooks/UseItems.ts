import {useQuery} from "react-query";
import {get, getCore} from '@dbConn/calls/Items'
import {Item, ItemCore} from "@utils/interfaces";

export const useItems = (limit?:number) => {
    return useQuery<Item[],Error>(
        "items",
        ()=>get(limit),
        {
            refetchOnWindowFocus: false,
        }
    )
}
export const useItemsCore = (limit?:number) => {
    return useQuery<ItemCore[],Error>(
        "itemsCore",
        ()=>getCore(limit),
        {
            refetchOnWindowFocus: false
        }
    )
}