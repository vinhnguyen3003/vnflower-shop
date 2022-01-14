import React, { useEffect, useState } from 'react';

function FirstNotification({handleFirstNoti}) {console.log('reload')
    const [firstNotification, setFirstNotification] = useState(false);

    useEffect(()=>{
        const firstNotiStorage = sessionStorage.getItem('FIRST_NOTI');
        
        if(firstNotiStorage === 'true' || firstNotiStorage === null) {
            setFirstNotification(true);
            handleFirstNoti(true)
            sessionStorage.setItem('FIRST_NOTI', 'false');

            setTimeout(()=>{
                setFirstNotification(false);
                handleFirstNoti(false);
            },45000)
        }
        else if(firstNotiStorage === 'false'){
            setFirstNotification(false);
            handleFirstNoti(false);
        }
    },[])
    // useEffect(()=>{
    //     const headerEl = document.getElementsByClassName('header')[0];
    //     if(!headerEl) return;
    //     if(firstNotification){
    //         headerEl.style.marginTop = '30px';
    //     }else{
    //         headerEl.removeAttribute('style');
    //     }
    // },[firstNotification])
    return (
        <>
            {
                firstNotification ?
                <div className="first-notification">
                    <div className="first-notification__content">
                        Nếu dữ liệu website chưa hiển thị, vui lòng chờ trong giây lát để server khởi động và lấy dữ liệu, xin lỗi vì sự bất tiện này, cảm ơn bạn đã ghé thăm
                    </div>
                </div> : null
            }
        </>
    );
}

export default FirstNotification;