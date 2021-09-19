import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import {convertToCurrency} from './../../../../utils/currency-method';
import { ProductContext } from '../../../../contexts/productContext';
import scrollAnimation from '../../../../utils/scroll-animation';
import { CartContext } from '../../../../contexts/cartContext';
import Spinner from '../../../../components/spinner/spinner';
import { HistoryContext } from '../../../../contexts/historyContext';
import toggleCartNoti from '../../../../utils/toggle-cart-noti';

const prTypeArray = [
    {
        "typeName": "Phổ biến nhất",
        "typeKey": "popular"
    },
    {
        "typeName": "Sản phẩm mới",
        "typeKey": "newest"
    },
    {
        "typeName": "Đang ưu đãi",
        "typeKey": "discount"
    },
    {
        "typeName": "Đặc biệt",
        "typeKey": "special"
    }
]
function SectionProduct() {
    const { productState: {products}, getProductsByCondition, destroyGetProduct } = useContext(ProductContext);
    const {addHistory} = useContext(HistoryContext);
    const { addToCart } = useContext(CartContext);
    const [btnTypeActive, setBtnTypeActive] = useState(0);

    const btnTypeAction = (index, typeKey) => {
        setBtnTypeActive(index);
        destroyGetProduct();
        getProductsByCondition(8, 'null', typeKey, 'null');
    }

    useEffect(()=>{
        getProductsByCondition(8,'null', 'popular', 'null');
    },[])
    useEffect(()=>{scrollAnimation()},[products])
    return (
        <section className="section-product">
            <div className="section-product__wrapper">
                <div className="section-product-heading">
                    <div className="heading-title">
                        <span>B</span>ạn
                        <span> M</span>uốn
                        <span> M</span>ua
                        <span> G</span>ì
                        <span> N</span>gày
                        <span> H</span>ôm
                        <span> N</span>ay?
                    </div>
                    <div className="heading-content play-on-scroll">
                        Những bông hoa được chọn lọc và thu hoạch cẩn thận, đúng quy trình, đồng
                        thời luôn được bảo quản trong điều kiện tốt nhất để giữ được chất lượng
                        và độ tươi cao nhất trước khi đến tay khách hàng.
                    </div>
                </div>
                <div className="section-product-body">
                    <div className="section-product-type">
                        {
                            prTypeArray.map((prTyArr, index)=>{
                                return <span 
                                            key={index}
                                            className={`btn btn--green btn-type ${btnTypeActive === index ? '--active' : ''}`}
                                            onClick={()=>btnTypeAction(index, prTyArr.typeKey)}
                                        >
                                            {prTyArr.typeName}
                                        </span>
                            })
                        }
                    </div>
                    <div className="section-product-list">
                        {
                            products === null ?
                                <div className="product-list-wrapper--load">
                                    <Spinner/>
                                </div> :
                                <div className="product-list-wrapper">
                                    {
                                        products._id === undefined ? products.map((pr,index)=>{
                                            const starRating = [];
                                            for(var i = 0; i < pr.ratingStar; i++){
                                                starRating.push(<i className="fas fa-star" key={i}/>)
                                            }
                                            for(var j = 0; j < 5 - pr.ratingStar; j++){
                                                starRating.push(<i className="far fa-star" key={i+j}/>)
                                            }
                                            return <div className="product-item play-on-scroll bottom-up" key={index}>
                                                        <div className="product-item-image">
                                                            <Link 
                                                                to={`/product-detail/${pr._id}`} 
                                                                className="image-link"
                                                                onClick={()=>addHistory(pr)}
                                                            >
                                                                <img src={pr.productImage.mainImage.url} alt="" />
                                                            </Link>
                                                            <div className="image-tool">
                                                                <span>
                                                                    <i className="fas fa-plus" />
                                                                </span>
                                                                <span>
                                                                    <i className="far fa-heart" />
                                                                </span>
                                                            </div>
                                                            {
                                                                pr.productPrice.discountPrice !== 0 ?
                                                                    <span className="sale-label">
                                                                        <span>SALE!</span>
                                                                    </span> : ''
                                                            }
                                                        </div>
                                                        <div className="product-item-content">
                                                            <Link 
                                                                to={`/product-detail/${pr._id}`} 
                                                                className="content-name"
                                                                onClick={()=>addHistory(pr)}
                                                            >
                                                                {pr.productName}
                                                            </Link>
                                                            <div className="content-star">
                                                                {starRating}
                                                            </div>
                                                            <div className="content-price">
                                                                <span className="discount-price">
                                                                    { pr.productPrice.discountPrice === 0 ? 
                                                                        convertToCurrency(pr.productPrice.normalPrice) :
                                                                        convertToCurrency(pr.productPrice.discountPrice)
                                                                    }
                                                                </span>
                                                                {
                                                                    pr.productPrice.discountPrice !== 0 ?
                                                                    <span className="normal-price">
                                                                        {convertToCurrency(pr.productPrice.normalPrice)}
                                                                    </span> : ''
                                                                }
                                                            </div>
                                                            <div className="content-btn-add">
                                                                <span className="btn btn--green" 
                                                                    onClick={()=>{
                                                                        addToCart(pr, 1)
                                                                        toggleCartNoti()
                                                                    }}
                                                                >
                                                                    Thêm vào giỏ
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                        }):''
                                    }
                                </div>
                        }
                    </div>
                    {
                        products !== null ? products.length !== 0 ?
                            <div className="section-product-see-more">
                                <Link to="/product-list" className="btn btn--green see-more-btn">
                                    Xem tất cả
                                    <i className="fas fa-caret-right" />
                                </Link>
                            </div> : null :null
                    }
                </div>
            </div>
        </section>
    );
}

export default SectionProduct;