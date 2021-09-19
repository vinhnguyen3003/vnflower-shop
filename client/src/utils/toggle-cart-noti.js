
const toggleCartNoti = () => {
    let headerElement = document.getElementsByClassName('header')[0];
    let cartNotiElement = headerElement.getElementsByClassName('header-cart__noti')[0];

    cartNotiElement.classList.add('--show');

    setTimeout(()=>{
        cartNotiElement.classList.remove('--show');
    }, 2000)
}

export default toggleCartNoti;