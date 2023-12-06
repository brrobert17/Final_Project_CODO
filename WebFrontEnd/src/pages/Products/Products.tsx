import './style.css';
import NavBar from "@components/NavBar";
import { navigationPages } from "../Home/Home";
import ItemSection from '@components/ItemSection';
import { useCategory, useSubcategories } from '@dbConn/hooks/UseCategories';
import { useParams } from 'react-router-dom';
import Blob from '@components/Blob';
import Breadcrumbs from '@components/Breadcrumbs';
import { useItems, useItemsCoreSingle } from '@dbConn/hooks/UseItems';


export const Products = () => {

    const { id: categoryId } = useParams();
    const isRoot = categoryId ? false : true;
    const { data: cat } = useCategory(categoryId ? categoryId : '');
    const { data: subCats } = useSubcategories(categoryId ? categoryId : '');
    const { data: products } = useItemsCoreSingle(
        categoryId ? cat ? true : false : true,
        isRoot ?
            {
                queryKey: cat ? cat.name : '',
                category: cat ? cat.id : ''
            }
            :
            undefined
    );




    return (
        <>
            <NavBar pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'} />
            <div className='products-page'>
                <div className='page-cont products__breadcrumbs'>
                    {categoryId && <Breadcrumbs categoryId={categoryId} />}
                </div>
                {cat && subCats && subCats.length > 0 ?
                    <Blob>
                        <ItemSection heading={isRoot ? 'Categories' : cat.name + ' Sub Categories'} items={subCats} />
                    </Blob>
                    :
                    <></>
                }
                <div className='page-cont'>
                    {products && products.result && <ItemSection heading={cat ? cat.name : 'Products'} items={products.result} sorting />}
                </div>
            </div>
        </>
    )
}