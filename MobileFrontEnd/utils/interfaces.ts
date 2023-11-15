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


export interface Image {
    url: string,
    alt: string,
}

export interface TagOut {
    id: string,
    items: string[]
}