import {CategoryCore, Item} from "@interfaces";
import {api} from "@dbConn/axios";

export const getBreadcrumbs = async (id:string):Promise<CategoryCore[]> => {
    const url = `categories/${id}/breadcrumbs`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err
    })
}

export const getSubcategories = async (id:string):Promise<CategoryCore[]> => {
    const url = `categories/${id}/subcategories`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err
    })
}