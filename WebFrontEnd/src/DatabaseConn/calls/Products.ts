import {Product, ProductCore, QueryParams, QueryParamsRelated} from "@interfaces";
import { api } from "@dbConn/axios";

export const getAll = async (limit?: number, category?: string): Promise<Product[]> => {
    return api.get("/products", {
        params: {
            limit: limit,
            category: category
        }
    }).then(res => res.data).catch(err => {
        throw err
    })
}
// export const getCoreMulti = async (params?: QueryParams[]): Promise<ProductCoreQueryResult[]> => {
//     const queryString = `?params=${encodeURIComponent(JSON.stringify(params))}`;
//     let url = "/products/cores";
//     if (params) url += queryString;
//
//     return api.get(url).then(res => res.data).catch(err => {
//         throw err
//     })
// }

export const getCores = async (params?: QueryParams): Promise<ProductCore[]> => {
    //const fakeParams = [param];
    const queryString = `?params=${encodeURIComponent(JSON.stringify(params))}`;
    let url = "/products/cores";
    if (params) url += queryString;

    return api.get(url).then(res => {
        console.log("hellof rom getCores", res.data);
        return res.data
    }).catch(err => {
        throw err
    });
}

export const get = async (id: string): Promise<Product> => {
    const url = `/products/${id}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}

export const getRelated = async (id: string, limit: number): Promise<Product[]> => {
    const url = `/products/${id}/related?limit=${limit}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}
export const getRelatedCores = async (params: QueryParamsRelated): Promise<ProductCore[]> => {
    const url = `/products/${params.productId}/related/cores?limit=${params.limit}&exclude=${params.exclude}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}

