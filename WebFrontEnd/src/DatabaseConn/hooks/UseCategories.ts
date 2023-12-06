import { useQuery } from "react-query";
import { Category, CategoryCore } from "@interfaces";
import { getBreadcrumbs, getCategory, getSubcategories } from "@dbConn/calls/Categories";

export const useBreadcrumbs = (id: string) => {
    return useQuery<CategoryCore[], Error>(
        ['breadcrumbs', id], () => getBreadcrumbs(id),
        { enabled: !!id, refetchOnWindowFocus: false })
}

export const useSubcategories = (id: string) => {
    return useQuery<Category[], Error>(
        ['subcategories', id], () => getSubcategories(id),
        { enabled: !!id, refetchOnWindowFocus: false })
}

export const useCategory = (id: string) => {
    return useQuery<Category, Error>(
        ["category", id], () => getCategory(id),
        { enabled: !!id, refetchOnWindowFocus: false }
    );
}