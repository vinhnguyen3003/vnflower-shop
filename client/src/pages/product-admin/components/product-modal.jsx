import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Loading from './../../../components/loading/loading';
import {ProductAdminContext} from './../contexts/productAdminContext';
import { ProductContext } from '../../../contexts/productContext';
import { CateContext } from '../../../contexts/categoryContext';

ProductModal.propTypes = {};

const initialProduct = {
    productID: "",
    productName:"",
    productInfo: {
        title: "",
        description: "",
        video: ""
    },
    productPrice: {
        normalPrice: 0,
        discountPrice: 0
    },
    category: "",
    // productImage: {
    //     mainImage: {},
    //     galleryImage: [
    //         {
    //             public_id: "FlowerWebsite/sqzcebbhlns6a4mxg3hx",
    //             url: "https://res.cloudinary.com/dmcosnuap/image/upload/v1627783142/FlowerWebsite/sqzcebbhlns6a4mxg3hx.jpg"
    //         },
    //         {
    //             public_id: "FlowerWebsite/hycbr4np47f9zsdlgiac",
    //             url: "https://res.cloudinary.com/dmcosnuap/image/upload/v1627783148/FlowerWebsite/hycbr4np47f9zsdlgiac.jpg"
    //         },
    //         {
    //             public_id: "FlowerWebsite/xifo3bcevmgkhzgbugia", 
    //             url: "https://res.cloudinary.com/dmcosnuap/image/upload/v1627783153/FlowerWebsite/xifo3bcevmgkhzgbugia.jpg"
    //         }
    //     ]
    // }
}
const initialProductOption = {
    color: [
        {
            title: "Màu đỏ",
            stock: 0
        },
        {
            title: "Màu vàng",
            stock: 0
        },
        {
            title: "Màu hồng",
            stock: 0
        },
        {
            title: "Màu trắng",
            stock: 0
        }
    ],
    size: [
        {
            title: "Nhỏ",
            extra: 0
        },
        {
            title: "Bình thường",
            extra: 0
        },
        {
            title: "Lớn",
            extra: 0
        },
        {
            title: "Đặc biệt",
            extra: 0
        }
    ]
}
const initialCateOpActive = {_id: "", categoryName: "Chọn danh mục sản phẩm"}

function ProductModal() {

    const { addProduct, updateProduct} = useContext(ProductContext);
    const { cateState: {categories}, getCategories } = useContext(CateContext);
    const {prModalStatus, setPrModalStatus, editStatus, setEditStatus, prFindID, setPrFindID} = useContext(ProductAdminContext);

    const [cateOpActive, setCateOpActive] = useState(initialCateOpActive);
    const [cateOpModalActive, setCateOpModalActive] = useState(true);
    const cate_display_el = useRef();
    const cate_modal_el = useRef();
    
    //console.log(editStatus)
    //console.log(prFindID)
    const [product, setProduct] = useState(initialProduct);
    const [productOption, setProductOption] = useState(initialProductOption);
    const [mainImage, setMainImage] = useState({public_id: "", url: ""});
    const [galleryImage, setGalleryImage] = useState([]);
    const [createBtnStatus, setCreateBtnStatus] = useState(true);
    //Case update
    //console.log(cateOpModalActive)
    

    const closePrModalForm = () =>{
        //document.getElementsByClassName("product-modal")[0].classList.remove("--show");
        setPrModalStatus(false);
        setEditStatus(false);
        setPrFindID({});
        setProduct(initialProduct);
        setProductOption(initialProductOption);
        setMainImage({});
        setGalleryImage([]);
        setCateOpActive(initialCateOpActive);
    }
    
    const toggleCateOpModal = (cate_display_el, cate_modal_el) => {
        document.addEventListener('mousedown', (e) => {
            if(cate_display_el.current && cate_display_el.current.contains(e.target)){
                //cate_modal_el.current.classList.toggle("--show");//Cần lệnh này vì state cateOpModal không thể update lại giá trị khi thay đổi lập tức
                setCateOpModalActive(true);
                //console.log("vv")
            }else{
                if(cate_modal_el.current && !cate_modal_el.current.contains(e.target)){
                    //cate_modal_el.current.classList.remove("--show");
                    setCateOpModalActive(false);
                    //console.log("vvt")
                }
            }
        })
    }
    const handleChangePrInput = (e) =>{
        const {name, value} = e.target;

        let productStorage = {productID: product.productID, productName: product.productName, title: product.productInfo.title,
        description: product.productInfo.description, video: product.productInfo.video, normalPrice: product.productPrice.normalPrice,
        discountPrice: product.productPrice.discountPrice, category: product.category};

        productStorage = {...productStorage, [name]: value};

        setProduct({...product,
            productID: productStorage.productID,
            productName: productStorage.productName,
            productInfo: {
                title: productStorage.title,
                description: productStorage.description,
                video: ""
            },
            productPrice: {
                normalPrice: productStorage.normalPrice,
                discountPrice: productStorage.discountPrice
            }
        });
    }
    const handleChangePrOpInput = (e) =>{
        const {name, value} = e.target;
        let productOpStorage = { redColor: productOption.color[0].stock,  yellowColor: productOption.color[1].stock,
            pinkColor: productOption.color[2].stock, whiteColor: productOption.color[3].stock, smallSize: productOption.size[0].extra,
            mediumSize: productOption.size[1].extra, largeSize: productOption.size[2].extra, specialSize: productOption.size[3].extra
        };
        productOpStorage = {...productOpStorage, [name]: value};
        setProductOption({...productOption,
            color: [
                {
                    title: "Màu đỏ",
                    stock: productOpStorage.redColor
                },
                {
                    title: "Màu vàng",
                    stock: productOpStorage.yellowColor
                },
                {
                    title: "Màu hồng",
                    stock: productOpStorage.pinkColor
                },
                {
                    title: "Màu trắng",
                    stock: productOpStorage.whiteColor
                }
            ],
            size: [
                {
                    title: "Nhỏ",
                    extra: productOpStorage.smallSize
                },
                {
                    title: "Bình thường",
                    extra: productOpStorage.mediumSize
                },
                {
                    title: "Lớn",
                    extra: productOpStorage.largeSize
                },
                {
                    title: "Đặc biệt",
                    extra: productOpStorage.specialSize
                }
            ]
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        let newGalleryImage = [];
        galleryImage.forEach(gaImg => {
            if(gaImg.public_id !== ""){
                newGalleryImage.push({
                    public_id: gaImg.public_id,
                    url: gaImg.url
                })
            }
        })
        //console.log({...product, category: cateOpActive._id, productImage: {mainImage, galleryImage: newGalleryImage}, productOption});
        if(editStatus){
            await updateProduct(prFindID._id, {...product, category: cateOpActive._id, 
                productImage: {mainImage, galleryImage: newGalleryImage}, productOption})
                closePrModalForm();
        }else{
            const res = await addProduct({...product, category: cateOpActive._id, 
                productImage: {mainImage, galleryImage: newGalleryImage}, productOption})
            if(res.success) closePrModalForm()
            else {
                let messageModalEl = document.getElementsByClassName('modal-message')[0];
                messageModalEl.textContent = res.message;
                setTimeout(()=>{
                    messageModalEl.textContent = '';
                }, 2000)
            }
        }
    }   
    const createLoading = (parentNode) =>{
        //Tùy biến kích cỡ cho loading animation
        const parentNodeClassName = parentNode.getAttribute("class");
        const loadingNode = Loading(`${parentNodeClassName === "gallery-image-group --hide" || 
                                    parentNodeClassName.trim() === "gallery-image-group" ? "--small" : ""}`);

        var blankNode = document.createElement("div");
        blankNode.classList.add("loading-wrapper-node");
        parentNode.appendChild(blankNode);
        //Đối với node tạo bởi function cần bọc vào blanknode trước khi render
        ReactDOM.render(loadingNode, blankNode)
    }
    const destroyLoading = (parentNode) => {
        parentNode.getElementsByClassName("loading-wrapper-node")[0].remove();
    }
    const handleUpload = async (e, index) =>{
        //setTT('errr'); console.log(tt)
        e.preventDefault();
        
        try {
            const fileName = e.target.files[0];
            let formData = new FormData();
            formData.append('file', fileName);

            //Kiểm tra các trường hợp nhập vào để tránh bị lỗi.
            if(!fileName) return alert("Bạn chưa chọn file để upload")

            if(fileName.size > 1024 * 1024) // 1mb
                return alert("Kích thước file quá lớn")

            if(fileName.type !== 'image/jpeg' && fileName.type !== 'image/png') // 1mb
                return alert("Định dạng file không hợp lệ (jpeg, png)")

            //console.log(e.target.getAttribute("class"))
            let parentNode = e.target.parentNode; //Lấy chính xác phần tử mà click vào
            let parentNodeClassName = parentNode.getAttribute("class");

            var wrapNode = parentNode.getElementsByClassName("box-image-display")[0];
            var deleteNode = parentNode.getElementsByClassName("btn-remove-img")[0];
            
            let currentImgNode = wrapNode.querySelector("img");
            if(currentImgNode) {
                currentImgNode.style.display = 'none';
                deleteNode.classList.add("--hide");
            }
            else{
                wrapNode.classList.add("--hide")
            }

            createLoading(parentNode);

            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data'}
            })

            //Trường hợp phần tử được chọn là ảnh mô tả
            if(parentNodeClassName.trim() === 'gallery-image-group' || parentNodeClassName === 'gallery-image-group --hide'){
                if(galleryImage[index].public_id === ""){
                    //Trường hợp thêm item
                    console.log("vv")
                    wrapNode.classList.remove("--hide");
                    //createGallImgGr();
                    setCreateBtnStatus(true);
                }
                else{
                    //Trường hợp cập nhật item
                    console.log("tt")
                    destroyUpload(galleryImage[index].public_id);
                    currentImgNode.style.display = 'unset';
                    currentImgNode.removeAttribute("style");
                    deleteNode.classList.remove("--hide");
                }
                galleryImage[index] = {public_id: res.data.public_id, url: res.data.url};
                setGalleryImage([...galleryImage]);
            }
            //Trường hợp ảnh được chọn là ảnh đại diện
            if(parentNodeClassName.trim() === 'main-image-group' || parentNodeClassName === 'main-image-group --hide'){
                if(mainImage.public_id) {
                    destroyUpload(mainImage.public_id);
                    currentImgNode.style.display = 'unset';
                    currentImgNode.removeAttribute("style");
                    deleteNode.classList.remove("--hide");
                }else{
                    wrapNode.classList.remove("--hide");
                }
                setMainImage({public_id: res.data.public_id, url: res.data.url});
                //Reset input to prevent onchange do not accept same files 
                e.target.value = "";
            }
            destroyLoading(parentNode);

        } catch (error) {
            console.log(error)
        }
    }
    const handleDestroy = (e, index) =>{
        let parentNode = e.target.parentNode.parentNode;
        let parentNodeClassName = parentNode.getAttribute('class');
        let imgNode =  parentNode.querySelector("img");

        if((parentNodeClassName.trim() === 'main-image-group' || parentNodeClassName === 'main-image-group --hide') && imgNode){
            destroyUpload(mainImage.public_id);
            setMainImage({public_id: "", url: ""});
        }
        if((parentNodeClassName.trim() === 'gallery-image-group' || parentNodeClassName === 'gallery-image-group --hide') && imgNode){
            destroyUpload(galleryImage[index].public_id);
            galleryImage.splice(index, 1);
            if(galleryImage.length === 0){
                setCreateBtnStatus(true);
                createGallImgGr();
            }
            setGalleryImage([...galleryImage]);
        }
    }
    const destroyUpload = async (imageID) => {
        try {
            await axios.post('/api/destroy', {public_id: imageID})
        } catch (error) {
            console.log(error)
        }
    }

    const createGallImgGr = () => {
        // console.log("err")
        // console.log(createBtnStatus);
        if(createBtnStatus) {galleryImage.push({public_id:'', url: ''})};
        //setCreateBtnStatus(false);
        //console.log(galleryImage)
        setGalleryImage([...galleryImage]);
    }

    function vv(params) {
        const productImage = {mainImage: mainImage, galleryImage}
        console.log(productImage);
    }
    //console.log(cateOpModalActive)
    useEffect(()=>{getCategories()},[])
    useEffect(()=>{
        if(editStatus && prFindID.productID !== undefined) {
            setProduct(prFindID);
            setProductOption(prFindID.productOption);
            setMainImage(prFindID.productImage.mainImage);
            setGalleryImage(prFindID.productImage.galleryImage);
            setCateOpActive({_id: prFindID.category._id, categoryName: prFindID.category.categoryName})
        }else{
            createGallImgGr();
        }
        toggleCateOpModal(cate_display_el, cate_modal_el);
        return () =>{
            //Xóa tự động tất cả file ảnh trong hàng đợi nếu người dùng không xóa thủ công mà refresh web
            //handleDestroyAll();
        }
    },[editStatus, prFindID])
    return (
        <div className={`product-modal ${prModalStatus ? '--show' : ''}`}>
            <div className="product-modal__wrapper">
                <div className="product-modal-form">
                    <div className="modal-form-title">
                        <span>{editStatus ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</span>
                        <span onClick={closePrModalForm}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="modal-form-content">
                        <div className="form-content-left">
                            <div className="left-main-image">
                                <div className="left-main-image__wrapper">
                                    <div className={`main-image-group ${mainImage.public_id ? "--hide" : ""}`}>
                                        <input type="file" 
                                            onChange={(e)=>handleUpload(e)} 
                                            className="custom-input-file"
                                        />
                                        <div className={`left-main-image__display box-image-display`}>
                                            {
                                                mainImage.url !== "" && mainImage.url !== undefined ? <img src={mainImage.url} alt=""/> : ""
                                            }
                                        </div>
                                        <span className="btn-remove-img" onClick={handleDestroy}>
                                            <i className="fas fa-window-close"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="main-image-title" onClick={vv}>
                                    Ảnh đại diện
                                </div>
                            </div>
                            <div className="left-gallery-image">
                                <div className="left-gallery-image__wrapper">
                                    {   galleryImage ?
                                        galleryImage.map((gaIm, index)=>{
                                            return <div key={index}>
                                                        <div className={`gallery-image-group ${gaIm.public_id !== "" ? '--hide' : ''}`} data-index={gaIm.id}>
                                                            <input type="file" className="custom-input-file" onChange={(e)=>handleUpload(e,index)}/>
                                                            <div className="left-gallery-image__display box-image-display">
                                                                {gaIm.public_id !== "" ? <img src={gaIm.url} alt=""/> : ''}
                                                            </div>
                                                            <span className="btn-remove-img --small" onClick={(e)=>handleDestroy(e, index)}>
                                                                <i className="fas fa-window-close"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                        }):""
                                    }
                                </div>
                                <div 
                                    className={`gallery-image-create ${!createBtnStatus ? '--non-active' : ''}`}
                                    onClick={createGallImgGr}
                                >
                                    <span>Thêm</span>
                                </div>
                                <div className="gallery-image-title">
                                    Ảnh mô tả
                                </div>
                            </div>
                        </div>
                        <form className="form-content-right modal-form" onSubmit={handleSubmit}>
                            <div className="modal-form-group">
                                <label htmlFor="productID">Mã sản phẩm</label>
                                <input type="text" name="productID" value={product.productID} 
                                id="productID" onChange={handleChangePrInput}/>
                                <span className="form-message"></span>
                            </div>
                            <div className="modal-form-group">
                                <label>Loại danh mục </label>
                                <div className="select-group">
                                    <div className="select-group__display" ref={cate_display_el}>
                                        <span>{cateOpActive.categoryName}</span>
                                        <span><i className="fas fa-angle-down"></i></span>
                                    </div>
                                    <ul className={`select-group__modal ${cateOpModalActive ? '--show' : ''}`} ref={cate_modal_el}>
                                        {
                                            categories.map((category, index)=>(//có thể thay thế phần return bằng cách cho vào dấu ()
                                                <li 
                                                    className="select-item"
                                                    key={index}
                                                    onClick={()=>{
                                                        setCateOpActive({_id: category._id, categoryName: category.categoryName});
                                                        setCateOpModalActive(false);
                                                        }
                                                    }
                                                >
                                                    {category.categoryName}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-form-group">
                                <label htmlFor="productName">Tên sản phẩm</label>
                                <input type="text" name="productName" id="productName"
                                value={product.productName} onChange={handleChangePrInput}/>
                                <span className="form-message"></span>
                            </div>
                            <div className="modal-form-group">
                                <label htmlFor="title">Tiêu đề</label>
                                <textarea type="text" name="title" id="title"
                                value={product.productInfo.title} onChange={handleChangePrInput}/>
                                <span className="form-message"></span>
                            </div>
                            <div className="modal-form-group">
                                <label htmlFor="normalPrice">Giá bán đề xuất</label>
                                <input type="number" step="1000" min="0" name="normalPrice" id="normalPrice"
                                value={product.productPrice.normalPrice} onChange={handleChangePrInput}/>
                                <span className="form-message"></span>
                            </div>
                            <div className="modal-form-group">
                                <label htmlFor="discountPrice">Giá bán khuyến mãi</label>
                                <input type="number" step="1000" min="0" name="discountPrice" id="discountPrice"
                                value={product.productPrice.discountPrice} onChange={handleChangePrInput}/>
                                <span className="form-message"></span>
                            </div>
                            <div className="modal-form-group">
                                <label>Màu sắc:</label>
                                <div className="form-group-option">
                                    <label className="option-title">Màu đỏ</label>
                                    <input type="number" name="redColor" step="1" min="0" 
                                    value={productOption.color[0].stock} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Màu vàng</label>
                                    <input type="number" name="yellowColor" step="1" min="0"
                                    value={productOption.color[1].stock} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Màu hồng</label>
                                    <input type="number" name="pinkColor" step="1" min="0"
                                    value={productOption.color[2].stock} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Màu trắng</label>
                                    <input type="number" name="whiteColor" step="1" min="0"
                                    value={productOption.color[3].stock} onChange={handleChangePrOpInput}/>
                                </div>
                            </div>
                            <div className="modal-form-group">
                                <label>Kích cỡ:</label>
                                <div className="form-group-option">
                                    <label className="option-title">Nhỏ</label>
                                    <input type="number" name="smallSize" step="1000" min="0"
                                    value={productOption.size[0].extra} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Bình thường</label>
                                    <input type="number" name="mediumSize" step="1000" min="0"
                                    value={productOption.size[1].extra} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Lớn</label>
                                    <input type="number" name="largeSize" step="1000" min="0"
                                    value={productOption.size[2].extra} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Đặc biệt</label>
                                    <input type="number" name="specialSize" step="1000" min="0"
                                    value={productOption.size[3].extra} onChange={handleChangePrOpInput}/>
                                </div>
                            </div>
                            <div className="modal-form-group">
                                <label htmlFor="description">Mô tả</label>
                                <textarea type="text" name="description" id="description"
                                value={product.productInfo.description} onChange={handleChangePrInput}/>
                                <span className="form-message"></span>
                            </div>
                            <div className="modal-form-group btn-group">
                                <span className="modal-message"></span>
                                <button className="btn btn--green btn-save" type="submit">Hoàn tất</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;