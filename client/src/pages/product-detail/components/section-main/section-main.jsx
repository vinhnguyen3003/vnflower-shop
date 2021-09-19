import React, { useContext } from 'react';
import Spinner from '../../../../components/spinner/spinner';
import { ProductContext } from '../../../../contexts/productContext';
import SectionMainLeft from './section-main-left';
import SectionMainRight from './section-main-right';


function SectionMain() {
    const {productState: {productDetail}} = useContext(ProductContext);
    
    return (
        <section className="section-main-pr-detail">
            {
                productDetail !== null && productDetail._id !== undefined?
                <div className="container section-main__wrapper">
                    <SectionMainLeft productImage={productDetail.productImage} />
                    <SectionMainRight product={productDetail}/>
                </div> : 
                <div className="container section-main__wrapper--load">
                    <Spinner />
                </div>
            }
        </section>
    );
}

export default SectionMain;