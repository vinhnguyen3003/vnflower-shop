import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../../contexts/cartContext';
import { ProductContext } from '../../../../contexts/productContext';
import { convertToCurrency } from '../../../../utils/currency-method';
import { PrListContext } from '../../contexts/prListContext';
import NoResultImage from './../../images/crying.png';
import Spinner from './../../../../components/spinner/spinner';
import Loading from '../../../../components/loading/loading';
import scrollAnimation from '../../../../utils/scroll-animation';
import { HistoryContext } from '../../../../contexts/historyContext';
import { SocketContext } from '../../../../contexts/socketContext';
import toggleCartNoti from '../../../../utils/toggle-cart-noti';

const sortItemArr = [
    {
        "sortName": "Phổ biến nhất",
        "sortKey": "popular"
    },
    {
        "sortName": "Giá từ thấp đến cao",
        "sortKey": "priceInc"
    },
    {
        "sortName": "Giá từ cao đến thấp",
        "sortKey": "priceDesc"
    },
    {
        "sortName": "Mới nhất",
        "sortKey": "newest"
    }
]

function SectionMainProduct() {
    const {setSortKey, page, setPage, loadMore, setLoadMore, handlePageAction} = useContext(PrListContext);
    const {productState: {products, flashsale}, 
    getCountDownFlashsale, getCountDownFlashsaleBySocket} = useContext(ProductContext);
    const {addToCart} = useContext(CartContext);
    const {addHistory} = useContext(HistoryContext);
    const {socketState: {socket}} = useContext(SocketContext);

    const [sortMenuStatus, setSortMenuStatus] = useState(false);
    const [sortItemActive, setSortItemActive] = useState(0);

    let toggleMenuStatus = () =>{
        if(sortMenuStatus) setSortMenuStatus(false);
        else setSortMenuStatus(true);
    }
    useEffect(()=>{getCountDownFlashsale()},[]);

    useEffect(() => {
        if(socket.connected){
            socket.on('getCountdown', countdown => {
                getCountDownFlashsaleBySocket(countdown);
            })
        }
    },[socket, getCountDownFlashsaleBySocket])

    useEffect(()=>{
        setLoadMore(false);
        scrollAnimation();
    },[products])

    return (
        <div className="section-main-product">
            <div className="main-product-result">
                <span className="main-product-result__title">Kết quả tìm thấy</span>
                <span className="main-product-result__content">
                    {products !== null ?`${products.length} hoa phù hợp` : null}
                </span> 
            </div>
            <div className="main-product-sort">
                <div className="product-sort-wrapper">
                    <span className="sort-title" onClick={toggleMenuStatus}>
                        {sortItemArr[sortItemActive].sortName}
                        <i className="fas fa-sort-down" />
                    </span>
                    <ul className={`sort-menu ${sortMenuStatus ? '--active' : ''}`}>
                        {
                            sortItemArr.map((soItArr, index)=>{
                                return <li 
                                            className={`sort-menu__item ${sortItemActive === index ? '--active' : ''}`}
                                            key={index}
                                            onClick={()=>{
                                                setSortItemActive(index)
                                                setSortKey(soItArr.sortKey)
                                                toggleMenuStatus()
                                                setPage(0)
                                            }}
                                        >
                                            <span className="sort-item-icon" />
                                            <span className="sort-item-text">{soItArr.sortName}</span>
                                        </li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="main-product-list">
                {
                    products !== null ?
                        <>
                        <div className="product-list-wrapper">
                            {
                                products.map((pr, index)=>{
                                    const starRating = [];
                                    for(var i = 0; i < pr.ratingStar; i++){
                                        starRating.push(<i className="fas fa-star" key={i}/>)
                                    }
                                    for(var j = 0; j < 5 - pr.ratingStar; j++){
                                        starRating.push(<i className="far fa-star" key={i+j}/>)
                                    }
                                    return <div className="product-item pr-list-style play-on-scroll fade-in" key={index}>
                                                <div className="product-item-image">
                                                    <Link 
                                                        to={`/product-detail/${pr._id}`} 
                                                        className="image-link"
                                                        onClick={()=>{addHistory(pr)}}
                                                    >
                                                        <img src={pr.productImage.mainImage.url} alt=""/>
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
                                                        onClick={()=>{addHistory(pr)}}
                                                    >
                                                        {pr.productName}
                                                    </Link>
                                                    {
                                                        pr.flashsaleType.flashStatus &&  flashsale.countdown !== 'null' ? 
                                                        <>
                                                            <span className="line line-top" />
                                                            <div className="content-promotion">
                                                                <h4 className="promotion-title">
                                                                    Khuyến Mãi
                                                                    <i className="fas fa-sort-down" />
                                                                </h4>
                                                                <div className="promotion-content">
                                                                    {
                                                                        pr.flashsaleType.flashTypeArr.map((flTyArr, index) => {
                                                                            return <span key={index}>{flTyArr.name}</span>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div> 
                                                            <span className="line line-bottom" />
                                                        </> : null
                                                    }
                                                    <div className="content-star --mt-auto">
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
                                                        <span 
                                                            className="btn btn--green"
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
                                })
                            }
                            
                        </div>
                        {
                            loadMore ?
                                <div className="product-list__load-more">
                                    <span 
                                        className="btn btn--green"
                                    >
                                        {Loading('--pr-list')}
                                    </span>
                                </div> :
                                products.length < 12 + (page * 4) ? //12: amount of item in page, 4: amount of item load more
                                    null :
                                    <div className="product-list__load-more">
                                        <span 
                                            className="btn btn--green"
                                            onClick={handlePageAction}
                                        >
                                            Xem thêm
                                        </span>
                                    </div> 
                        }
                        </> : 
                        <div className="product-list-wrapper--loading">
                            <Spinner />
                        </div>
                }
                {
                    products !== null && products.length === 0 ?
                        <div className="product-list-no-result">
                            <div className="no-result-img">
                                <img src={NoResultImage} alt="" />
                            </div>
                            <div className="no-result-text">
                                Không thể tìm thấy kết quả bạn mong muốn
                            </div>
                        </div> : null
                }
            </div>
        </div>
    );
}

export default SectionMainProduct;