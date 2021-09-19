import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Loading from './../../../components/loading/loading';
import { GlobalStateContext } from '../../../contexts/globalStateContext';
import {ProductAdminContext} from './../contexts/productAdminContext';
// import PropTypes from 'prop-types';

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
function ProductModal(props) {
    const globalState = useContext(GlobalStateContext);
    const {prModalStatus, setPrModalStatus, editStatus, setEditStatus, prFindID} = useContext(ProductAdminContext);
    
    const [categories] = globalState.categoryApi.categories;
    const [cateOpActive, setCateOpActive] = useState({_id: "", categoryName: "Chọn danh mục sản phẩm"});
    const [cateOpModalActive, setCateOpModalActive] = useState(false);
    const cate_display_el = useRef();
    const cate_modal_el = useRef();
    
    //console.log(editStatus)
    //console.log(prFindID)
    const [product, setProduct] = useState(initialProduct);
    const [productOption, setProductOption] = useState(initialProductOption);
    const [mainImage, setMainImage] = useState({});
    const [galleryImage, setGalleryImage] = useState([]);
    //Case update
    let initGalleryImage = [];
    if(galleryImage){console.log("vv")
        galleryImage.forEach((gaIm, index)=>{
            initGalleryImage.push({
                id: index + 1,
                data: {
                    public_id: gaIm.public_id,
                    url: gaIm.url
                }
            })
            return initGalleryImage;
        })
    }
    console.log(galleryImage)
    
    var galleryImageStorage = initGalleryImage;console.log(galleryImageStorage)
    var yy = galleryImageStorage;
    //End Case Update
    
    
    
    // if(editStatus && galleryImage[0] !== undefined){
    //     galleryImageStorage = galleryImage[0].data === undefined ? vvv : galleryImage;
    //     console.log(galleryImageStorage)
    // }
     
    //galleryImage.length === 0 ? initGalleryImage : galleryImage;
    var mainImageStorage = mainImage;
    //var galleryImage1 = [
        // {
        //     public_id: "FlowerWebsite/sqzcebbhlns6a4mxg3hx",
        //     url: "https://res.cloudinary.com/dmcosnuap/image/upload/v1627783142/FlowerWebsite/sqzcebbhlns6a4mxg3hx.jpg"
        // },
        // {
        //     public_id: "FlowerWebsite/hycbr4np47f9zsdlgiac",
        //     url: "https://res.cloudinary.com/dmcosnuap/image/upload/v1627783148/FlowerWebsite/hycbr4np47f9zsdlgiac.jpg"
        // },
        // {
        //     public_id: "FlowerWebsite/xifo3bcevmgkhzgbugia", 
        //     url: "https://res.cloudinary.com/dmcosnuap/image/upload/v1627783153/FlowerWebsite/xifo3bcevmgkhzgbugia.jpg"
        // }
    //]
    // var mainImage = {
    //     // public_id: "FlowerWebsite/dwd1dwbe6uapyq7wmfaw",
    //     // url: "https://res.cloudinary.com/dmcosnuap/image/upload/v1627783140/FlowerWebsite/dwd1dwbe6uapyq7wmfaw.jpg"
    // }
    
    var fakeID = initGalleryImage.length;//Dùng để tạo biến lưu trữ tạm thời cho gallery image

    const closePrModalForm = () =>{
        //document.getElementsByClassName("product-modal")[0].classList.remove("--show");
        setPrModalStatus(false);
    }
    
    const toggleCateOpModal = (cate_display_el, cate_modal_el) => {
        document.addEventListener('mousedown', (e) => {
            if(cate_display_el.current && cate_display_el.current.contains(e.target)){
                cate_modal_el.current.classList.toggle("--show");//Cần lệnh này vì state cateOpModal không thể update lại giá trị khi thay đổi lập tức
                setCateOpModalActive(true);
            }else{
                if(cate_modal_el.current && !cate_modal_el.current.contains(e.target)){
                    //cate_modal_el.current.classList.remove("--show");
                    setCateOpModalActive(false);
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
        console.log(galleryImageStorage)
        //if(galleryImage.length !== 0){
            galleryImageStorage.forEach(gaImg => {
                newGalleryImage.push({
                    public_id: gaImg.data.public_id,
                    url: gaImg.data.url
                })
            })
        // }else{
        //     newGalleryImage = galleryImageStorage;
        // }
        
        console.log({...product, category: cateOpActive._id, productImage: {mainImage, galleryImage: newGalleryImage}, productOption});


        // await axios.post('/api/product/create', 
        // {...product, category: cateOpActive._id, 
        // productImage: {mainImage, galleryImage: newGalleryImage}, productOption});
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
    //const [tt, setTT] = useState('v');console.log(tt)
    const handleUpload = async (e) =>{
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
            parentNode.classList.add("--hide");//ẩn hiện icon thêm

            //Tìm vị trí index của phần tử trong mảng gallaryImage
            let findFakeID = galleryImageStorage.findIndex((gaImg)=>gaImg.id === parseInt(parentNode.getAttribute("data-index")));

            //reset thẻ img trước khi cập nhật hoặc thêm mới, có 2 cách, nhưng tối ưu hóa thì dùng remove
            //ReactDOM.unmountComponentAtNode(wrapNode)
            let currentImgNode = wrapNode.querySelector("img");
            if(currentImgNode) currentImgNode.remove();

            createLoading(parentNode);

            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data'}
            })
            const imgNode = `<img src=${res.data.url} alt="" />`;

            //Trường hợp phần tử được chọn là ảnh mô tả
            if(parentNodeClassName.trim() === 'gallery-image-group' || parentNodeClassName === 'gallery-image-group --hide'){

                //Trường hợp không tìm thấy ptu trong galleryImage (Thêm)
                if(findFakeID === -1) {
                    createGallImgGr();
                    //Không thể dùng usestate vì usestate k thể lấy giá trị thay đổi từ usestate dùng với onchange của input.
                    fakeID = fakeID + 1;
                    parentNode.setAttribute('data-index', fakeID);
                    console.log(yy)
                    console.log(galleryImageStorage);console.log(initGalleryImage)
                    galleryImageStorage.push({id: fakeID, data: res.data});
                    setGalleryImage(galleryImageStorage);
                }
                //Trường hợp tìm thấy ptu trong galleryImage (Cập nhật)
                else{
                    //Xóa file trên cloudinary trước khi xóa trong mảng galleryImage tránh lỗi k tìm thấy public_id
                    destroyUpload(galleryImageStorage[findFakeID].data.public_id);
                    galleryImageStorage[findFakeID].data = {public_id: res.data.public_id, url: res.data.url};
                    setGalleryImage(galleryImageStorage)
                }
            }
            //Trường hợp ảnh được chọn là ảnh đại diện
            if(parentNodeClassName.trim() === 'main-image-group' || parentNodeClassName === 'main-image-group --hide'){
                if(mainImage.public_id) destroyUpload(mainImage.public_id);
                mainImageStorage = {public_id: res.data.public_id, url: res.data.url};
                setMainImage(mainImageStorage);
            }
            destroyLoading(parentNode);
            //Thêm phần tử img vào node, có thể dùng 2 cách, nhưng để tối ưu cho update thì dùng innerHTML
            //ReactDOM.render(imgNode, wrapNode);
            wrapNode.innerHTML = imgNode;

        } catch (error) {
            console.log(error)
        }
    }
    const handleDestroy = (e) =>{
        let parentNode = e.target.parentNode.parentNode;
        let parentNodeClassName = parentNode.getAttribute('class');
        let imgNode =  parentNode.querySelector("img");
        //Cần kiểm tra xem image có tồn tại không, nếu không có thì không thể xóa được
        if((parentNodeClassName.trim() === 'main-image-group' || parentNodeClassName === 'main-image-group --hide') && imgNode){
            destroyUpload(mainImageStorage.public_id);//Xóa cloudinary trước khi xóa ở mảng
            setMainImage({});
            parentNode.parentNode.remove();//Ra thẻ div rỗng
            createMainImgGr();
        }
        if((parentNodeClassName.trim() === 'gallery-image-group' || parentNodeClassName === 'gallery-image-group --hide') && imgNode){
            let elementID = parentNode.getAttribute("data-index");
            let findID = galleryImageStorage.findIndex((gaImg)=>gaImg.id === parseInt(elementID));
            destroyUpload(galleryImageStorage[findID].data.public_id);
            galleryImageStorage.splice(findID, 1);
            setGalleryImage(galleryImageStorage);
            parentNode.parentNode.remove();//Ra thẻ div.left-gallery-image__wrapper
        }
        //Thông báo nếu người dùng chọn xóa file ảnh không tồn tại
        if(!imgNode) alert("Không có file ảnh để xóa");
    }
    const handleDestroyAll = () =>{
        //Hàm dùng để xóa tất cả file ảnh trong hàng đợi (ảnh chưa được submit lên server)
        destroyUpload(mainImage.public_id);

        galleryImage.map((gaIm, index) => {
            return destroyUpload(gaIm.data.public_id)
        })
    }
    const destroyUpload = async (imageID) => {
        try {
            await axios.post('/api/destroy', {public_id: imageID})
        } catch (error) {
            console.log(error)
        }
    }

    var mainGroupNode = (initMainImg) => <div className={`main-image-group ${mainImage.url ? "--hide" : ""}`}>
                            <input type="file" 
                                onChange={handleUpload} 
                                className="custom-input-file"
                            />
                            <div className={`left-main-image__display box-image-display`}>
                                {
                                    mainImage.url !== undefined ? <img src={mainImage.url} alt=""/> : ""
                                }
                            </div>
                            <span className="btn-remove-img" onClick={handleDestroy}>
                                <i className="fas fa-window-close"></i>
                            </span>
                        </div>
    const createMainImgGr = () => {
        let parentNode = document.getElementsByClassName("left-main-image")[0];
        var blankNode = document.createElement("div");

        blankNode.setAttribute('class', "left-main-image__wrapper");
        parentNode.insertBefore(blankNode, parentNode.childNodes[0]);
        console.log(mainImage)
        ReactDOM.render(mainGroupNode(mainImageStorage.url), blankNode);

        // if(mainImage.url) {
        //     let initMainImg = `<img src=${mainImage.url} alt=""/>`;
        //     console.log(document.getElementsByClassName("left-main-image__display")[0])
        //     //document.getElementsByClassName("left-main-image__display")[0].innerHTML = initMainImg;
        // }
    }

    var gallGroupNode = <div className="gallery-image-group" data-index="0">
                            <input type="file" className="custom-input-file" onChange={handleUpload}/>
                            <div className="left-gallery-image__display box-image-display"></div>
                            <span className="btn-remove-img --small" onClick={handleDestroy}>
                                <i className="fas fa-window-close"></i>
                            </span>
                        </div>;

    const createGallImgGr = () => {
        let parentNode = document.getElementsByClassName("left-gallery-image__wrapper")[0];
        var blankNode = document.createElement("div");
        parentNode.appendChild(blankNode);
        ReactDOM.render(gallGroupNode, blankNode);
    }

    function vv(params) {
        const productImage = {mainImage: mainImage, galleryImage: galleryImageStorage}
        console.log(productImage);
    }
    //console.log(cateOpModalActive)
    useEffect(()=>{
        //console.log(editStatus)
        
        if(editStatus) {
            setProduct(prFindID);
            setProductOption(prFindID.productOption);
            setMainImage(prFindID.productImage.mainImage);
            setGalleryImage(prFindID.productImage.galleryImage);
            createGallImgGr();
        }else{
            createGallImgGr();
            createMainImgGr();
        }
        //createMainImgGr()
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
                                <div className="main-image-title" onClick={vv}>
                                    Ảnh đại diện
                                </div>
                            </div>
                            <div className="left-gallery-image">
                                <div className="left-gallery-image__wrapper">
                                    {   prFindID.productImage !== undefined ?
                                        prFindID.productImage.galleryImage.map((gaIm, index)=>{
                                            return <div key={index}>
                                                        <div className="gallery-image-group --hide" data-index={gaIm.id}>
                                                            <input type="file" className="custom-input-file" onChange={handleUpload}/>
                                                            <div className="left-gallery-image__display box-image-display">
                                                                <img src={gaIm.url} alt=""/>
                                                            </div>
                                                            <span className="btn-remove-img --small" onClick={handleDestroy}>
                                                                <i className="fas fa-window-close"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                        }):""
                                    }
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
                                <input type="number" step="1000" name="normalPrice" id="normalPrice"
                                value={product.productPrice.normalPrice} onChange={handleChangePrInput}/>
                                <span className="form-message"></span>
                            </div>
                            <div className="modal-form-group">
                                <label htmlFor="discountPrice">Giá bán khuyến mãi</label>
                                <input type="number" step="1000" name="discountPrice" id="discountPrice"
                                value={product.productPrice.discountPrice} onChange={handleChangePrInput}/>
                                <span className="form-message"></span>
                            </div>
                            <div className="modal-form-group">
                                <label>Màu sắc:</label>
                                <div className="form-group-option">
                                    <label className="option-title">Màu đỏ</label>
                                    <input type="number" name="redColor" step="1" 
                                    value={productOption.color[0].stock} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Màu vàng</label>
                                    <input type="number" name="yellowColor" step="1" 
                                    value={productOption.color[1].stock} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Màu hồng</label>
                                    <input type="number" name="pinkColor" step="1" 
                                    value={productOption.color[2].stock} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Màu trắng</label>
                                    <input type="number" name="whiteColor" step="1" 
                                    value={productOption.color[3].stock} onChange={handleChangePrOpInput}/>
                                </div>
                            </div>
                            <div className="modal-form-group">
                                <label>Kích cỡ:</label>
                                <div className="form-group-option">
                                    <label className="option-title">Nhỏ</label>
                                    <input type="number" name="smallSize" step="1000" 
                                    value={productOption.size[0].extra} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Bình thường</label>
                                    <input type="number" name="mediumSize" step="1000" 
                                    value={productOption.size[1].extra} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Lớn</label>
                                    <input type="number" name="largeSize" step="1000" 
                                    value={productOption.size[2].extra} onChange={handleChangePrOpInput}/>
                                </div>
                                <div className="form-group-option">
                                    <label className="option-title">Lớn</label>
                                    <input type="number" name="specialSize" step="1000" 
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