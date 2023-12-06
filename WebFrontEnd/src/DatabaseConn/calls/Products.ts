import { Product, ProductCore, QueryParam, ProductCoreQueryResult } from "@interfaces";
import { api } from "@dbConn/axios";

export const get = async (limit?: number, category?: string): Promise<Product[]> => {
    return api.get("/products", {
        params: {
            limit: limit,
            category: category
        }
    }).then(res => res.data).catch(err => {
        throw err
    })
}
export const getCoreMulti = async (params?: QueryParam[]): Promise<ProductCoreQueryResult[]> => {
    const queryString = `?params=${encodeURIComponent(JSON.stringify(params))}`;
    let url = "/products/cores";
    if (params) url += queryString;

    return api.get(url).then(res => res.data).catch(err => {
        throw err
    })
}

export const getCoreSingle = async (param?: QueryParam): Promise<ProductCoreQueryResult> => {
    const fakeParams = [param];
    const queryString = `?params=${encodeURIComponent(JSON.stringify(fakeParams))}`;
    let url = "/products/cores";
    if (fakeParams) url += queryString;

    return api.get(url).then(res => res.data[0]).catch(err => {
        throw err
    });
}

export const getProduct = async (id: string): Promise<Product> => {
    const url = `/products/${id}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}

export const getRelatedProducts = async (id: string, limit: number): Promise<Product[]> => {
    const url = `/products/${id}/related?limit=${limit}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}
export const getRelatedCores = async (id: string, limit: number): Promise<ProductCore[]> => {
    const url = `/products/${id}/related/cores?limit=${limit}`;

    return api.get(url).then(res => res.data).catch(err => {
        throw err;
    })
}

