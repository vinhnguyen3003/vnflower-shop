import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../../../../components/spinner/spinner';
import { CartContext } from '../../../../contexts/cartContext';
import { NotiContext } from '../../../../contexts/notificationContext';
import { OrderContext } from '../../../../contexts/orderContext';
import { SocketContext } from '../../../../contexts/socketContext';
import { convertToCurrency } from '../../../../utils/currency-method';
import { CheckOutContext } from '../../contexts/checkoutContext';
import {Validator} from './../../../../utils/validation';

const initialOrder = {
    customerName: '',
    customerPhone: '',
    customerRequest: '',
    district: '',
    province: '',
    street: '',
    village: ''
}
function SectionCheckout() {
    const {checkoutModalStatus, closeCheckoutModal, setCheckoutSuccess} = useContext(CheckOutContext);
    const {cartState: {cartItems, totalPrice, itemCount}, clearCart} = useContext(CartContext);
    const {addOrder} = useContext(OrderContext);
    const {addNoti} = useContext(NotiContext);
    const {socketState: {socket}} = useContext(SocketContext);

    const [sexCusActive, setSexCusActive] = useState(0);
    const [shipMethodActive, setShipMethodActive] = useState(0);
    const [order, setOrder] = useState(initialOrder);

    const sexCusArray = ['Nam', 'Nữ'];
    let sexCusList = sexCusArray.map((sexCus, index)=>{
        return <span 
                    key={index} 
                    onClick={()=>setSexCusActive(index)}
                >
                    <i className={`${sexCusActive === index ? 'fas fa-check-circle' : 'far fa-circle'}`} />
                    {sexCus}
                </span>
    })
    const shipMethodArray = ['Giao hàng tận nơi', 'Nhận trực tiếp tại cửa hàng'];
    let shipMethodList = shipMethodArray.map((shipMethod, index)=>{
        return <span 
                    key={index} 
                    onClick={()=>setShipMethodActive(index)}
                >
                    <i className={`${shipMethodActive === index ? 'fas fa-check-circle' : 'far fa-circle'}`} />
                    {shipMethod}
                </span>
    })
    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setOrder({...order, [name]: value});
    }
    const resetAllState = () => {
        setOrder(initialOrder);
        setSexCusActive(0);
        setShipMethodActive(0);
    }
    
    useEffect(()=>{
        Validator({
            form: '#modal-form',
            formGroupSelector: '.modal-form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#username', 'Trường này không được để trống'),
                Validator.isRequired('#phoneNumber', 'Số điện thoại không được để trống'),
                Validator.isUserName('#phoneNumber', 'Số điện thoại không đúng định dạng'),
                Validator.isRequired('#address-province', 'Trường này không được để trống'),
                Validator.isRequired('#address-district', 'Trường này không được để trống'),
                Validator.isRequired('#address-village', 'Trường này không được để trống')
            ],
            onSubmit: async function (data) {
                // Call API
                //console.log(data);
                const {customerName, customerPhone, customerRequest, district,
                    province, street, village} = data;
                try {
                    //console.log(socket)
                    const orderRes = await addOrder({
                        customerName,
                        customerPhone,
                        customerRequest,
                        customerAddress: street + ' ' + village + ' ' + district + ' ' + province,
                        sex: sexCusActive === 0 ? 'Nam' : 'Nữ',
                        deliveryMethod: shipMethodActive === 0 ? 'Giao hàng tận nơi' : 'Nhận trực tiếp tại cửa hàng',
                        cartInfo: cartItems,
                        totalAll: {
                            itemCount,
                            totalPrice
                        }
                    }, socket);
                    const loadingEl = document.getElementsByClassName('checkout-modal-loading')[0];
                    loadingEl.classList.add('--show');

                    const notiRes = await addNoti({
                        notiContent: 'Bạn đã nhận một đơn hàng mới',
                        customerName
                    }, socket)
                    
                    if(orderRes.success && notiRes.success){
                        loadingEl.classList.remove('--show');
                        resetAllState();
                        closeCheckoutModal();
                        clearCart();
                        setCheckoutSuccess(true)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        });
    },[socket, cartItems, sexCusActive, shipMethodActive])
    return (
        <section className={`section-checkout ${checkoutModalStatus ? '--show' : ''}`}>
            <div className="section-checkout__wrapper">
                <form className="section-checkout-modal" id="modal-form">
                    <div className="checkout-modal-header">
                        <span>Thanh toán</span>
                        <span onClick={()=>{
                            closeCheckoutModal()
                            resetAllState()
                        }}>
                            <i className="fas fa-times" />
                        </span>
                    </div>
                    <div className="checkout-modal-body">
                        <div className="checkout-modal-item">
                            <div className="modal-item-title">
                                {/* <span class="title-icon"></span> */}
                                Thông tin khách hàng
                            </div>
                            <div className="modal-item-content">
                                <div className="sex-customer">
                                    {sexCusList}
                                </div>
                                <div className="other-info">
                                    <div className="modal-form-group">
                                        <input 
                                            id="username" type="text" placeholder="Họ và Tên" 
                                            name="customerName" value={order.customerName} 
                                            onChange={handleChangeInput}
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                    <div className="modal-form-group">
                                        <input 
                                            id="phoneNumber" type="text" placeholder="Số điện thoại" 
                                            name="customerPhone" value={order.customerPhone} 
                                            onChange={handleChangeInput}
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-modal-item">
                            <div className="modal-item-title">
                                Nhập địa chỉ và thời gian nhận hàng
                            </div>
                            <div className="modal-item-content">
                                <div className="address-customer">
                                    <div className="modal-form-group">
                                        <input 
                                            id="address-province" type="text" placeholder="Thành phố / Tỉnh"
                                            name="province" value={order.province} 
                                            onChange={handleChangeInput}
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                    <div className="modal-form-group">
                                        <input 
                                            id="address-district" type="text" placeholder="Quận / Huyện" 
                                            name="district" value={order.district}
                                            onChange={handleChangeInput}
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                    <div className="modal-form-group">
                                        <input 
                                            id="address-village" type="text" placeholder="Phường / Xã" 
                                            name="village" value={order.village}
                                            onChange={handleChangeInput}
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                    <div className="modal-form-group">
                                        <input 
                                            id="address-street" type="text" placeholder="Số nhà / Tên đường" 
                                            name="street" value={order.street}
                                            onChange={handleChangeInput}    
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                </div>
                                <div className="other-request">
                                    <textarea 
                                        type="text" placeholder="Yêu cầu khác (Không bắt buộc)" 
                                        name="customerRequest" value={order.customerRequest}
                                        onChange={handleChangeInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="checkout-modal-item">
                            <div className="modal-item-title">Chọn hình thức giao hàng</div>
                            <div className="modal-item-content">
                                <div className="ship-method">
                                    {shipMethodList}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-modal-footer">
                        <div className="modal-footer-total">
                            <span>Tổng tiền:</span>
                            <span>{convertToCurrency(totalPrice)}</span>
                        </div>
                        <div className="modal-footer-button">
                            <button className="btn btn--green btn-purchase" type="submit">Đặt hàng</button>
                        </div>
                        <div className="modal-footer-text">
                            (Bạn có thể chọn hình thức thanh toán sau khi đặt hàng)
                        </div>
                    </div>
                    <div className="checkout-modal-loading">
                        <Spinner />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default SectionCheckout;