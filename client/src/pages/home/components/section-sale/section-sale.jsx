import React, { useContext, useEffect, useRef, useState} from 'react';

import { countdownTime2 } from './../../../../utils/time-method';
import { convertToCurrency } from '../../../../utils/currency-method';

import { ProductContext } from '../../../../contexts/productContext';
import { Link } from 'react-router-dom';

import SwiperCore, { Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CartContext } from '../../../../contexts/cartContext';
import { HistoryContext } from '../../../../contexts/historyContext';
import { SocketContext } from '../../../../contexts/socketContext';
import toggleCartNoti from '../../../../utils/toggle-cart-noti';

SwiperCore.use([Pagination, Scrollbar]);


function SectionSale() {
    
    const {
            productState: {flashsale, productsFlashsale}, 
            getCountDownFlashsale,
            getProductsFlashsale,
            getCountDownFlashsaleBySocket,
            //updateCountdownFlashsale
        } = useContext(ProductContext);
    const {addToCart} = useContext(CartContext);
    const {addHistory} = useContext(HistoryContext);
    const {socketState: {socket}} = useContext(SocketContext);

    const [countdownArr, setCountdownArr] = useState([]);
    //help save interval status for destroy
    var intervalRef = useRef(null);

    const cancelCountdown = () => {
        if(intervalRef.current) clearInterval(intervalRef.current);
        setCountdownArr([]);
        //getCountDownFlashsale()
        //updateCountdownFlashsale(flashsale._id, {countdown: 'null'}, socket);
    }
    
    const activateCountdown =() => {
        var timeArrayFirst = [];

        intervalRef.current = setInterval( ()=>{
            //Kiểm tra khi trường hợp flashsale.countdown không tồn tại
            if(flashsale.countdown) timeArrayFirst = countdownTime2(flashsale.countdown);
            
            if(timeArrayFirst[4] < 0){
                cancelCountdown();
            }else{
                setCountdownArr(timeArrayFirst);
            }
        }, 1000);
    }

    useEffect(() => {
        if(intervalRef.current) clearInterval(intervalRef.current);
        if(flashsale.countdown !== 'null') activateCountdown();

        return ( () => {
            if(intervalRef.current) clearInterval(intervalRef.current)
        })
    },[flashsale])

    useEffect(()=>{
        getCountDownFlashsale();
        getProductsFlashsale(10, 'flashsale=true', 'null', 'null');
    },[])

    //console.log(flashsale)
    useEffect(()=>{//console.log(socket.connected)
        if(socket.connected !== undefined){
            socket.on('getCountdown', countdown => {
                getCountDownFlashsaleBySocket(countdown)
            })

        }
    },[socket, getCountDownFlashsaleBySocket])
    return (
        <section className="section-sale">
            <div className="section-sale__wrapper">
                <div className="section-sale-title">
                    <div className="section-sale-heading">
                        <div className="heading-title">
                            <span>C</span>hương
                            <span> T</span>rình
                            <span> K</span>huyến
                            <span> M</span>ãi
                        </div>
                        <div className="heading-content">
                            Chương trình khuyến mãi được áp dụng vào các ngày trong tuần với thời
                            gian nhất định. Đừng chần chờ nữa, hãy nhanh chóng mua những loại hoa
                            mà mình thích cùng nhiều ưu đãi.
                        </div>
                    </div>
                </div>
                {
                    flashsale.countdown === 'null' ?
                        <div className={`flash-sale-expire ${flashsale.countdown === 'null' ? '--active' : ''}`}>
                            <div className="expire-text">Đã Kết Thúc</div>
                        </div> :
                        <div className="section-sale-time">
                            <div className="countdown-item">
                                <span className="countdown-item__time" id="days">{countdownArr[0] ? countdownArr[0] : '0'}</span>
                                <span className="countdown-item__text">Ngày</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-item__time" id="hours">{countdownArr[1] ? countdownArr[1] : '00'}</span>
                                <span className="countdown-item__text">Giờ</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-item__time" id="minutes">{countdownArr[2] ? countdownArr[2] : '00'}</span>
                                <span className="countdown-item__text">Phút</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-item__time" id="seconds">{countdownArr[3] ? countdownArr[3] : '00'}</span>
                                <span className="countdown-item__text">Giây</span>
                            </div>
                        </div>
                }
                
                <div className="section-sale-content play-on-scroll bottom-up">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {
                            productsFlashsale ? productsFlashsale.map((pr, index) => {
                                const {productName, productImage, ratingStar, productPrice, flashsaleType} = pr;
                                const starRating = [];
                                for(var i = 0; i < ratingStar; i++){
                                    starRating.push(<i className="fas fa-star" key={i}/>)
                                }
                                for(var j = 0; j < 5 - ratingStar; j++){
                                    starRating.push(<i className="far fa-star" key={i+j}/>)
                                }
                                return <SwiperSlide key={index}>
                                            <div className="product-item pr-item-slide">
                                                <div className="product-item-image">
                                                    <Link 
                                                        to={`/product-detail/${pr._id}`} 
                                                        className="image-link"
                                                        onClick={()=>addHistory(pr)}
                                                    >
                                                        <img src={productImage.mainImage.url} alt="" />
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
                                                        {productName}
                                                    </Link>
                                                    <div className="content-star">
                                                        {starRating}
                                                    </div>
                                                    {/* {
                                                        flashsaleType.flashStatus &&  flashsale.countdown !== 'null'? 
                                                        <> */}
                                                            <span className="line line-top" />
                                                            <div className="content-promotion">
                                                                <h4 className="promotion-title">
                                                                    Khuyến Mãi
                                                                </h4>
                                                                <div className="promotion-content">
                                                                    {
                                                                        flashsaleType.flashTypeArr.map((flTyArr, index) => {
                                                                            return <span key={index}>{flTyArr.name}</span>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div> 
                                                            <span className="line line-bottom" />
                                                        {/* </> : null
                                                    } */}
                                                    <div className="content-price">
                                                        <span className="discount-price">
                                                            { pr.productPrice.discountPrice === 0 ? 
                                                                convertToCurrency(productPrice.normalPrice) :
                                                                convertToCurrency(productPrice.discountPrice)
                                                            }
                                                        </span>
                                                        {
                                                            pr.productPrice.discountPrice !== 0 ?
                                                            <span className="normal-price">
                                                                {convertToCurrency(productPrice.normalPrice)}
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
                                                        >Thêm vào giỏ</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                            }) : null
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default SectionSale;