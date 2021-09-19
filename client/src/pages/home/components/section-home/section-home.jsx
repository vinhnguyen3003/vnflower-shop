import React from 'react';
//import PropTypes from 'prop-types';

SectionHome.propTypes = {
    
};

function SectionHome(props) {
    return (
        <section className="section-home">
            <div className="section-home__left play-on-scroll left-to-right">
                <div className="section-home-title">Xu Hướng Hoa Năm Nay</div>
                <div className="section-home-content">
                    Mỗi loại hoa đều mang một ý nghĩa sâu sắc khác nhau, hãy cùng tìm hiểu xem
                    xu hướng chọn hoa của mọi người để có được những bông hoa đẹp nhất dành
                    tặng người mình thương, đó không chỉ là món quà mà còn là cả tấm lòng, sự
                    yêu thương, sự quan tâm của bạn dành cho họ.
                </div>
                <div className="section-home-footer">
                    <a href="#vv" className="btn btn--green section-home-btn">
                        Xem chi tiết
                    </a>
                </div>
            </div>
        </section>
    );
}

export default SectionHome;