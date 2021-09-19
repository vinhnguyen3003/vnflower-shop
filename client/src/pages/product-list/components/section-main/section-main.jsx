import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ProductContext } from '../../../../contexts/productContext';
import { PrListContext } from '../../contexts/prListContext';
import SectionMainFilter from './section-main-filter';
import SectionMainProduct from './section-main-product';


function SectionMain() {
    const history = useHistory();
    const {filterKey, sortKey, page, setPage} = useContext(PrListContext);
    const {getProductsByCondition, destroyGetProduct} = useContext(ProductContext)
    //console.log(history.location.search.replace('?searchKey=', ''))
    const searchKey = history.location.search.replace('?searchKey=', '');

    //when page change, do not destroy to keep products 
    useEffect(() => {
        getProductsByCondition(12 + (page*4), filterKey, sortKey, searchKey);
    },[page])

    useEffect(() => {
        setPage(0);
        destroyGetProduct();
        getProductsByCondition(12 + (page*4), filterKey, sortKey, searchKey);
    },[filterKey, sortKey, searchKey])

    return (
            <section className="section-main-pr-list">
                <div className="container section-main__wrapper">
                    <SectionMainFilter />
                    <SectionMainProduct />
                </div>
            </section>
    );
}

export default SectionMain;