import React from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

SectionBreadcrumb.propTypes = {};

function SectionBreadcrumb(props) {
    return (
        <section className="section-breadcrumb">
            <div className="section-breadcrumb__wrapper">
                <span className="breadcrumb-title">VnFlower</span>
                <ul className="breadcrumb-list">
                    <li className="breadcrumb-item">
                        <Link to="/" href="#vv">Trang Chủ</Link>
                    </li>
                    <li className="breadcrumb-item --no-active">
                        <Link to="/cart" href="#vv">Giỏ Hàng</Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default SectionBreadcrumb;