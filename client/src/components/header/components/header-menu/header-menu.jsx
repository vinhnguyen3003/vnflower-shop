import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function HeaderMenu() {
    const [searchKey, setSearchKey] = useState("");
    const [searchMenuRes, setSearchMenuRes] = useState(false);

    const history = useHistory();
    const handleChangeInput = (e) => {
        const {value} = e.target;
        setSearchKey(value);
    }
    const handleEnterAction = (e) => {
        if(e.key === 'Enter' && searchKey !== ''){
            history.push(`/product-list?searchKey=${searchKey}`);
            setSearchKey('');
        } 
    }
    const handleClickAction = () => {
        if(searchKey !== ''){
            history.push(`/product-list?searchKey=${searchKey}`);
            setSearchKey('');
        }
    }
    return (
        <div className="header-menu">
            <ul className="header-menu__list">
                <li className="header-menu-item">
                    <Link to="/product-list" className="header-menu-item__link">Sản Phẩm</Link>
                </li>
                <li className="header-menu-item">
                    <a href="#vv" className="header-menu-item__link">Chủ Đề</a>
                </li>
                <li className="header-menu-item">
                    <a href="#vv" className="header-menu-item__link">Liên Hệ</a>
                </li>
                <li className="header-menu-item show-on-tablet-mobile --btn-responsive">
                    <span 
                        className="header-menu-item__link"
                        onClick={()=>setSearchMenuRes(!searchMenuRes)}
                    >{searchMenuRes ? 'Đóng' : 'Tìm kiếm'}</span>
                </li>
                <li className={`header-menu-item --search-responsive ${searchMenuRes ? '--show' : ''}`}>
                    <div className="search-tool">
                        <input 
                            type="text" name="searchKey" 
                            placeholder="Nhập loại hoa cần tìm?" 
                            value={searchKey}
                            onChange={handleChangeInput}
                            onKeyDown={handleEnterAction}
                        />
                        <span
                            className="search-tool__icon"
                            onClick={handleClickAction}
                        >
                            <i className="fas fa-search" />
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default HeaderMenu;