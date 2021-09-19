import { ADD_ORDER, DELETE_ORDER, ORDER_LOADED_FAIL, ORDER_LOADED_SUCCESS, UPDATE_ORDER } from "../contexts/constants";

export const OrderReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case ADD_ORDER:
            return {
                ...state,
                orders: payload
            }
        case ORDER_LOADED_SUCCESS:
            return {
                ...state,
                orders: payload
            }
        case ORDER_LOADED_FAIL:
            return {
                ...state,
                orders: []
            }
        case UPDATE_ORDER:
            const newOrder = state.orders.map(order => 
                order._id === payload._id ? payload : order
            )
            return {
                ...state,
                orders: newOrder
            }
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(ord => ord._id !== payload)
            }
        default:
            return;
    }
}