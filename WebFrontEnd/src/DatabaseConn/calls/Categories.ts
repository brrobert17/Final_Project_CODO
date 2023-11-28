import {CategoryCore, Item} from "@interfaces";
import {api} from "@dbConn/axios";

export const getCategories = async (id:string):Promise<CategoryCore[]> => {
    const url = `/breadcrumbs/${id}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err
    })
}