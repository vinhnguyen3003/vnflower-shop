import React, { useContext, useEffect } from 'react';
import { OrderContext } from '../../../contexts/orderContext';
import OrderAdminModal from './order-admin-modal';
import {convertToCurrency} from './../../../utils/currency-method';
import {getFullTime} from './../../../utils/time-method';
import { SocketContext } from '../../../contexts/socketContext';
import Spinner from '../../../components/spinner/spinner';
function OrderAdminContent() {
    const {orderState: {orders}, getOrders, deleteOrder, addOrderBySocket} = useContext(OrderContext);

    const {socketState: {socket}} = useContext(SocketContext)

    const openOrderModal = (e) => {
        let modalWrapperNode = e.target.parentNode.parentNode.nextSibling.getElementsByClassName('order-admin-modal__wrapper')[0];
        modalWrapperNode.style.display = 'block';
        //e.target.style.pointerEvents = 'none';
        //modalWrapperNode.style.maxHeight = `${modalWrapperNode.scrollHeight}px`;
    }
    useEffect(()=>{
        console.log('uu')
        console.log(socket)
        getOrders();
    },[])

    useEffect(()=>{
        socket.on('createOrderInAdmin', order => {
            //console.log('in admin')
            //console.log(order)
            addOrderBySocket(order);
        })
        return () => socket.off('createOrderInAdmin')
    },[socket, addOrderBySocket]);
    return (
        <div className="order-admin-content">
            <table>
                <thead>
                    <tr>
                        <th>Mã hóa đơn</th>
                        <th>Tên khách hàng</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Thời gian</th>
                        <th>Tình trạng</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length !== 0 ?
                        orders.map((order, index)=>{
                            const {_id, customerName, createAt, totalAll, orderStatus} = order;
                            let orderStatusText = 'Chưa xử lí';
                            if(orderStatus === 0) orderStatusText = 'Chưa xử lí';
                            if(orderStatus === 1) orderStatusText = 'Đã xử lí';
                            if(orderStatus === 2) orderStatusText = 'Tạm ngưng';
                            //Dùng react fragment để tạo thẻ cha bọc 2 thẻ tr khi muốn dùng với key={index}, nếu k thì cú pháp là <></>
                            return  <React.Fragment key={index}> 
                                        <tr>
                                            <td>{`HD-${_id.slice(4, 12)}`}</td>
                                            <td>{customerName}</td>
                                            <td>{totalAll.itemCount}</td>
                                            <td>{convertToCurrency(totalAll.totalPrice)}</td>
                                            <td>{getFullTime(createAt)}</td>
                                            <td>{orderStatusText}</td>
                                            <td>
                                                <span 
                                                    className="btn-order-action"
                                                    onClick={openOrderModal}
                                                >Chi tiết</span>
                                                <span 
                                                    className="btn-order-action"
                                                    onClick={()=>deleteOrder(_id)}
                                                >Xóa</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <OrderAdminModal order={order} index={index}/>
                                        </tr>
                                    </React.Fragment>
                        }):
                        <tr>
                            <td colSpan="7" className="td-spinner">
                                <Spinner />
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default OrderAdminContent;