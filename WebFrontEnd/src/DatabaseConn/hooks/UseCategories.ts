import {useQuery} from "react-query";
import {CategoryCore, Item} from "@interfaces";
import {getCategories} from "@dbConn/calls/Categories";

export const useCategories = (id: string) => {
    return useQuery<CategoryCore[], Error>(
        ['categories', id], () => getCategories(id),
        {enabled: !!id, refetchOnWindowFocus: false})
}