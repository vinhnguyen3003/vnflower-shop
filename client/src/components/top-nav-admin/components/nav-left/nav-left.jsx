import React from 'react';
import LogoImage from './../../images/logo-edit.png';
//import PropTypes from 'prop-types';

NavLeft.propTypes = {};

function NavLeft(props) {
    const expandSidebar = () =>{
        document.getElementsByClassName("wrapper")[0].classList.toggle("expand");
        document.getElementsByClassName("sidebar")[0].classList.toggle("expand");
    }
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <span className="nav-link">
                    <i className="fas fa-bars" onClick={expandSidebar} />
                </span>
            </li>
            <li className="nav-item">
                <img
                    src={LogoImage}
                    alt=""
                    className="logo logo-light"
                />
            </li>
        </ul>
    );
}

export default NavLeft;