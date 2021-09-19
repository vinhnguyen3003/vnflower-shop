import React, { useContext, useState } from 'react';
import { CartContext } from '../../../../contexts/cartContext';
import { convertToCurrency } from '../../../../utils/currency-method';
import toggleCartNoti from '../../../../utils/toggle-cart-noti';

SectionMainRight.propTypes = {
    
};

function SectionMainRight(props) {
    const {addToCart} = useContext(CartContext);
    const {product} = props;
    const [prQuantity, setPrQuantity] = useState(1);
    const [colorActive, setColorActive] = useState({index: 0, title: "Màu đỏ", stock: 0});
    const [sizeActive, setSizeActive] = useState({index: 0, title: "Nhỏ", extra: 0});
    const [alertMess, setAlertMess] = useState("");

    if(colorActive.stock === 0 && product._id !== undefined) {
        for(let i = 0; i < product.productOption.color.length; i++){
            if(parseInt(product.productOption.color[i].stock) !== 0) {
                setColorActive({index: i, title: product.productOption.color[i].title, stock: product.productOption.color[i].stock});
                break;
            }
        }
    }
    function activeAlertMess(){
        setAlertMess(`${colorActive.title} chỉ còn lại ${colorActive.stock} hoa, bạn không thể chọn thêm`);
        setTimeout(()=>setAlertMess(""), 3000);
    }
    function adjustColorActive(value){
        if(value.stock < prQuantity) setPrQuantity(value.stock);
        setColorActive(value)
    }
    function onHandleChange(event){
        let targer = event.target;
        let value = targer.value;
        if(value !== '' && !isNaN(value) && parseInt(value) > 0){
            setPrQuantity(parseInt(value));
        }
        if(value === ''){
            setPrQuantity(value)
        }
    }
    function onBlueInput(){
        if(prQuantity === ''){
            setPrQuantity(1)
        }else{
            if(parseInt(prQuantity) > colorActive.stock) {
                setPrQuantity(colorActive.stock);
                activeAlertMess();
            }
            else setPrQuantity(parseInt(prQuantity));
        }
    }
    function changePrQuantity(step){
        if(prQuantity + step <= 1){
            setPrQuantity(1);
        }else{
            if(prQuantity + step > colorActive.stock) {
                setPrQuantity(colorActive.stock);
                activeAlertMess();
            }
            else setPrQuantity(prQuantity + step);
        }
    }
    const starRating = [];
    if(starRating.length === 0 && product.ratingStar){
        for(var i = 0; i < product.ratingStar; i++){
            starRating.push(<i className="fas fa-star" key={i}/>)
        }
        for(var j = 0; j < 5 - product.ratingStar; j++){
            starRating.push(<i className="far fa-star" key={i+j}/>)
        }
    }
    var prOpStorage = [];
    if(product.productOption) product.productOption.color.map((co, index)=>{
        if(co.stock !== "0") prOpStorage.push(
                <li 
                    className={`option-item ${colorActive.index === index ? '--active' : ''}`}
                    key={index}
                    onClick={()=>adjustColorActive({index: index, title: co.title, stock: parseInt(co.stock)})}
                >
                    <span className="option-item__icon" />
                    <span className="option-item__text">{co.title}</span>
                </li> 
        ) 
        return prOpStorage;
    })
    return (
        <div className="section-main-right">
            <div className="main-right-header">
                <div className="right-header-name">{product.productName}</div>
                <div className="right-header-star">
                    {starRating}
                </div>
                <div className="right-header-price">
                    <span className="discount-price">
                        { product.productPrice.discountPrice !== 0 ? 
                            convertToCurrency(product.productPrice.discountPrice) :
                            convertToCurrency(product.productPrice.normalPrice)
                        }
                    </span>
                    {
                        product.productPrice.discountPrice !== 0 ?
                        <span className="normal-price">
                            {convertToCurrency(product.productPrice.normalPrice)}
                        </span> : ''
                    }
                </div>
            </div>
            <div className="main-right-body">
                <div className="right-body-stock">
                    Tình trạng:
                    <span>
                        Còn lại <b>{colorActive.stock}</b> hoa
                    </span>
                </div>
                <div className="right-body-description">
                    {product.productInfo.title}
                </div>
                <div className="right-body-option">
                    <div className="option">
                        <div className="option-active">
                            Màu sắc:
                            <span>{colorActive.title}</span>
                        </div>
                        <ul className="option-list">
                            { prOpStorage }
                        </ul>
                    </div>
                    <div className="option">
                        <div className="option-active">
                            Kích cỡ:
                            <span>{sizeActive.title}</span>
                        </div>
                        <ul className="option-list">
                            {
                                product.productOption.size.map((si, index) => {
                                    return <li 
                                                className={`option-item ${sizeActive.index === index ? '--active' : ''}`}
                                                key={index}
                                                onClick={()=>setSizeActive({index, title: si.title, extra: parseInt(si.extra)})}
                                            >
                                                <span className="option-item__icon" />
                                                <span className="option-item__text">{`${si.title} (+${convertToCurrency(parseInt(si.extra))})`}</span>
                                            </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="main-right-footer">
                {
                    alertMess !== "" ?
                        <span className="right-footer-message">{alertMess}</span> : ''
                }
                <div className="right-footer-first">
                    <div className="footer-first-quantity">
                        <span className="quantity-text">Số lượng</span>
                        <input 
                            type="text" 
                            value={prQuantity}
                            onChange={onHandleChange}
                            onBlur={onBlueInput}
                        />
                        <span 
                            className="quantity-icon quantity-icon-up"
                            onClick={()=>changePrQuantity(1)}
                        >
                            <i className="fas fa-angle-up" />
                        </span>
                        <span 
                            className={`quantity-icon quantity-icon-down ${prQuantity <= 1 ? '--non-active' : ''}`}
                            onClick={()=>changePrQuantity(-1)}
                        >
                            <i className="fas fa-angle-down" />
                        </span>
                    </div>
                    <div className="footer-first-button">
                        <button 
                            className="btn btn--green footer-first-btn"
                            onClick={()=>{
                                addToCart(product, prQuantity); 
                                setPrQuantity(1)
                                toggleCartNoti()
                            }}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
                <div className="right-footer-second">
                    <span className="footer-second-title">Gợi ý:</span>
                    <ul className="footer-second-list">
                        <li className="link-item">
                            <a href="#vv">Hoa Hướng Dương</a>
                        </li>
                        <li className="link-item">
                            <a href="#vv">Hoa Lan</a>
                        </li>
                        <li className="link-item">
                            <a href="#vv">Hoa Tulip</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SectionMainRight;