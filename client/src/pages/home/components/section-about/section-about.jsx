import React from 'react';
import AboutBgImage from './../../images/bg-img05-edit.jpg';


function SectionAbout() {
    return (
        <section className="section-about">
            <div className="section-about__left">
                <img src={AboutBgImage} alt="" />
            </div>
            <div className="section-about__right">
                <div className="about-right-wrapper">
                    <div className="about-right-title">
                        <div className="about-right-title--row">
                            <span>H</span>oa
                            <span> V</span>ới
                            <span> T</span>ình
                            <span> Y</span>êu
                        </div>
                        <span className="about-right-title--line">&amp;</span>
                        <div className="about-right-title--row">
                            <span> C</span>uộc
                            <span> S</span>ống
                        </div>
                    </div>
                    <div className="about-right-content">
                        Cuộc sống có khó khăn và vất vả như thế nào cũng đừng bỏ cuộc, luôn luôn
                        nổ lực và cố gắng, lúc nào cũng phải xinh đẹp và tươi tắn như những đoá
                        hoa!!
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionAbout;