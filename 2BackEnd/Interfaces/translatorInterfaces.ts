import {Category, Image, Product} from "./dbInterfaces";

export interface AboutSection {
    title: string;
    body: string;
}

export interface Pages {
    contact: string;
    home: string;
    products: string;
}

export interface SortBy {
    alphaAsc: string;
    alphaDsc: string;
    newest: string;
    oldest: string;
    title: string;
}

export interface TitleSearch {
    placeHolder: string;
    products: string;
    prompt: string;
    results: string;
}
export interface Meta {
    aboutSection: AboutSection;
    emptyCategory: string;
    pages: Pages;
    seeMore: string;
    sortBy: SortBy;
    titleCategories: string;
    titleSearch: TitleSearch;
    titleSite: string;
    titleSubcategories: string;
}

export interface CategoryTranslation extends Pick<Category, "id" | "name">{
    img: Pick<Image, "alt">;
}

export interface ProductTranslation extends Pick<Product, "id" | "name" | "description">{
    img: Pick<Image, "alt">[];
}
export interface Language {
    abbr: string;
    meta: Meta;
    categories: CategoryTranslation[];
    products: ProductTranslation[];
}