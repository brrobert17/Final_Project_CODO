import {useQuery} from "react-query";
import {get} from '@dbConn/Items'
import {Item} from "@utils/interfaces";

export const useItems = () => {
    return useQuery<Item[],Error>(
        "items",
        get,
        {
            refetchOnWindowFocus: false,
        }
    )
}