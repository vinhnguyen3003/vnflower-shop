import React, { useContext, useEffect, useState } from 'react';
import {ProductAdminContext} from '../contexts/productAdminContext';
import {convertToCurrency} from './../../../utils/currency-method';
import {getDD_MM_YYYY} from './../../../utils/time-method';
import { ProductContext } from '../../../contexts/productContext';
import Spinner from './../../../components/spinner/spinner';

function CartContent() {
    const {
        productState: {products},
        getProducts,
        deleteProduct,
        destroyGetProduct
    } = useContext(ProductContext);

    const {setEditStatus, setPrFindID, setPrModalStatus} = useContext(ProductAdminContext);

    const [searchKey, setSearchKey] = useState('');
    const [page, setPage] = useState(0);

    const handleChangeInput = (e) => {
        const {value} = e.target;
        setSearchKey(value);
    }
    const handleSearchAction = () => {
        if(searchKey !== ''){
            destroyGetProduct();
            setPage(0);
            getProducts(10 + page * 5, searchKey);
        }
    }
    const handleDeleteAction = () => {
        if(searchKey !== ''){
            setSearchKey('');
            destroyGetProduct();
            setPage(0);
            getProducts(10 + page * 5, 'null');
        }
    }
    const updateAction = (product) => {
        setPrFindID(product); 
        setEditStatus(true);
        setPrModalStatus(true);
    }
    const removeProduct = async (id) => {
        try {
            const res = await deleteProduct(id);
        } catch (error) {
            console.log(error);
        }
    }
    //console.log(products)
    useEffect(()=>{
        destroyGetProduct();
        getProducts(10, 'null');
    },[])
    return (
        <div className="card-content">
            <div className="card-content__search">
                <input 
                    type="text" 
                    placeholder="Nhập từ khóa cần tìm"
                    value={searchKey}
                    onChange={handleChangeInput}
                />
                <span 
                    className="card-content-search__delete"
                    onClick={handleDeleteAction}
                >Xóa</span>
                <span 
                    className="card-content-search__done"
                    onClick={handleSearchAction}
                >Tìm kiếm</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Loại sản phẩm</th>
                        <th>Giá bán</th>
                        <th>Ngày đăng</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products !== null ? products.map((product, index)=>(
                            <tr key={index}>
                                <td>{product.productID}</td>
                                <td>{product.productName}</td>
                                <td>{product.category.categoryName}</td>
                                <td>
                                    {
                                        product.productPrice.discountPrice !== 0 ?
                                        convertToCurrency(product.productPrice.discountPrice) :
                                        convertToCurrency(product.productPrice.normalPrice)
                                    }
                                </td>
                                <td>{getDD_MM_YYYY(product.createAt)}</td>
                                <td>
                                    <span 
                                        onClick={()=>updateAction(product)}
                                    >
                                        Cập nhật
                                    </span>
                                    <span
                                        onClick={()=>removeProduct(product._id)}
                                    >
                                        Xóa
                                    </span>
                                </td>
                            </tr>
                        )) : 
                        <tr>
                            <td colSpan="6" className="table-body-empty">
                                <Spinner />
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            {
                products !== null ? 
                products.length < 10 + page * 5 ? '' :
                    <div className="cart-content__see-more">
                        <span onClick={()=>{console.log("vv")
                            getProducts(10 + (page + 1) * 5, searchKey)
                            setPage(page + 1)    
                        }}>
                            Xem thêm
                        </span>
                    </div> : null
            }
        </div>
    );
}

export default CartContent;