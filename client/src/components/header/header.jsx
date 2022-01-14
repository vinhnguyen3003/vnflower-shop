import React from 'react';
import LogoImage from './images/logo-edit.png'
import './stylesheets/header.scss';
import './stylesheets/header-responsive.scss';
import HeaderMenu from './components/header-menu/header-menu';
import HeaderCart from './components/header-cart/header-cart';
import { Link } from 'react-router-dom';

function Header({firstNotiStatus}) {
    return (
        <div className={`header ${firstNotiStatus ? '--mt-style' : ''}`}>
            <div className="header__wrapper">
                <Link to="/" className="header-logo">
                    <img src={LogoImage} alt="" />
                </Link>
                <HeaderMenu />
                <HeaderCart />
            </div>
        </div>
    );
}

export default Header;