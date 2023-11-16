export interface Item {
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

export interface ItemCore {
    id: string;
    name: string;
    img: Image;
    price: string;
}

export interface ItemCoreQueryResult {
    queryKey: string,
    result: ItemCore[]
}


export interface ItemQueryResult {
    queryKey: string,
    result: Item[]
}


export interface Image {
    url: string,
    alt: string,
}

export interface TagOut {
    id: string,
    items: string[]
}

export interface QueryParam {
    queryKey: string
    limit?: number,
    category?: string,
}