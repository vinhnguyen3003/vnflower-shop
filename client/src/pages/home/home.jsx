import React, { useEffect } from 'react';
import './stylesheets/home.scss';
import './stylesheets/home-responsive.scss';
import SectionHome from './components/section-home/section-home';
import SectionAbout from './components/section-about/section-about';
import SectionProduct from './components/section-product/section-product';
import SectionSale from './components/section-sale/section-sale';
import SectionFeedback from './components/section-feedback/section-feedback';
import SectionFooter from './components/section-footer/section-footer';
import ScrollTopReset from '../../utils/scrollTop-reset';

function Home() {
    useEffect(()=>{
        ScrollTopReset();
    },[])

    return (
        <>
            <title>VnFlower | Trang chủ</title>
            <SectionHome />
            <SectionAbout />
            <SectionProduct />
            <SectionSale />
            <SectionFeedback />
            <SectionFooter />
        </>
    );
}

export default Home;