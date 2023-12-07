import './style.css';
import NavBar from "@components/NavBar";
import { navigationPages } from "../Home/Home";
import ItemSection from '@components/ItemSection';
import { useCategory, useCategories } from '@dbConn/hooks/UseCategories';
import { useParams } from 'react-router-dom';
import Blob from '@components/Blob';
import Breadcrumbs from '@components/Breadcrumbs';
import { useProducts, useProductsCores } from '@dbConn/hooks/UseProducts';
import {useEffect} from "react";


export const Products = () => {

    const { id: categoryId } = useParams();
    const isRoot = !categoryId;
    const { data: cat } = useCategory(categoryId ? categoryId : '');
    const { data: subCats } = useCategories(true,categoryId);
    // const { data: products } = useProductsCores(
    //     categoryId ? !!cat : true,
    //     isRoot ?
    //         undefined
    //         :
    //         {
    //             category: cat ? cat.id : ''
    //         }
    // );
    //useEffect(()=> console.log(`CAT: ${JSON.stringify(cat)}, SUBCATS: ${JSON.stringify(subCats)}, PRODUCTS: ${JSON.stringify(products)}`),[cat, subCats, products])
    return (
        <>
            <NavBar pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'} />
            <div className='products-page'>
                <div className='page-cont products__breadcrumbs'>
                    {categoryId && <Breadcrumbs categoryId={categoryId} />}
                </div>
                {subCats && subCats.length > 0 ?
                    <Blob>
                        <ItemSection heading={isRoot ? 'Categories' : cat?.name + ' Sub Categories'} itemType={'Category'} categoryId={categoryId} />
                    </Blob>
                    :
                    <></>
                }
                <div className='page-cont'>
                    <ItemSection heading={cat ? cat.name : 'Products'} itemType={'Product'} queryParams={isRoot? undefined : {category: categoryId}} sorting />
                </div>
            </div>
        </>
    )
}