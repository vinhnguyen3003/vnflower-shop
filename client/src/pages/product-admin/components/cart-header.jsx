import React, { useContext } from 'react';
import {ProductAdminContext} from './../contexts/productAdminContext';


function CartHeader(props) {
    const {setPrModalStatus, setEditStatus} = useContext(ProductAdminContext);
    return (
        <div className="card-header">
            <h3>Sản phẩm</h3>
            <span onClick={()=>{setPrModalStatus(true); setEditStatus(false)}}>
                Thêm sản phẩm
                <i className="fas fa-plus"></i>
            </span>
        </div>
    );
}

export default CartHeader;