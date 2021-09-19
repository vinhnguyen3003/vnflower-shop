import React from 'react';
import OnlineOrImage from './../../images/online-order.png';
import DeliveryImage from './../../images/delivery.png';
import FreshImage from './../../images/fresh.png';
import Artist from './../../images/artist.png';
//import PropTypes from 'prop-types';

SectionFooter.propTypes = {
    
};

function SectionFooter(props) {
    return (
        <section className="section-footer">
            <div className="section-footer__wrapper">
                <div className="section-footer-service">
                    <div className="service-item play-on-scroll zoom">
                        <img src={OnlineOrImage} alt="" />
                        <div className="service-item__content">
                            <span>Đặt hàng Online</span>
                            <a href="#vv">Chi tiết</a>
                        </div>
                    </div>
                    <div className="service-item play-on-scroll zoom delay-2">
                        <img src={DeliveryImage} alt="" />
                        <div className="service-item__content">
                            <span>Giao hàng nhanh</span>
                            <a href="#vv">Chi tiết</a>
                        </div>
                    </div>
                    <div className="service-item play-on-scroll zoom delay-4">
                        <img src={FreshImage} alt="" />
                        <div className="service-item__content">
                            <span>Đảm bảo chất lượng</span>
                            <a href="#vv">Chi tiết</a>
                        </div>
                    </div>
                    <div className="service-item play-on-scroll zoom delay-6">
                        <img src={Artist} alt="" />
                        <div className="service-item__content">
                            <span>Chuyên môn kĩ thuật</span>
                            <a href="#vv">Chi tiết</a>
                        </div>
                    </div>
                </div>
                <div className="section-footer-adv play-on-scroll bottom-up">
                    <div className="adv-wrapper">
                        <span className="adv-title">Chọn Hoa Gì?</span>
                        <span className="adv-content">
                            Nếu bạn đang phân vân phải chọn hoa gì cho lễ cưới, lễ kỉ niệm, hoặc
                            đơn giản là dành tặng người mình thương, thì hãy để chúng tôi giúp đỡ
                            bạn!
                        </span>
                        <a href="#vv" className="adv-link">
                        Tìm hiểu ngay
                            <i className="fas fa-caret-right" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionFooter;