import { ADD_PRODUCT, COUNTDOWN_FLASHSALE_SUCCESS, DELETE_PRODUCT, DESTROY_PRODUCT_STATE, DESTROY_PR_FLASHSALE_STATE, PRODUCT_LOADED_FAIL, PRODUCT_LOADED_SUCCESS, PR_DETAIL_LOADED_FAIL, PR_DETAIL_LOADED_SUCCESS, PR_FLASHSALE_LOADED_FAIL, PR_FLASHSALE_LOADED_SUCCESS, UPDATE_COUNTDOWN_FLASHSALE, UPDATE_PRODUCT } from "../contexts/constants";


export const productReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case PRODUCT_LOADED_SUCCESS:
            return {
                ...state,
                products: payload
            }
        case PRODUCT_LOADED_FAIL:
            return {
                ...state,
                products: []
            }
        case PR_DETAIL_LOADED_SUCCESS:
            return {
                ...state,
                productDetail: payload
            }
        case PR_DETAIL_LOADED_FAIL:
            return {
                ...state,
                productDetail: {}
            }
        case DESTROY_PRODUCT_STATE:
            return {
                ...state,
                productDetail: null,
                products: null
            }
        case DESTROY_PR_FLASHSALE_STATE:
            return {
                ...state,
                productsFlashsale: null
            }
        case PR_FLASHSALE_LOADED_SUCCESS:
            return {
                ...state,
                productsFlashsale: payload
            }
        case PR_FLASHSALE_LOADED_FAIL:
            return {
                ...state,
                productsFlashsale: []
            }
        case COUNTDOWN_FLASHSALE_SUCCESS:
            return {
                ...state,
                flashsale: payload[0]
            }
        case UPDATE_COUNTDOWN_FLASHSALE:
            return {
                ...state,
                flashsale: payload
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, payload]
            }
        case UPDATE_PRODUCT:
            const newProducts = state.products.map(pr => 
                pr._id === payload._id ? payload : pr    
            )
            return {
                ...state,
                products: newProducts
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(pr => pr._id !== payload)
            }
        default:
            return state;
    }
}