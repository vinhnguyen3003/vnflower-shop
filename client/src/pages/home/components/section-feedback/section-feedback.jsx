import React from 'react';
import WomanIconImage from './../../images/woman.png';
import ManIconImage from './../../images/man.png';

import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation, Pagination, Scrollbar]);


function SectionFeedback() {
    return (
        <section className="section-feedback">
            <div className="section-feedback__wrapper">
                <div className="section-feedback-heading">
                    <div className="heading-title">
                        <span>P</span>hản
                        <span> H</span>ồi
                        <span> C</span>ủa
                        <span> K</span>hách
                        <span> H</span>àng
                    </div>
                </div>
                <div className="section-feedback-content">
                    <Swiper
                        pagination={{
                            clickable: true
                        }}
                        navigation
                        grabCursor={true}
                    >
                        <SwiperSlide>
                            <div className="swiper-slide">
                                <div className="section-feedback-item">
                                    <div className="feedback-img">
                                        <img src={WomanIconImage} alt="" />
                                    </div>
                                    <div className="feedback-content">
                                        Chất lượng hoa của cửa hàng rất tốt, luôn tươi và đẹp trong
                                        khoảng thời gian dài, đồng thời được đóng gói cẩn thận và tỉ mỉ.
                                        Rất hài lòng.
                                    </div>
                                    <div className="feedback-footer">
                                        <span>Nguyễn Hoàng Khánh Ngân</span>
                                        <span>Khách Hàng Tiềm Năng</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide">
                                <div className="section-feedback-item">
                                    <div className="feedback-img">
                                        <img src={ManIconImage} alt="" />
                                    </div>
                                    <div className="feedback-content">
                                        Đã từng mua hoa rất nhiều nơi, mình cảm thấy hoa của Shop rất
                                        đẹp, phục vụ tận tình, mặc dù giá khá cao nhưng vẫn đáng với số
                                        tiền bỏ ra.
                                    </div>
                                    <div className="feedback-footer">
                                        <span>Phan Thành Nhân</span>
                                        <span>Khách Hàng Thân Thiết</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide">
                                <div className="section-feedback-item">
                                    <div className="feedback-img">
                                        <img src={WomanIconImage} alt="" />
                                    </div>
                                    <div className="feedback-content">
                                        Hoa tươi, giá khá ổn, nhân viên phục vụ nhiệt tình, sẽ ủng hộ
                                        Shop trong thời gian tới.
                                    </div>
                                    <div className="feedback-footer">
                                        <span>Trần Thị Ngọc Ánh</span>
                                        <span>Khách Hàng Tiềm Năng</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default SectionFeedback;