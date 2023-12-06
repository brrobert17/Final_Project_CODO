import {Category, CategoryCore, MenuCategory} from "@interfaces";
import {api} from "@dbConn/axios";
export const getBreadcrumbs = async (id:string):Promise<CategoryCore[]> => {
    const url = `categories/${id}/breadcrumbs`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}
export const getSubcategories = async (id:string):Promise<Category[]> => {
    const url = `categories/${id}/subcategories`;
    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}
export const getMenuCategories = async ():Promise<MenuCategory[]> => {
    const url = `categories`;
    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}

export const getCategory = async (id: string): Promise<Category> => {
    const url = `categories/${id}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}