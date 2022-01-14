import { ADD_TO_CART, CLEAR_CART, DELETE_IN_CART, UPDATE_IN_CART } from "../contexts/constants";


const storage = cartItems => {
    sessionStorage.setItem('CART', JSON.stringify(cartItems.length > 0 ? cartItems : []));
}

export const sumItems = cartItems => {
    storage(cartItems);
    let itemCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    let totalPrice = cartItems.reduce((total, cartItem) => total + (
            cartItem.product.productPrice.discountPrice !== 0 ? 
            cartItem.product.productPrice.discountPrice : 
            cartItem.product.productPrice.normalPrice) * cartItem.quantity, 0);
    return {itemCount, totalPrice}
}

export const CartReducer = (state , action) => {

    const {type, payload} = action;
    if(payload){
        var {product, quantity, prID} = payload;
    }
    let index = -1;
    //Clone new carts array
    const newCart = [...state.cartItems];

    switch (type) {
        case ADD_TO_CART:

            index = findProductInCart(state.cartItems, product);
            
            if(index !== -1){
                const newCartItem = {...newCart[index]};
                newCartItem.quantity += quantity;
                newCart[index] = newCartItem;
            }else{
                newCart.push({product, quantity})
            }
            return {
                ...state, 
                cartItems: newCart
            }
        case DELETE_IN_CART:
            
            index = newCart.findIndex(neCa => neCa.product._id === payload);
            newCart.splice(index, 1);

            return {
                ...state, 
                ...sumItems(newCart),
                cartItems: newCart
            }
        case UPDATE_IN_CART:

            index = newCart.findIndex(neCa => neCa.product._id === prID);
            
            const newCartItem = {...newCart[index]};
            newCartItem.quantity = quantity;
            newCart[index] = newCartItem;

            return {
                ...state, 
                ...sumItems(newCart),
                cartItems: newCart
            }
        case CLEAR_CART:
            return {
                ...state,
                ...sumItems([]),
                cartItems: []
            }
        default:
            return state;
    }
}


var findProductInCart = (cart, product) => {
    let index = -1;
    if(cart.length > 0){
        for(let i = 0; i < cart.length; i++){
            if(cart[i].product._id === product._id){
                index = i;
                break;
            }
        }
    }
    return index;
}