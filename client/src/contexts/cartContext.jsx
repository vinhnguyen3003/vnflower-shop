import { createContext, useReducer } from "react";
import { CartReducer, sumItems } from "../reducers/cartReducer";
import { ADD_TO_CART, CLEAR_CART, DELETE_IN_CART, UPDATE_IN_CART } from "./constants";


export const CartContext = createContext();

const storageData = sessionStorage.getItem('CART') ? JSON.parse(sessionStorage.getItem('CART')) : [];
const initialState = { cartItems: storageData, ...sumItems(storageData)}

const CartContextProvider = ({children}) => {
    

    //State
    const [cartState, dispatch] = useReducer(CartReducer, initialState);
    
    //Add to cart
    const addToCart = (product, quantity) => {
        //console.log(cartState)
        //console.log(quantity)
        dispatch({
            type: ADD_TO_CART,
            payload: {product, quantity}
        })
    }
    //Delete in cart
    const deleteInCart = (prID) => {
        dispatch({
            type: DELETE_IN_CART,
            payload: prID
        })
    }
    //Update cart
    const updateInCart = (prID, quantity) => {
        dispatch({
            type: UPDATE_IN_CART,
            payload: {prID, quantity}
        })
    }
    //Clear cart
    const clearCart = () => {
        dispatch({type: CLEAR_CART})
    }
    //Cart data
    const cartContextData = {
        cartState,
        addToCart,
        deleteInCart,
        updateInCart,
        clearCart
    }

    return (
        <CartContext.Provider value={cartContextData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;