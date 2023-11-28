import {useQuery} from "react-query";
import {CategoryCore} from "@interfaces";
import {getBreadcrumbs, getSubcategories} from "@dbConn/calls/Categories";

export const useBreadcrumbs = (id: string) => {
    return useQuery<CategoryCore[], Error>(
        ['breadcrumbs', id], () => getBreadcrumbs(id),
        {enabled: !!id, refetchOnWindowFocus: false})
}

export const useSubcategories = (id: string) => {
    return useQuery<CategoryCore[], Error>(
        ['subcategories', id], () => getSubcategories(id),
        {enabled: !!id, refetchOnWindowFocus: false})
}