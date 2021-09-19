import axios from "axios";
import { createContext, useReducer } from "react";
import { OrderReducer } from "../reducers/orderReducer";
import { ADD_ORDER, apiUrl, DELETE_ORDER, ORDER_LOADED_FAIL, ORDER_LOADED_SUCCESS, UPDATE_ORDER } from "./constants";

export const OrderContext = createContext();

const OrderContextProvider = ({children}) => {
    //const {socketState: {socket}} = useContext(SocketContext);console.log(socket)
    //state
    const [orderState, dispatch] = useReducer(OrderReducer, {
        orders: []
    })
    
    //get order
    const getOrders = async () => {
        try {
            const response = await axios.get(`${apiUrl}/order`);
            if(response.data.success){
                dispatch({
                    type: ORDER_LOADED_SUCCESS,
                    payload: response.data.orders
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({type: ORDER_LOADED_FAIL})
        }
    }
    const addOrderBySocket = (addData) => {
        dispatch({
            type: ADD_ORDER,
            payload: addData
        })
    }
    //add order
    const addOrder = async (addData, socket) => {
        try {
            //console.log("vv");console.log(socket)
            const response = await axios.post(`${apiUrl}/order/create`, addData);
            if(response.data.success){
                //console.log("vv");console.log(socket)
                socket.emit('createOrder', response.data.orders)
                // dispatch({
                //     type: ADD_ORDER,
                //     payload: response.data.orders
                // })
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    //update order
    const updateOrder = async (orderID, updateData) => {
        try {
            const response = await axios.put(`${apiUrl}/order/${orderID}`, updateData);
            if(response.data.success){
                dispatch({
                    type: UPDATE_ORDER,
                    payload: response.data.updateOrder
                })
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    //delete order
    const deleteOrder = async (orderID) => {
        try {
            const response = await axios.delete(`${apiUrl}/order/${orderID}`);
            if(response.data.success){
                dispatch({
                    type: DELETE_ORDER,
                    payload: orderID
                })
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    //order context data
    const orderContextData = {
        orderState,
        getOrders,
        addOrder,
        addOrderBySocket,
        updateOrder,
        deleteOrder
    }
    return (
        <OrderContext.Provider value={orderContextData}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider;
