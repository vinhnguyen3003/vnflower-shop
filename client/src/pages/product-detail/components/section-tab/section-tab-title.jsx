import React, {useContext} from 'react';
import {TabActiveContext} from './../../contexts/TabActiveContext';
//import PropTypes from 'prop-types';

SectionTabTitle.propTypes = {};

function SectionTabTitle(props) {
    const tabTitleArray = ['Mô tả', 'Video', 'Đánh giá'];
    const {tabActive, changeTabActive} = useContext(TabActiveContext);
    let tabTitleList = tabTitleArray.map((tabTitle, index)=>{
        return <li 
                className={`tab-title-item ${tabActive === index ? '--active' : ''}`}
                key={index}
                onClick={()=>{changeTabActive(index)}}
               >
                   {tabTitle}
                </li>
    })
    return (
        <ul className="tab-title-list">
            {tabTitleList}
        </ul>
    );
}

export default SectionTabTitle;