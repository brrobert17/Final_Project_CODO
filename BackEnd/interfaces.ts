export interface Item {
    id: string;
    name: string;
    added: Date;
    images: Image[];
}

export interface Image {
    url: string,
    alt: string,
}