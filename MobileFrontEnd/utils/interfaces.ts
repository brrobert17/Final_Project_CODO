import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../App";

export interface Product {
    id: string;
    name: string;
    added: Date;
    img: Image[];
    price?: string,
    tags?: string[];
    description?: string;
    stock?: number;
    wysiwyg?: boolean;
    category?: string;
}

export interface ProductCore {
    id: string;
    name: string;
    img: Image;
    price: string;
}

// export interface ProductCoreQueryResult {
//     queryKey: string,
//     result: ProductCore[]
// }
//
//
// export interface ProductQueryResult {
//     queryKey: string,
//     result: Product[]
// }


export interface Image {
    url: string,
    alt: string,
}

export interface Tag {
    id: string,
    products: string[]
}

export interface OrderByParams {
    property: string,
    direction: string,
}

export interface QueryParams {
    type: 'default',
    categoryId?: string,
    limit?: number,
    orderBy?: OrderByParams,
    exclude?: string
}
export interface QueryParamsRelated {
    type: 'related',
    productId: string,
    exclude: boolean,
    limit: number
}

export interface Category {
    id: string,
    name: string,
    img: Image,
    path: {
        [key: number]: string;
    }
}

export interface CategoryCore {
    id: string,
    name: string,
}

export interface MenuCategory {
    id?: string;
    name?: string;
    level?: number;
    children?: MenuCategory[];
    action?: (nav?: NativeStackNavigationProp<StackParams>) => void
}