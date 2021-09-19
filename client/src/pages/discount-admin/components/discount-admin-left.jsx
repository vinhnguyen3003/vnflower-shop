import React, { useContext, useEffect, useRef, useState } from 'react';
import { UPDATE_COUNTDOWN_FLASHSALE } from '../../../contexts/constants';
import { ProductContext } from '../../../contexts/productContext';
import { DiscountAdminContext } from '../contexts/discountAdminContext';
import SaleIcon from './../images/sale.png';
import Spinner from './../../../components/spinner/spinner';

const contentSortArr = [
    {
        "name": "Mặc định",
        "filterKey": "null"
    },
    {
        "name": "Kích hoạt",
        "filterKey": true
    },
    {
        "name": "Chưa kích hoạt",
        "filterKey": false
    }
]
function DiscountAdminLeft() {
    const {productState: {products}, getProductsByCondition, destroyGetProduct} = useContext(ProductContext);
    const {setProductAdjust} = useContext(DiscountAdminContext);
   
    const [searchValue, setSearchValue] = useState("");
    const [disTypeMenuActive, setDisTypeMenuActive] = useState({0: false});
    var storageRef = useRef(null);

    const [filterValue, setFilterValue] = useState("");

    const [filterItemActive, setFilterItemActive] = useState(0);
    const [filterMenuActive, setFilterMenuActive] = useState(false);

    const [page, setPage] = useState(0);

    const handleChange = (e) => {
        const {value} = e.target;
        setSearchValue(value);

        //Debounce skill
        if(storageRef.current) clearTimeout(storageRef.current);

        if(storageRef) clearTimeout(storageRef);
        storageRef.current = setTimeout(() => {
            destroyGetProduct();
            getProductsByCondition(10 + page * 5, `flashsale=${filterValue}`, 'null', value.toLowerCase());
        }, 500)
    }
    const handleFilterChange = (index, filterKey) => {
        setFilterItemActive(index);
        setFilterValue(filterKey);
        setFilterMenuActive(false);
        destroyGetProduct();
        getProductsByCondition(10 + page * 5, `flashsale=${filterKey}`, 'null', searchValue.toLowerCase())
    }
    const resetSearchValue = () =>{
        if(searchValue !== ""){
            setSearchValue("");
            destroyGetProduct();
            getProductsByCondition(10 + page * 5, 'null', 'null', 'null');
        }
    }
    useEffect(() => {
        destroyGetProduct();
        getProductsByCondition(10 + page * 5, 'null', 'null', 'null');
    },[])
    return (
        <div className="discount-admin__left">
            <div className="discount-admin-left-title">
                Danh sách sản phẩm
            </div>
            <div className="discount-admin-left-content">
                <div className="discount-admin-content-tool">
                    <div className="discount-admin-content__search">
                        <input 
                            type="text" 
                            placeholder="Nhập mã sản phẩm hoặc tên sản phẩm cần tìm"
                            value={searchValue}
                            onChange={handleChange}
                        />
                        <span onClick={resetSearchValue}>Xóa</span>
                    </div>
                    <div className="discount-admin-content__filter">
                        <div 
                            className="content-filter-title"
                            onClick={()=>setFilterMenuActive(!filterMenuActive)}
                        >
                            {contentSortArr[filterItemActive].name} <i className="fas fa-caret-down"></i>
                        </div>
                        <ul className={`content-filter-list ${filterMenuActive ? '--active' : ''}`}>
                            {
                                contentSortArr.map((coSoArr, index) => {
                                    return <li 
                                                key={index}
                                                className="content-filter-item"
                                                onClick={()=>{handleFilterChange(index, coSoArr.filterKey)}}
                                            >{coSoArr.name}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <table className="discount-admin-content__table">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Tình trạng</th>
                            <th></th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products !== null ?
                            products.map((pr, index) => {
                                const {productName, productImage} = pr;
                                return <tr key={index}>
                                            <td>
                                                <img src={productImage.mainImage.url} alt="" />
                                            </td>
                                            <td>{productName}</td>
                                            <td>
                                                {
                                                    pr.flashsaleType && pr.flashsaleType.flashStatus ? <img src={SaleIcon} alt="" /> : 'Chưa kích hoạt'
                                                }
                                            </td>
                                            <td className="spec-td">
                                                <div
                                                    onMouseOver={()=>setDisTypeMenuActive({[index]: !disTypeMenuActive[index]})}
                                                    onMouseOut={()=>setDisTypeMenuActive({[index]: !disTypeMenuActive[index]})}
                                                >
                                                    <span className={`discount-type-title ${!pr.flashsaleType.flashStatus ? '--no-active' : ''}`}>
                                                        Hình thức <i className="fas fa-caret-down"></i>
                                                    </span> 
                                                    {
                                                        pr.flashsaleType && pr.flashsaleType.flashStatus ?
                                                            <ul className={`discount-type-menu ${disTypeMenuActive[index] === true ? '--active' : ''}`}>
                                                                {
                                                                    pr.flashsaleType.flashTypeArr.map((flTyArr, index) => {
                                                                        return <li key={index}>{flTyArr.name}</li>
                                                                    })
                                                                }
                                                            </ul> : null
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <span onClick={()=>setProductAdjust(pr)}>Tùy chỉnh</span>
                                            </td>
                                        </tr>
                            }) :
                            <tr>
                                <td colSpan="5" className="td-spinner">
                                    <Spinner />
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                {
                    products !== null ? 
                    products.length < 10 + page * 5 ? '' :
                        <div className="discount-admin-content__see-more">
                            <span onClick={()=>{
                                getProductsByCondition(10 + (page + 1) * 5, `flashsale=${filterValue}`, 'null', searchValue.toLowerCase())
                                setPage(page + 1)    
                            }}>
                                Xem thêm
                            </span>
                        </div> : null
                }
            </div>
        </div>
    );
}

export default DiscountAdminLeft;