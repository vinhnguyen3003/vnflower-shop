import React from 'react';
import { Link } from 'react-router-dom';
import './stylesheets/page404.scss';

function Page404() {
    return (
        <div>
            <title>Không tìm thấy trang</title>
            <div className="page404-wrapper">
                <div className="page404">
                    <div className="page404-bg">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <h1>oops!</h1>
                    <h2>Mã lỗi 404: Không tìm thấy trang</h2>
                    <Link to='/' className="btn btn--darkgreen">Quay lại</Link>
                </div>
            </div>
        </div>
    );
}

export default Page404;