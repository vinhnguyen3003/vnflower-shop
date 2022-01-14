import React, { useEffect, useState } from 'react';
import './stylesheets/home.scss';
import './stylesheets/home-responsive.scss';
import Header from './../../components/header/header';
import Footer from './../../components/footer/footer';
import SectionHome from './components/section-home/section-home';
import SectionAbout from './components/section-about/section-about';
import SectionProduct from './components/section-product/section-product';
import SectionSale from './components/section-sale/section-sale';
import SectionFeedback from './components/section-feedback/section-feedback';
import SectionFooter from './components/section-footer/section-footer';
import Message from './../../components/message/message';
import ScrollTopReset from '../../utils/scrollTop-reset';

function Home() {
    const [firstNotification, setFirstNotification] = useState(false);
    useEffect(()=>{
        ScrollTopReset();
    },[])

    useEffect(()=>{
        const firstNotiStorage = sessionStorage.getItem('FIRST_NOTI');
        if(firstNotiStorage === 'true' || firstNotiStorage === null) {
            setFirstNotification(true);
            sessionStorage.setItem('FIRST_NOTI', 'false');

            setTimeout(()=>{
                setFirstNotification(false);
            },45000)
        }
        else if(firstNotiStorage === 'false'){
            setFirstNotification(false);
        }
    },[])
    return (
        <div className="app">
            <title>VnFlower | Trang chủ</title>
            <div className="first-notification">
                <div className="first-notification__content">
                    Nếu dữ liệu website chưa hiển thị, vui lòng chờ trong giây lát để server khởi động và lấy dữ liệu, xin lỗi vì sự bất tiện này, cảm ơn bạn đã ghé thăm
                </div>
            </div>
            <Header 
                firstNotification={firstNotification}
            />
            <SectionHome />
            <SectionAbout />
            <SectionProduct />
            <SectionSale />
            <SectionFeedback />
            <SectionFooter />
            <Footer />
            <Message />
        </div>
    );
}

export default Home;