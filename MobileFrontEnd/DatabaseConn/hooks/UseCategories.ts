import {useQuery} from "react-query";
import {getCategories} from "@dbConn/calls/Categories";
import {CategoryCore} from "@interfaces";

export const useCategories = (id: string) => {
    return useQuery<CategoryCore[], Error>(
        ['categories', id], () => getCategories(id),
        {enabled: !!id, refetchOnWindowFocus: false})
}