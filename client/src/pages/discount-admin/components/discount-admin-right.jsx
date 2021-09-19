import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductContext } from '../../../contexts/productContext';
import { SocketContext } from '../../../contexts/socketContext';
import { countdownTime, countdownTime2 } from '../../../utils/time-method';
import { DiscountAdminContext } from '../contexts/discountAdminContext';

const initFlSaleTypeSuggest = [
    {
        "name": "Miễn phí giao hàng toàn quốc",
        "code": ""
    },
    {
        "name": "Tặng 1 khi mua 3 sản phẩm",
        "code": ""
    },
    {
        "name": "Tặng kèm 1 gói quà nhỏ bất kì",
        "code": ""
    }
]

function DiscountAdminRight() {
    const {productAdjust, setProductAdjust} = useContext(DiscountAdminContext);
    const {
            productState: {flashsale}, 
            getCountDownFlashsale,
            updateCountdownFlashsale,
            getCountDownFlashsaleBySocket,
            updateProduct
    } = useContext(ProductContext);

    const {socketState: {socket}} = useContext(SocketContext);

    const [flSaleTypeSuggest, setFlSaleTypeSuggest] = useState(initFlSaleTypeSuggest);

    const [countdownArr, setCountdownArr] = useState([]);
    const [flSaleTypeStorage, setFlSaleStorage] = useState(productAdjust.flashSaleType ? 
        productAdjust.flashSaleType.flashTypeArr : []);
    //help save interval status for destroy
    var intervalRef = useRef(null);

    const handleDatetime = () => {
        let datetimeInput = document.getElementById("datetime-input");
        if(Date.now() < Date.parse(datetimeInput.value)){
            //console.log(flashsale._id)
            updateCountdownFlashsale(flashsale._id, {countdown: datetimeInput.value}, socket);
        }else{
            let messDiv = document.getElementById("input-time-mess");
            messDiv.innerText = 'Thời gian bạn chọn phải sau ngày hôm nay';
            setTimeout(()=>{
                messDiv.innerText = '';
            }, 2000)
        }
    }
    const cancelCountdown = () => {//console.log("tt")
        if(intervalRef.current) clearInterval(intervalRef.current);
        setCountdownArr([]);
        updateCountdownFlashsale(flashsale._id, {countdown: 'null'}, socket);
    }
    const activateCountdown =() => {
        var timeArrayFirst = [];

        intervalRef.current = setInterval( ()=>{
            //Kiểm tra khi trường hợp flashsale.countdown không tồn tại
            if(flashsale.countdown) timeArrayFirst = countdownTime2(flashsale.countdown);
            
            if(timeArrayFirst[4] < 0){
                cancelCountdown();
            }else{
                setCountdownArr(timeArrayFirst);
            }
        }, 1000);
    }
    const pushFlType = (type) => {
        let newflSaleTypeStorage = [...flSaleTypeStorage];
        newflSaleTypeStorage.push(type);
        setFlSaleStorage(newflSaleTypeStorage);
    }
    const removeFlType = (index) => {
        let newflSaleTypeStorage = [...flSaleTypeStorage];
        newflSaleTypeStorage.splice(index, 1);
        setFlSaleStorage(newflSaleTypeStorage);
    }
    const addMethodSuggest = () => {
        let methodInputEl = document.getElementById("method-input-add");
        if(methodInputEl.value){
            setFlSaleTypeSuggest([...flSaleTypeSuggest, {name: methodInputEl.value, code: ""}])
            //flSaleTypeSuggest.push({name: methodInputEl.value, code: ""});
            methodInputEl.value = '';
        } 
    }
    const updateFlashsaleProduct = () => {
        if(!productAdjust.flashsaleType) return displayUpdateMess("Bạn chưa chọn sản phẩm, không thể thực hiện thao tác", false);
        let updateData = {...productAdjust, flashsaleType: {
            flashStatus: flSaleTypeStorage.length !== 0 ? true : false,
            flashTypeArr: flSaleTypeStorage
        }};
        const res = updateProduct(productAdjust._id, updateData);console.log(res)
        if(res) displayUpdateMess("Đã cập nhật thành công trạng thái", true)
    }
    const displayUpdateMess = (message, type) => {
        let updateMessEl = document.getElementById("update-message");
        if(!type) updateMessEl.setAttribute("style", "color: red;")
        updateMessEl.innerText = message;
        setTimeout(()=>{
            updateMessEl.innerText = '';
        }, 3000)
    }
    useEffect(()=>{
        //countdownTime('reset');
        //if(flashsale) countdownTime(flashsale.countdown);
        //countdownTime(countdownTimeVal);
        if(intervalRef.current) clearInterval(intervalRef.current);
        if(flashsale.countdown !== 'null') activateCountdown();

        return ( () => {
            if(intervalRef.current) clearInterval(intervalRef.current)
        })
    },[flashsale])

    useEffect(() => { 
        getCountDownFlashsale();
    },[])

    useEffect(() => {
        socket.on('getCountdown', countdown => {
            getCountDownFlashsaleBySocket(countdown);
        })
    },[socket, getCountDownFlashsaleBySocket])

    useEffect(() => {
        if(productAdjust.flashsaleType) setFlSaleStorage(productAdjust.flashsaleType.flashTypeArr)
    },[productAdjust])
    //console.log(flashsale)
    return (
        <div className="discount-admin__right">
            <div className="discount-admin-right-box discount-admin-right-time">
                <div className="box-right-title right-time__title">
                    Thời gian khuyến mãi
                </div>
                <div className="right-time__content">
                    <div className="right-time-content__countdown">
                        <div className="countdown-item">
                            <span className="countdown-item__time" id="days">{countdownArr[0] ? countdownArr[0] : '0'}</span>
                            <span className="countdown-item__text">Ngày</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-item__time" id="hours">{countdownArr[1] ? countdownArr[1] : '0'}</span>
                            <span className="countdown-item__text">Giờ</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-item__time" id="minutes">{countdownArr[2] ? countdownArr[2] : '0'}</span>
                            <span className="countdown-item__text">Phút</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-item__time" id="seconds">{countdownArr[3] ? countdownArr[3] : '0'}</span>
                            <span className="countdown-item__text">Giây</span>
                        </div>
                    </div>
                    <div className="right-time-content__select">
                        <input type="datetime-local" id="datetime-input"/>
                        <div id="input-time-mess"></div>
                        <div className="right-time-content-btn">
                            {
                                countdownArr.length === 0 ?
                                    <button 
                                        className="btn btn--green time-btn --yes"
                                        onClick={handleDatetime}
                                    >Kích hoạt</button> :
                                    <button 
                                        className="btn btn--red time-btn --no"
                                        onClick={cancelCountdown}
                                    >Hủy</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="discount-admin-right-box discount-admin-right-adjust">
                <div className="box-right-title right-adjust__title">
                    Cập nhật nội dung
                </div>
                <div className="right-adjust__content">
                    <div className="right-adjust-content-name">
                        <label>Tên sản phẩm:</label>
                        <span>
                            { productAdjust.productName !== undefined ? 
                                productAdjust.productName : '_ _ _ _ _'}
                        </span>
                    </div>
                    <div className="right-adjust-content-method">
                        <label>Hình thức khuyến mãi</label>
                        <ul className="adjust-method-list">
                            {
                                flSaleTypeStorage.length !== 0 ?
                                    flSaleTypeStorage.map((flSaTySt, index)=>{
                                        return <li 
                                                    className="adjust-method-item" 
                                                    key={index}
                                                    onClick={()=>removeFlType(index)}
                                                >
                                                    <span className="adjust-method-item__name">{flSaTySt.name}</span>
                                                </li>
                                    }) : <span style={{fontSize: '1.5rem'}}>_ _ _ _ _</span>
                            }
                        </ul>
                    </div>
                    <div className="right-adjust-content-method method-suggest">
                        <label>Gợi ý cho bạn</label>
                        <ul className="adjust-method-list">
                            {
                                flSaleTypeSuggest.map((flTySu, index)=>{
                                    return <li 
                                                className="adjust-method-item --active" 
                                                key={index}
                                                onClick={()=>pushFlType(flTySu)}
                                            >
                                                <span className="adjust-method-item__icon"></span>
                                                <span className="adjust-method-item__name">{flTySu.name}</span>
                                            </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="right-adjust-content-add">
                        <label>Thêm mới hình thức</label>
                        <div className="adjust-add-box">
                            <input type="text" id="method-input-add"/>
                            <span onClick={addMethodSuggest}>Thêm</span>
                        </div>
                    </div>
                    <div id="update-message"></div>
                    <div className="right-adjust-content-done">
                        <button 
                            className={`btn btn-adjust btn-adjust-done ${!productAdjust.flashsaleType ? '--no-active' : ''}`}
                            onClick={updateFlashsaleProduct}
                        >Hoàn tất</button>
                        <button 
                            className="btn btn-adjust btn-adjust-cancel"
                            onClick={()=>{
                                setProductAdjust({});
                                setFlSaleStorage([]);
                            }}
                        >Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscountAdminRight;