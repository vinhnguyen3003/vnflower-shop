import React, { useContext, useState } from 'react';
import BagIconImage from './../../images/shopping-bags.png';
import EmptyCartImage from './../../images/empty-cart.png';
import { CartContext } from '../../../../contexts/cartContext';
import { Link } from 'react-router-dom';
import {convertToCurrency} from './../../../../utils/currency-method';

function HeaderCart() {
    const {cartState: {cartItems, totalPrice}, deleteInCart} = useContext(CartContext);
    const [cartMenuStatus, setCartMenuStatus] = useState(false);
    return (
        <div className="header-cart">
            <div 
                className="header-cart__button"
                onClick={()=>setCartMenuStatus(true)}
            >
                <div className="button-cart-icon">
                    <img src={BagIconImage} alt="" />
                    <span>{cartItems.length}</span>
                </div>
                <span className="button-cart-title">Giỏ hàng</span>
            </div>
            <div className="header-cart__noti">
                Đã thêm một sản phẩm vào giỏ hàng
            </div>
            <div className={`header-cart__menu ${cartMenuStatus ? '--show' : ''}`}>
                {/* Add --show to show menu */}
                <div className="cart-menu-close">
                    <span onClick={()=>setCartMenuStatus(false)}>
                        <i className="fas fa-times" />
                    </span>
                </div>
                {
                    cartItems.length !== 0 ?
                    <>
                        <ul className="cart-menu-content">
                            {
                                cartItems.map((cart, index)=>{
                                    const {product, quantity} = cart;
                                    return <li className="cart-menu-content__item" key={index}>
                                                <a href="#vv" className="menu-content-img">
                                                    <img src={product.productImage.mainImage.url} alt="" />
                                                </a>
                                                <div className="menu-content-body">
                                                    <a href="#vv" className="body-name">
                                                        {product.productName}
                                                    </a>
                                                    <span className="body-quantity">Số lượng: {quantity}</span>
                                                    <span className="body-price">
                                                        {
                                                            product.productPrice.discountPrice !== 0 ?
                                                            convertToCurrency(product.productPrice.discountPrice) :
                                                            convertToCurrency(product.productPrice.normalPrice)
                                                        }
                                                    </span>
                                                </div>
                                                <div className="menu-content-remove">
                                                    <span onClick={()=>deleteInCart(product._id)}>
                                                        <i className="fas fa-times" />
                                                    </span>
                                                </div>
                                            </li>
                                })
                            }
                        </ul>
                        <div className="cart-menu-total">
                            <span>Tổng Tiền:</span>
                            <span>{convertToCurrency(totalPrice)}</span>
                        </div>
                        <div className="cart-menu-btn">
                            <Link to="/cart" className="btn btn--green">
                                Xem giỏ hàng
                                <i className="fas fa-shopping-cart" />
                            </Link>
                            <Link to="/" className="btn btn--green">
                                Tiếp tục mua
                                <i className="fas fa-money-bill-alt" />
                            </Link>
                        </div>
                    </> :
                    <div>
                        <div className="cart-menu-empty">
                            <div className="cart-menu-empty__img">
                                <img src={EmptyCartImage} alt="" />
                            </div>
                            <div className="cart-menu-empty__text">
                                Chưa có sản phẩm trong giỏ hàng
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default HeaderCart;