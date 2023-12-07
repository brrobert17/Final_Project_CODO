import { useQuery } from "react-query";
import { get, getCore, getProduct, getRelatedCores, getRelatedProducts } from '@dbConn/calls/Products'
import { Product, ProductCore, QueryParam, ProductCoreQueryResult } from "@utils/interfaces";

export const useProducts = (limit?: number, category?: string) => {
    return useQuery<Product[], Error>(
        "products",
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
        () => getCore(params),
        options
    )
}

export const useProductsCoreSingle = (params?: QueryParam) => {

    const queryKey = ['productsCoreSingle', params ? params.category : 'root']
    return useQuery<ProductCoreQueryResult[], Error>(
        queryKey,
        () => getCore(params ? [params] : undefined),
        { refetchOnWindowFocus: false }
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