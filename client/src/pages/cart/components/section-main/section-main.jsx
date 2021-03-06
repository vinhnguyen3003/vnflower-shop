import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { CartContext } from '../../../../contexts/cartContext';
import { convertToCurrency } from '../../../../utils/currency-method';
import { CheckOutContext } from '../../contexts/checkoutContext';
import EmptyCartImage from './../images/empty-cart.png';
import ThankYouImage from './../images/thank-you.png';

function SectionMain() {
    const {cartState: {cartItems, totalPrice}, deleteInCart, updateInCart} = useContext(CartContext);
    const {openCheckoutModal, checkoutSuccess, setCheckoutSuccess} = useContext(CheckOutContext);
    const [prQuantity, setPrQuantity] = useState([]);

    function onHandleChange(event, index, prID){
        let targer = event.target;
        let value = targer.value;
        let newPrQuantityArr = [...prQuantity];
        if(value !== '' && !isNaN(value) && parseInt(value) > 0){
            newPrQuantityArr[index] = parseInt(value);
            setPrQuantity(newPrQuantityArr);
            updateInCart(prID, parseInt(value));
        }
        if(value === ''){
            newPrQuantityArr[index] = "";
            setPrQuantity(newPrQuantityArr);
        }
    }
    function onBlurInput(index, prID){
        if(prQuantity[index] === ''){
            let newPrQuantityArr = [...prQuantity];
            newPrQuantityArr[index] = 1;
            setPrQuantity(newPrQuantityArr);
            updateInCart(prID, newPrQuantityArr[index]);
        }
    }
    function increaseCartQuantity(index, prID){
        let newPrQuantityArr = [...prQuantity];
        newPrQuantityArr[index] += 1;
        setPrQuantity(newPrQuantityArr);
        updateInCart(prID, newPrQuantityArr[index]);
    }
    function decreaseCartQuantity(index, prID){
        let newPrQuantityArr = [...prQuantity];
        if(newPrQuantityArr[index] <= 1) newPrQuantityArr[index] = 1;
        else newPrQuantityArr[index] -= 1;
        setPrQuantity(newPrQuantityArr);
        updateInCart(prID, newPrQuantityArr[index]);
    }
    useEffect(()=>{
        if(cartItems.length > 0){
            let newPrQuantity = [];
            cartItems.forEach( cartItem => {
                newPrQuantity.push(cartItem.quantity);
            })
            setPrQuantity(newPrQuantity);
        }
        return () => {
            if(checkoutSuccess) setCheckoutSuccess(false);
        }
    },[])
    return (
        <section className="section-main-cart">
            {
                cartItems.length !== 0 ?
                <div className="container section-main__wrapper">
                    <div className="section-main-title">
                        Gi??? h??ng <span>({cartItems.length} s???n ph???m)</span>
                    </div>
                    <div className="section-main-content">
                        <div className="main-cart-left">
                            {
                                cartItems.map((cartItem, index)=>{
                                    const {product} = cartItem;
                                    const {productImage, productName, productPrice, _id} = product;
                                    return  <div className="main-left-item" key={index}>
                                                <div className="main-left-item__img">
                                                    <img src={productImage.mainImage.url} alt="" />
                                                </div>
                                                <div className="main-left-item__info">
                                                    <Link to={`product-detail/${_id}`}>{productName}</Link>
                                                    {/* <ul class="info-spec-list">
                                                        <li class="info-spec-item">M??u ?????</li>
                                                    </ul> */}
                                                </div>
                                                <div className="main-left-item__quantity">
                                                    <div className="quantity-button">
                                                        <span className="quantity-text">S??? l?????ng</span>
                                                        <input 
                                                            type="text" 
                                                            value={prQuantity[index] !== undefined ? prQuantity[index] : ""}
                                                            onChange={(e)=>onHandleChange(e, index, _id)}
                                                            onBlur={()=>onBlurInput(index, _id)}
                                                        />
                                                        <span 
                                                            className="quantity-icon quantity-icon-up"
                                                            onClick={()=>increaseCartQuantity(index, _id)}
                                                        >
                                                            <i className="fas fa-angle-up" />
                                                        </span>
                                                        <span 
                                                            className={`quantity-icon quantity-icon-down ${prQuantity[index] <= 1 ? '--non-active' : ''}`}
                                                            onClick={()=>decreaseCartQuantity(index, _id)}
                                                        >
                                                            <i className="fas fa-angle-down" />
                                                        </span>
                                                    </div>
                                                    <div className="quantity-remove" onClick={()=>deleteInCart(_id)}>
                                                        <i className="far fa-trash-alt" />
                                                        X??a
                                                    </div>
                                                </div>
                                                <div className="main-left-item__price">
                                                    {productPrice.discountPrice === 0 ? convertToCurrency(productPrice.normalPrice) : convertToCurrency(productPrice.discountPrice)}
                                                </div>
                                            </div>
                                })
                            }
                        </div>
                        <div className="main-cart-right">
                            <div className="main-right-result">
                                <span className="result-title">T???ng c???ng:</span>
                                <span className="result-total">{convertToCurrency(totalPrice)}</span>
                                {/* <p>(Ch??a bao g???m ph?? v???n chuy???n n???u c??)</p> */}
                            </div>
                            <div className="main-right-btn">
                                <Link to="/" 
                                    className="btn btn--green right-btn-checkout"
                                >
                                    Ti???p t???c mua s???m
                                </Link>
                                <button 
                                    className="btn btn--green right-btn-checkout"
                                    onClick={openCheckoutModal}
                                >
                                    Ti???n h??nh thanh to??n
                                </button>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className="container section-main__wrapper section-main__empty">
                    {  
                        checkoutSuccess === true ?
                        <>
                            <div className="checkout-success-image">
                                <img src={ThankYouImage} alt="" />
                            </div>
                            <div className="checkout-success-text">
                                <span>???? ???? ?????t h??ng th??nh c??ng ????</span>
                                <span>C???m ??n b???n ???? tin t?????ng v?? ???ng h??? c???a h??ng </span>
                                <span>C???a h??ng s??? li??n h??? b???n trong th???i gian s???m nh???t</span>
                            </div>
                        </> :
                        <>
                            <div className="cart-empty-image">
                                <img src={EmptyCartImage} alt="" />
                            </div>
                            <div className="cart-empty-text">Ch??a c?? s???n ph???m trong gi??? h??ng</div>
                        </>
                    }
                    <Link to="/" className="btn btn--green cart-empty-btn">Ti???p t???c mua s???m</Link>
                </div>
            }
        </section>
    );
}

export default SectionMain;