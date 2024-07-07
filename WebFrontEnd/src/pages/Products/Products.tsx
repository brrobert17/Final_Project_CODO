import './style.css';
import NavBar from "@components/NavBar";
import { navigationPages } from "../Home/Home";
import ItemSection from '@components/ItemSection';
import { useCategory, useCategories } from '@dbConn/hooks/UseCategories';
import { useParams } from 'react-router-dom';
import Blob from '@components/Blob';
import Breadcrumbs from '@components/Breadcrumbs';


export const Products = () => {

    const { id: categoryId } = useParams();
    const isRoot = !categoryId;
    const { data: cat } = useCategory(categoryId ? categoryId : '');
    const { data: subCats } = useCategories(true, categoryId);
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
                {subCats && subCats.length > 0 ?
                    <div className='page-cont products__breadcrumbs'>
                        {categoryId && <Breadcrumbs categoryId={categoryId} />}
                    </div>
                    :
                    <div className='page-cont products__breadcrumbs alone'>
                        {categoryId && <Breadcrumbs categoryId={categoryId} />}
                    </div>
                }
                {subCats && subCats.length > 0 ?
                    <Blob>
                        <ItemSection noDecoration heading={isRoot ? 'Categories' : cat?.name + ' Sub Categories'} itemType={'Category'} categoryId={categoryId} />
                    </Blob>
                    :
                    <></>
                }
                <div className='page-cont'>
                    <ItemSection heading={cat ? cat.name : 'Products'} itemType={'Product'} queryParams={isRoot ? undefined : { categoryId: categoryId, type: 'default', limit: 10 }} sorting />
                </div>
            </div>
        </>
    )
}