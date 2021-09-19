import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../../../components/spinner/spinner';
import { ProductContext } from '../../../../contexts/productContext';
import { ReviewContext } from '../../../../contexts/reviewContext';
import { getDD_MM_YYYY } from '../../../../utils/time-method';
import {TabActiveContext} from './../../contexts/TabActiveContext';
import SpinnerImage from './../../images/hrx_loading.gif';

const inititalReview = {
    reviewName: "",
    reviewPhone: "",
    reviewContent: ""
}
function SectionTabContent() {
    const params = useParams();
    const {productState: {productDetail}} = useContext(ProductContext);
    if(productDetail !== null){ var {productInfo} = productDetail};

    const {reviewState: {reviews}, getReviews, addReview} = useContext(ReviewContext);

    const {tabActive} = useContext(TabActiveContext);
    const [starQuantity, setStarQuantity] = useState(1);

    const [review, setReview] = useState(inititalReview);
    const [imageActive, setImageActive] = useState({public_id: "", url: ""})

    const [formMessage, setFormMessage] = useState('');

    let starResult = [];
    const emotionText = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Rất tốt'];
    for(let i = 1; i <= 5; i++){
        starResult.push(
            <li 
                className="form-rating-star-item" 
                key={i}
                onClick={()=>setStarQuantity(i)}
            >
                <i className={`${i <= starQuantity ? 'fas fa-star' : 'far fa-star'}`} />
                <p>{emotionText[i-1]}</p>
            </li>
        )
    }
    const handleChangeInp = (e) => {
        if(formMessage !== '') setFormMessage('');
        const {value, name} = e.target;
        setReview({...review, [name]: value});
    }
    const handleUpload = async (e) => {
        const fileName = e.target.files[0];
        let formData = new FormData();
        formData.append('file', fileName);

        //Kiểm tra các trường hợp nhập vào để tránh bị lỗi.
        if(!fileName) return alert("Bạn chưa chọn file để upload")

        if(fileName.size > 1024 * 1024) // 1mb
            return alert("Kích thước file quá lớn")

        if(fileName.type !== 'image/jpeg' && fileName.type !== 'image/png') // 1mb
            return alert("Định dạng file không hợp lệ (jpeg, png)")
        
        const loadingEl = e.target.parentNode.getElementsByClassName("form-file-loading")[0];
        loadingEl.classList.add('--show');
        const removeEl = e.target.parentNode.getElementsByClassName("form-file-remove")[0];
        removeEl.classList.remove('--show');

        const res = await axios.post('/api/upload', formData, {
            headers: {'content-type': 'multipart/form-data'}
        })
        if(res.data.public_id) {
            if(imageActive.public_id !== ""){
                await axios.post('/api/destroy', {public_id: imageActive.public_id});
            }
            loadingEl.classList.remove('--show');
            removeEl.classList.add('--show');
            setImageActive({public_id: res.data.public_id, url: res.data.url});
            //Reset input to prevent onchange do not accept same files 
            e.target.value = "";
        }
    }
    const resetStateWhenSubmit = () => {
        setReview(inititalReview);
        setImageActive({public_id: "", url: ""});
        setStarQuantity(1);
    }
    const handleDestroyUpload = async (e, imageID) => {
        try {
            if(imageID === "") return;
            await axios.post('/api/destroy', {public_id: imageID});
            setImageActive({public_id: "", url: ""});
            e.target.parentNode.classList.remove('--show');
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewContent = {...review, reviewImage: imageActive.url, 
            reviewStar: starQuantity, productID: productDetail._id}
        //console.log(reviewContent)
        const res = await addReview(reviewContent);
        if(!res.data.success){
            setFormMessage(res.data.message);
        }else{
            resetStateWhenSubmit();
        }
    }
    useEffect(() => {getReviews(params.id)},[params])
    return (
        <div className="tab-content-list">
            <div className={`tab-content-item tab-content-item--description ${tabActive === 0 ? '--active' : ''}`}>
                {
                    productInfo !== undefined ? 
                    (productInfo.description !== '' ? productInfo.description : 'Nội dung đang được cập nhật')  : 
                    'Đang cập nhật'
                }
            </div>
            <div className={`tab-content-item tab-content-item--video ${tabActive === 1 ? '--active' : ''}`}>
                <iframe
                src="https://www.youtube.com/embed/mCS_cEq77h4"
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                />
            </div>
            <div className={`tab-content-item tab-content-item--review ${tabActive === 2 ? '--active' : ''}`}>
                {
                    productDetail !== null ?
                        <>
                            <div className="tab-review-title">
                                Có <span>{reviews.length}</span> đánh giá cho <span>{productDetail.productName}</span>
                            </div> 
                            <ul className="tab-review-list">
                                {
                                    reviews.map((re, index)=>{
                                        const reviewStarResult = [];
                                        for(var i = 0; i < re.reviewStar; i++){
                                            reviewStarResult.push(<i className="fas fa-star" key={i}/>)
                                        }
                                        for(var j = 0; j < 5 - re.reviewStar; j++){
                                            reviewStarResult.push(<i className="far fa-star" key={i+j}/>)
                                        }
                                        return <li className="tab-review-item" key={index}>
                                                    <div className="review-item-header">
                                                        <div className="item-header-left">
                                                            <span className="item-header-left__name">
                                                                {re.reviewName}
                                                            </span>
                                                            <div className="item-header-left__star">
                                                                {reviewStarResult}
                                                            </div>
                                                        </div>
                                                        <div className="item-header-right">{getDD_MM_YYYY(re.createAt)}</div>
                                                    </div>
                                                    <div className="review-item-body">
                                                        <div className="item-body-text">
                                                            {re.reviewContent}
                                                        </div>
                                                        {
                                                            re.reviewImage !== '' ?
                                                                <div className="item-body-image">
                                                                    <img src={re.reviewImage} alt="" />
                                                                </div> : null
                                                        }
                                                    </div>
                                                </li>
                                    })
                                }
                                {
                                    reviews.length > 5 ?
                                        <div className="tab-review-more-btn">
                                            Xem thêm
                                            <i className="fas fa-caret-down" />
                                        </div> : null
                                }
                            </ul>
                            <div className="tab-review-action">
                                <div className="review-action-title">Gửi đánh giá của bạn</div>
                                <form className="review-action-form" onSubmit={handleSubmit}>
                                    <div className="review-form-top">
                                        <textarea
                                            placeholder="Mời bạn chia sẻ một số cảm nhận ..."
                                            style={{ minHeight: 100, maxHeight: 200, minWidth: '100%', maxWidth: '100%' }}
                                            className="form-textarea"
                                            name="reviewContent"
                                            required
                                            onChange={handleChangeInp}
                                            value={review.reviewContent}
                                        />
                                        <label>Mời bạn chọn ảnh minh họa:</label>
                                        <div className={`form-file ${imageActive.url !== "" ? "--show" : "" }`}>
                                            <input type="file" className="input-custom-file" onChange={handleUpload}/>
                                            <div className="form-file-display">
                                                {imageActive.url !== "" ? <img src={imageActive.url} alt="" /> : null} 
                                            </div>
                                            <div className="form-file-loading">
                                                <img src={SpinnerImage} alt="" />
                                            </div>
                                            <span className="form-file-remove" onClick={(e)=>handleDestroyUpload(e, imageActive.public_id)}>
                                                <i className="fas fa-window-close"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="review-form-center">
                                        <div className="form-rating-star-title">
                                            Bạn cảm thấy hoa này như thế nào? (Chọn sao nhé):
                                        </div>
                                        <ul className="form-rating-star-list">
                                            {starResult}
                                        </ul>
                                    </div>
                                    <div className="review-form-bottom">
                                        <div className="form-input-info">
                                            <input type="text" placeholder="Họ và tên (bắt buộc)" required
                                            name="reviewName" value={review.reviewName} onChange={handleChangeInp}/>
                                            <input type="number" placeholder="Số điện thoại (bắt buộc)" required
                                            name="reviewPhone" value={review.reviewPhone} onChange={handleChangeInp}/>
                                        </div>
                                        <div className="form-input-message">
                                            {formMessage}
                                        </div>
                                        <div className="form-input-button">
                                            <button className="btn btn--green btn-sub" type="submit">
                                                Gửi đánh giá ngay
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </> : 
                        <div className="tab-review--load">
                            <Spinner/>
                        </div>
                }
            </div>
        </div>
    );
}

export default SectionTabContent;