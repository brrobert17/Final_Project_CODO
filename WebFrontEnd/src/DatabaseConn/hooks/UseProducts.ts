import { useQuery } from "react-query";
import { getAll, getCores, getRelatedCores, getRelated, get } from '@dbConn/calls/Products'
import { Product, ProductCore, QueryParams,} from "@interfaces";

export const useProducts = (category?: string, limit?: number) => {
    return useQuery<Product[], Error>(
        ["products", category, limit],
        () => getAll(limit, category),
        {
            refetchOnWindowFocus: false,
        }
    )
}
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

export const useProductsCores = (enabled?: boolean, params?: QueryParams) => {

    const queryKey = ['productsCores', params ? params.category : 'root']
    const options = {refetchOnWindowFocus: false, enabled: true}
    enabled != undefined && (options.enabled = enabled)
    return useQuery<ProductCore[], Error>(
        queryKey,
        () => getCores(params),
        options
    )
}

export const useProduct = (id: string) => {
    return useQuery<Product, Error>(
        ['product', id], () => get(id),
        { enabled: !!id, refetchOnWindowFocus: false })
}

export const useRelatedProducts = (id: string, limit: number) => {
    return useQuery<Product[], Error>(
        ["related products", id, limit], () => getRelated(id, limit),
        { enabled: !!id, refetchOnWindowFocus: false }
    );
}

export const useRelatedProductsCores = (id: string, limit: number) => {
    return useQuery<ProductCore[], Error>(
        ["related products cores", id, limit], () => getRelatedCores(id, limit),
        { enabled: id ? id != '' : false, refetchOnWindowFocus: false }
    );
}