import React from 'react';
import { Link } from 'react-router-dom';


function SectionBreadcrumb() {
    return (
        <section className="section-breadcrumb">
            <div className="section-breadcrumb__wrapper">
                <span className="breadcrumb-title">VnFlower</span>
                <ul className="breadcrumb-list">
                    <li className="breadcrumb-item">
                        <Link to="/">Trang Chủ</Link>
                    </li>
                    <li className="breadcrumb-item --no-active">
                        <Link to="/">Hoa Hướng Dương</Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default SectionBreadcrumb;