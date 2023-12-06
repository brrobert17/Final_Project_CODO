import { useQuery } from "react-query";
import { get, getCoreMulti, getCoreSingle, getProduct, getRelatedCores, getRelatedProducts } from '@dbConn/calls/Products'
import { Product, ProductCore, QueryParam, ProductCoreQueryResult, ProductQueryResult } from "@interfaces";
import { isArray } from "util";

export const useProducts = (category?: string, limit?: number) => {
    return useQuery<Product[], Error>(
        ["products", category, limit],
        () => get(limit, category),
        {
            refetchOnWindowFocus: false,
        }
    )
}
export const useProductsCoreMulti = (params?: QueryParam[], enabled?: boolean) => {

    let queryKey = ['productsCoreMulti', params]
    let options: { refetchOnWindowFocus: boolean, enabled?: boolean } = { refetchOnWindowFocus: false };
    if (enabled) options = { ...options, enabled: enabled };

    return useQuery<ProductCoreQueryResult[], Error>(
        queryKey,
        () => getCoreMulti(params),
        options
    )
}

export const useProductsCoreSingle = (enabled: boolean, params?: QueryParam) => {

    const queryKey = ['productsCoreSingle', params ? params.category : 'root']
    return useQuery<ProductCoreQueryResult, Error>(
        queryKey,
        () => getCoreSingle(params),
        { enabled: enabled, refetchOnWindowFocus: false }
    )
}

export const useProduct = (id: string) => {
    return useQuery<Product, Error>(
        ['product', id], () => getProduct(id),
        { enabled: !!id, refetchOnWindowFocus: false })
}

export const useRelatedProducts = (id: string, limit: number) => {
    return useQuery<Product[], Error>(
        ["related products", id, limit], () => getRelatedProducts(id, limit),
        { enabled: !!id, refetchOnWindowFocus: false }
    );
}

export const useRelatedProductsCores = (id: string, limit: number) => {
    return useQuery<ProductCore[], Error>(
        ["related products cores", id, limit], () => getRelatedCores(id, limit),
        { enabled: id ? id != '' : false, refetchOnWindowFocus: false }
    );
}