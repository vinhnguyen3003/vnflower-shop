import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NotiContext } from '../../../../contexts/notificationContext';
import { SocketContext } from '../../../../contexts/socketContext';
import { getFullTime } from '../../../../utils/time-method';


function NavRightNoti() {
    const [notiMenuStatus, setNotiMenuStatus] = useState(false);
    const {notiState: {notifications}, addNotiBySocket, getNoti, updateNoti} = useContext(NotiContext);
    const {socketState: {socket}} = useContext(SocketContext);

    if(notifications){
        var numBadge = notifications.filter(noti => noti.isRead === false).length;
    }
    useEffect(()=>getNoti(),[]);
    useEffect(()=>{
        socket.on('createNotiInAdmin', noti => {
            addNotiBySocket(noti)
        })
        return () => socket.off('createNotiInAdmin');
    },[socket, addNotiBySocket])
    return (
        <li className="nav-item dropdown">
            <span 
                className="nav-link"
                onClick={()=>{setNotiMenuStatus(!notiMenuStatus)}}
            >
                <i
                className="fas fa-bell dropdown-toggle"
                data-toggle="notification-menu"
                />
                {
                    numBadge !== 0 ?
                        <span className="navbar-badge">{numBadge}</span> : null
                }
            </span>
            <ul 
                id="notification-menu" 
                className={`dropdown-menu ${notiMenuStatus ? 'dropdown-expand' : ''} notification-menu`}
            >
                <div className="dropdown-menu-header">
                    <span>Thông báo</span>
                </div>
                <ul className="dropdown-menu-content overlay-scrollbar scrollbar-hover">
                    {
                        notifications.length !== 0 ?
                        notifications.map((noti, index) => {
                            return <li className="dropdown-menu-item" key={index}>
                                        <Link 
                                            to="/admin/order" 
                                            className={`dropdown-menu-link ${!noti.isRead ? '--no-seen' : ''}`}
                                            onClick={()=>{
                                                updateNoti(noti._id)
                                                setNotiMenuStatus(false)
                                            }}
                                        >
                                            <div>
                                                <i className="fas fa-gift" />
                                                <span></span>
                                            </div>
                                            <span>
                                                <p>Bạn đã nhận được một đơn hàng mới</p>
                                                <p>Khách hàng: {noti.customerName}</p>
                                                <span>{getFullTime(noti.createAt)}</span>
                                            </span>
                                        </Link>
                                    </li>
                        }) : 
                        <li className="dropdown-menu-item --empty">
                            Chưa có thông báo nào
                        </li>
                    }
                </ul>
                <div className="dropdown-menu-footer">
                    <span>Xem tất cả</span>
                </div>
            </ul>
        </li>
    );
}

export default NavRightNoti;