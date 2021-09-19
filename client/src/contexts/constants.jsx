export const apiUrl = 
    process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000/api'
    : 'https://vnflower-shop-server.herokuapp.com/api'

export const LOCAL_STORAGE_ACCESS_TOKEN_NAME = 'flower-website-access-token';
export const LOCAL_STORAGE_REFRESH_TOKEN_NAME = 'flower-website-refresh-token';
export const ADMIN_LOCAL_STORAGE_ACCESS_TOKEN_NAME = 'flower-website-admin-access-token';
export const ADMIN_LOCAL_STORAGE_REFRESH_TOKEN_NAME = 'flower-website-admin-refresh-token';

export const SET_AUTH = 'SET_AUTH';

//Category
export const CATE_LOADED_SUCCESS = 'CATE_LOADED_SUCCESS';
export const CATE_LOADED_FAIL = 'CATE_LOADED_FAIL';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

//Product
export const PRODUCT_LOADED_SUCCESS = 'PRODUCT_LOADED_SUCCESS';
export const PRODUCT_LOADED_FAIL = 'PRODUCT_LOADED_FAIL';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const PR_DETAIL_LOADED_SUCCESS = 'PR_DETAIL_LOADED_SUCCESS';
export const PR_DETAIL_LOADED_FAIL = 'PR_DETAIL_LOADED_FAIL';
export const PR_FLASHSALE_LOADED_SUCCESS = 'PR_FLASHSALE_LOADED_SUCCESS';
export const PR_FLASHSALE_LOADED_FAIL = 'PR_FLASHSALE_LOADED_FAIL';
export const COUNTDOWN_FLASHSALE_SUCCESS = 'COUNTDOWN_FLASHSALE_SUCCESS';
export const UPDATE_COUNTDOWN_FLASHSALE = 'UPDATE_COUNTDOWN_FLASHSALE';
export const DESTROY_PRODUCT_STATE = 'DESTROY_PRODUCT_STATE';
export const DESTROY_PR_FLASHSALE_STATE = 'DESTROY_PR_FLASHSALE_STATE';

//Cart
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_IN_CART = 'UPDATE_IN_CART';
export const DELETE_IN_CART = 'DELETE_IN_CART';
export const CLEAR_CART = 'CLEAR_CART';

//Review
export const ADD_REVIEW = 'ADD_REVIEW';
export const REVIEW_LOADED_SUCCESS = 'REVIEW_LOADED_SUCCESS';
export const REVIEW_LOADED_FAIL = 'REVIEW_LOADED_FAIL';

//History
export const ADD_HISTORY = 'ADD_HISTORY';
export const GET_HISTORY = 'GET_HISTORY';

//Order
export const ADD_ORDER = 'ADD_ORDER';
export const ORDER_LOADED_SUCCESS = 'ORDER_LOADED_SUCCESS';
export const ORDER_LOADED_FAIL = 'ORDER_LOADED_FAIL';
export const DELETE_ORDER = 'DELETE_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';

//Notification
export const ADD_NOTI = 'ADD_NOTI';
export const NOTI_LOADED_SUCCESS = 'NOTI_LOADED_SUCCESS';
export const NOTI_LOADED_FAIL = 'NOTI_LOADED_FAIL';
export const DELETE_NOTI = 'DELETE_NOTI';
export const UPDATE_NOTI = 'UPDATE_NOTI';

//Message
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const MESS_LOADED_SUCCESS = 'MESS_LOADED_SUCCESS';
export const MESS_LOADED_FAIL = 'MESS_LOADED_FAIL';
export const CONVERSATION_LOADED_SUCCESS = 'CONVERSATION_LOADED_SUCCESS';
export const CONVERSATION_LOADED_FAIL = 'CONVERSATION_LOADED_FAIL';
export const DELETE_MESS = 'DELETE_MESS';
export const DELETE_COVERSATION = 'DELETE_COVERSATION';

//Socket
export const INIT_SOCKET = 'INIT_SOCKET';
