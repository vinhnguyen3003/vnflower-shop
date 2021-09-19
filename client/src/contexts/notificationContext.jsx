import axios from "axios";
import { createContext, useReducer } from "react";
import { NotiReducer } from "../reducers/notificationReducer";
import { ADD_NOTI, apiUrl, DELETE_NOTI, NOTI_LOADED_FAIL, NOTI_LOADED_SUCCESS, UPDATE_NOTI } from "./constants";


export const NotiContext = createContext();

const NotiContextProvider = ({children}) => {
    const [notiState, dispatch] = useReducer(NotiReducer, {
        notifications: []
    })
    //get order
    const getNoti = async () => {
        try {
            const response = await axios.get(`${apiUrl}/notification`);
            if(response.data.success){
                dispatch({
                    type: NOTI_LOADED_SUCCESS,
                    payload: response.data.notifications
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({type: NOTI_LOADED_FAIL})
        }
    }
    const addNotiBySocket = (addData) => {
        dispatch({
            type: ADD_NOTI,
            payload: addData
        })
    }
    //add order
    const addNoti = async (addData, socket) => {
        try {
            const response = await axios.post(`${apiUrl}/notification/create`, addData);
            if(response.data.success){
                socket.emit('createNoti', response.data.notifications)
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    //update order
    const updateNoti = async (notiID, updateData) => {
        try {
            const response = await axios.put(`${apiUrl}/notification/${notiID}`, updateData);
            if(response.data.success){
                dispatch({
                    type: UPDATE_NOTI,
                    payload: response.data.updateNotification
                })
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    //delete order
    const deleteNoti = async (notiID) => {
        try {
            const response = await axios.delete(`${apiUrl}/notification/${notiID}`);
            if(response.data.success){
                dispatch({
                    type: DELETE_NOTI,
                    payload: notiID
                })
            }
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
    const notiContextData = {
        notiState,
        getNoti,
        addNoti,
        addNotiBySocket,
        updateNoti,
        deleteNoti
    }
    return(
        <NotiContext.Provider value={notiContextData}>
            {children}
        </NotiContext.Provider>
    )
}

export default NotiContextProvider