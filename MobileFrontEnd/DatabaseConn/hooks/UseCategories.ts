import {useQuery} from "react-query";
import {Category, CategoryCore, MenuCategory} from "@interfaces";
import {getBreadcrumbs, getCategory, getMenuCategories, getCategories} from "@dbConn/calls/Categories";

export const useBreadcrumbs = (id: string) => {
    return useQuery<CategoryCore[], Error>(
        ['breadcrumbs', id], () => getBreadcrumbs(id),
        { enabled: !!id, refetchOnWindowFocus: false })
}

export const useCategories = (enabled:boolean, id: string='root') => {
    return useQuery<Category[], Error>(
        ['subcategories', id], () => getCategories(id),
        { enabled: enabled, refetchOnWindowFocus: false })
}
export const useMenuCategories = () => {
    return useQuery<MenuCategory[], Error>(
        'menuCategories', () => getMenuCategories(),
        {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        })
}
export const useCategory = (id: string) => {
    return useQuery<Category, Error>(
        ["category", id], () => getCategory(id),
        { enabled: !!id, refetchOnWindowFocus: false }
    );
}