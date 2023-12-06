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
    const { data: cat } = useCategory(categoryId ? categoryId : '');
    const { data: subCats } = useSubcategories(categoryId ? categoryId : '');
    const { data: products } = useItemsCoreSingle({ queryKey: cat ? cat.name : '', category: cat ? cat.id : '' });
    console.log("products", products)

    return (
        <>
            <NavBar pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'} />
            <div className='products-page'>
                {categoryId && <Breadcrumbs categoryId={categoryId} />}
                <Blob>
                    {subCats ?
                        <ItemSection heading='Categories' items={subCats} />
                        :
                        <></>
                    }
                </Blob>
                {cat && products?.result && <ItemSection heading={cat.name} items={products.result} />}
            </div>
        </>
    )
}