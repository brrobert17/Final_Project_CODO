import {useQuery} from "react-query";
import { getCores, getRelatedCores, get} from '@dbConn/calls/Products'
import {Product, ProductCore, QueryParams, QueryParamsRelated} from "@interfaces";

// export const useProducts = (category?: string, limit?: number) => {
//     return useQuery<Product[], Error>(
//         ["products", category, limit],
//         () => getAll(limit, category),
//         {
//             refetchOnWindowFocus: false,
//         }
//     )
// }
// export const useProductsCoreMulti = (params?: QueryParams[], enabled?: boolean) => {
//
//     let queryKey = ['productsCoreMulti', params]
//     let options: { refetchOnWindowFocus: boolean, enabled?: boolean } = { refetchOnWindowFocus: false };
//     if (enabled) options = { ...options, enabled: enabled };
//
//     return useQuery<ProductCoreQueryResult[], Error>(
//         queryKey,
//         () => getCoreMulti(params),
//         options
//     )
// }
// export const useProductCores = (enabled?: boolean, params?: QueryParams) => {
//
//     const queryKey = ['productCores', params ? params : 'root']
//     const options = {refetchOnWindowFocus: false, enabled: true}
//     enabled != undefined && (options.enabled = enabled)
//     return useQuery<ProductCore[], Error>(
//         queryKey,
//         () => getCores(params),
//         options
//     )
// }
// export const useRelatedProducts = (id: string, limit: number) => {
//     return useQuery<Product[], Error>(
//         ["related products", id, limit], () => getRelated(id, limit),
//         {enabled: !!id, refetchOnWindowFocus: false}
//     );
// }
// export const useRelatedProductCores = (enabled: boolean, params: QueryParamsRelated) => {
//     return useQuery<ProductCore[], Error>(
//         ["related products cores", params], () => getRelatedCores(params),
//         {enabled: enabled, refetchOnWindowFocus: false}
//     );
// }
export const useProductCores = (enabled: boolean, params?: QueryParamsRelated | QueryParams) => {
    const queryKey = ['productCores', params ? params : 'root']
    return useQuery<ProductCore[], Error>(
        queryKey,
        () => {
            return (params?.type === 'related') ?
                getRelatedCores(params) :
                getCores(params)
        },
        {enabled: enabled, refetchOnWindowFocus: false}
    )
}
export const useProduct = (id: string) => {
    return useQuery<Product, Error>(
        ['product', id], () => get(id),
        {enabled: !!id, refetchOnWindowFocus: false})
}