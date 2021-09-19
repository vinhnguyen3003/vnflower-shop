import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CateContext } from '../../../../contexts/categoryContext';
import { HistoryContext } from '../../../../contexts/historyContext';
import { convertToCurrency } from '../../../../utils/currency-method';
import { PrListContext } from '../../contexts/prListContext';

const priceRanges = [
    {
        "title": "Tất cả",
        "key": "null"
    },
    {
        "title": "Dưới 200.000đ",
        "key": "0-200000"
    },
    {
        "title": "Từ 200.000đ - 500.000đ",
        "key": "200000-500000"
    },
    {
        "title": "Từ 500.000đ - 1.000.000đ",
        "key": "500000-1000000"
    },
    {
        "title": "Từ 1.000.000đ trở lên",
        "key": "1000000"
    }
]
const colors = [
    {
        "title": "Tất cả",
        "key": "null"
    },
    {
        "title": "Màu Đỏ",
        "key": "red"
    },
    {
        "title": "Màu Vàng",
        "key": "yellow"
    },
    {
        "title": "Màu Hồng",
        "key": "pink"
    },
    {
        "title": "Màu Trắng",
        "key": "white"
    }
]
function SectionMainFilter() {
    const {setCategoryKey, setPriceRangeKey, setColorKey, setPage} = useContext(PrListContext);
    const {cateState: {categories}, getCategories} = useContext(CateContext);
    const {historyState: {prHistorys}, addHistory} = useContext(HistoryContext);
    const [cateActive, setCateActive] = useState(0);
    const [priceRangeActive, setPriceRangeActive] = useState(0);
    const [colorActive, setColorActive] = useState(0)
    const history = useHistory();
    
    useEffect(()=>{getCategories()},[]);
    return (
        <div className="section-main-filter">
            {
                !history.location.search ?
                    <div className="main-filter main-filter-type">
                        <div className="filter-title">Loại Hoa</div>
                        <div className="filter-content">
                            <ul className="content-list">
                                <li className={`content-item ${cateActive === 0 ? '--active' : ''}`} 
                                    onClick={()=>{
                                        setCateActive(0);
                                        setCategoryKey(`category=null`);
                                    }}
                                >
                                    <span className="content-item-icon-active" />
                                    <span className="content-item-value">Tất cả</span>
                                </li>
                                {
                                    categories.map((cate, index)=>{
                                        return <li className={`content-item ${cateActive === index + 1 ? '--active' : ''}`} 
                                                    key={index + 1}
                                                    onClick={()=>{
                                                        setCateActive(index + 1);
                                                        setCategoryKey(`category=${cate._id}`);
                                                        setPage(0);
                                                    }}
                                                >
                                                    <span className="content-item-icon-active" />
                                                    <span className="content-item-value">{cate.categoryName}</span>
                                                </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div> : null
            }
            <div className="main-filter main-filter-price">
                <div className="filter-title">Giá Bán</div>
                <div className="filter-content">
                    <ul className="content-list">
                        {
                            priceRanges.map((prRa, index) => {
                                return <li className={`content-item ${priceRangeActive === index ? '--active' : ''}`} 
                                            key={index}
                                            onClick={()=>{
                                                setPriceRangeActive(index);
                                                setPriceRangeKey(`price=${prRa.key}`);
                                                setPage(0);
                                            }}
                                        >
                                            <span className="content-item-icon-active" />
                                            <span className="content-item-value">{prRa.title}</span>
                                        </li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="main-filter main-filter-price">
                <div className="filter-title">Màu Sắc</div>
                <div className="filter-content">
                    <ul className="content-list">
                        {
                            colors.map((co, index) => {
                                return <li className={`content-item ${colorActive === index ? '--active' : ''}`} 
                                            key={index}
                                            onClick={()=>{
                                                setColorActive(index)
                                                setColorKey(`color=${co.key}`);
                                                setPage(0);
                                            }}
                                        >
                                            <span className="content-item-icon-active" />
                                            <span className="content-item-value">{co.title}</span>
                                        </li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="main-filter main-filter-recent">
                <div className="filter-title">Hoa Đã Xem</div>
                <div className="filter-content">
                    <ul className="content-recent-list">
                        {   
                            prHistorys.length !== 0 ?
                            //clone new array for prhistory to prevent 'tham chiểu, tham trị' 
                            //when use with reverse from array object
                            [...prHistorys].reverse().slice(0,3).map((prHi, index)=>{
                                const {productImage, productName, productPrice, ratingStar, _id} = prHi;
                                const starRating = [];
                                    for(var i = 0; i < ratingStar; i++){
                                        starRating.push(<i className="fas fa-star" key={i}/>)
                                    }
                                    for(var j = 0; j < 5 - ratingStar; j++){
                                        starRating.push(<i className="far fa-star" key={i+j}/>)
                                    }
                                return  <li className="content-recent-item" key={index}>
                                            <img src={productImage.mainImage.url} alt="" />
                                            <div className="recent-item-right">
                                                <Link 
                                                    to={`/product-detail/${_id}`} 
                                                    className="item-right-name"
                                                    onClick={()=>addHistory(prHi)}
                                                >
                                                    {productName}
                                                </Link>
                                                <div className="item-right-price">
                                                    <span className="discount-price">
                                                        { productPrice.discountPrice === 0 ? 
                                                            convertToCurrency(productPrice.normalPrice) :
                                                            convertToCurrency(productPrice.discountPrice)
                                                        }
                                                    </span>
                                                    {
                                                        productPrice.discountPrice !== 0 ?
                                                        <span className="normal-price">
                                                            {convertToCurrency(productPrice.normalPrice)}
                                                        </span> : ''
                                                    }
                                                </div>
                                                <div className="item-right-star">
                                                    {starRating}
                                                </div>
                                            </div>
                                        </li>
                            }) :
                            <li className="content-recent-item --empty-item">
                                Lịch sử hoa đã xem đang trống
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default SectionMainFilter;