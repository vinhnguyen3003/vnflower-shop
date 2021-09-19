import React, { useContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { getFullTime } from '../../../utils/time-method';
import { convertToCurrency } from '../../../utils/currency-method';
import { OrderContext } from '../../../contexts/orderContext';

// OrderAdminModal.propTypes = {};

function OrderAdminModal(props) {
    const {updateOrder} = useContext(OrderContext);
    const {_id, customerName, createAt, totalAll: {itemCount, totalPrice}, orderStatus, sex,
        customerPhone, customerAddress, deliveryMethod, customerRequest,
        cartInfo, orderNote} = props.order;
    const [orderNoteInput, setOrderNoteInput] = useState('');
    const closeOrderModal = (e) => {
        function getParentNode(element, level = 1) { // 1 - default value (if no 'level' parameter is passed to the function)
            while(level-- > 0) {
                element = element.parentNode;
                if(!element) {
                    return null; // to avoid a possible "TypeError: Cannot read property 'parentNode' of null" if the requested level is higher than document
                }
            }
            return element;
        }
        //getParentNode(e.target, 4).style.maxHeight = `0px`;
        getParentNode(e.target, 4).style.display = 'none';
    }
    useEffect(()=>{
        setOrderNoteInput(orderNote);
    },[])
    return (
        <td colSpan="7" className="order-admin-modal">
            <div className="order-admin-modal__wrapper">
                <div className="order-modal-wrapper">
                    <div className="order-modal-wrapper__top">
                        <div className="modal-customer-info">
                            <div className="modal-customer-info__title">
                                <span>Thông tin khách hàng</span> 
                            </div>
                            <ul className="modal-customer-info__content">
                                <li className="cus-info-item">
                                    <span>Tên khách hàng: </span>
                                    <span>{customerName}</span>
                                </li>
                                <li className="cus-info-item">
                                    <span>Giới tính: </span>
                                    <span>{sex}</span>
                                </li>
                                <li className="cus-info-item">
                                    <span>Số điện thoại: </span>
                                    <span>{customerPhone}</span>
                                </li>
                                <li className="cus-info-item">
                                    <span>Địa chỉ: </span>
                                    <span>{customerAddress}</span>
                                </li>
                                <li className="cus-info-item">
                                    <span>Thời gian lập hóa đơn: </span>
                                    <span>{getFullTime(createAt)}</span>
                                </li>
                                <li className="cus-info-item">
                                    <span>Hình thức giao hàng: </span>
                                    <span>{deliveryMethod}</span>
                                </li>
                                <li className="cus-info-item">
                                    <span>Yêu cầu từ khách hàng: </span>
                                    <span>{customerRequest ? customerRequest : 'Không có yêu cầu nào'}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="modal-customer-product">
                            <div className="modal-customer-product__title">
                                <span>Thông tin sản phẩm</span>
                            </div>
                            <table className="modal-customer-product__content">
                                <thead>
                                    <tr>
                                        <th>Hình ảnh</th>
                                        <th>Mã sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Giá bán</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartInfo.map((ca, index)=>{
                                            const {productImage, productID, productPrice, productName} = ca.product;
                                            return <tr key={index}>
                                                        <td>
                                                            <img src={productImage.mainImage.url} alt="" />
                                                        </td>
                                                        <td>{productID}</td>
                                                        <td>{productName}</td>
                                                        <td>{ca.quantity}</td>
                                                        <td>
                                                            { productPrice.discountPrice !== 0 ? convertToCurrency(productPrice.discountPrice) :
                                                                convertToCurrency(productPrice.normalPrice)
                                                            }
                                                        </td>
                                                    </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="order-modal-wrapper__bottom">
                        <div className="modal-bottom-total-all">
                            <div className="total-all total-all__item-count">
                                <span>Số lượng sản phẩm</span>
                                <span>{itemCount}</span>
                            </div>
                            <div className="total-all total-all__total-price">
                                <span>Tổng tiền cần thanh toán</span>
                                <span>{convertToCurrency(totalPrice)}</span>
                            </div>
                        </div>
                        <div className="modal-bottom-note">
                            <textarea 
                                name="" 
                                placeholder="Nhập ghi chú cho hóa đơn"
                                value={orderNoteInput}
                                onChange={(e)=>setOrderNoteInput(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="modal-bottom-btn">
                            <span 
                                className={`bottom-btn bottom-btn--yes ${orderStatus === 1 ? '--no-active' : ''}`}
                                onClick={(e)=>{
                                    updateOrder(_id, {
                                        orderNote: orderNoteInput, orderStatus: 1
                                    })
                                    closeOrderModal(e)
                                }}
                            >Tiến hành</span>
                            <span 
                                className={`bottom-btn bottom-btn--no ${orderStatus === 2 ? '--no-active' : ''}`}
                                onClick={(e)=>{
                                    updateOrder(_id, {
                                        orderNote: orderNoteInput, orderStatus: 2
                                    })
                                    closeOrderModal(e)
                                }}
                            >Tạm ngưng</span>
                            <span 
                                className="bottom-btn bottom-btn--exit"
                                onClick={closeOrderModal}
                            >Thoát</span>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    );
}

export default OrderAdminModal;