import React, { useState } from 'react';
//import PropTypes from 'prop-types';

SectionMainLeft.propTypes = {
    
};

function SectionMainLeft(props) {
    const {galleryImage} = props.productImage;
    const [gallImageActive, setGallImageActive] = useState(0);
    return (
        <div className="section-main-left">
            <div className="main-left-gallery">
                {
                    galleryImage.map((gaImg, index) => {
                        return <div 
                                    className={`gallery-image ${gallImageActive === index ? '--active' : ''}`} 
                                    key={index}
                                >
                                    <img src={gaImg.url} alt="" />
                                </div>
                    })
                }
            </div>
            <div className="main-left-pagination">
                {
                    galleryImage.lenght > 4 ?
                        <span className="pagination-left-icon">
                            <i className="fas fa-chevron-left" />
                        </span> : ''
                }
                <div className="pagination-list">
                    {
                        galleryImage.map((gaImg, index)=>{
                            return <div 
                                        className="pagination-item" 
                                        key={index}
                                        onClick={()=>setGallImageActive(index)}
                                    >
                                        <img src={gaImg.url} alt="" />
                                    </div>
                        })
                    }
                </div>
                {
                    galleryImage.lenght > 4 ?
                        <span className="pagination-right-icon">
                            <i className="fas fa-chevron-right" />
                        </span> : ''
                }
            </div>
        </div>
    );
}

export default SectionMainLeft;