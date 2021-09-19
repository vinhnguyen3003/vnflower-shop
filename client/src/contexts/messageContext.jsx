import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { MessageReducer } from './../reducers/messageReducer';
import { ADD_MESSAGE, apiUrl, CONVERSATION_LOADED_FAIL, CONVERSATION_LOADED_SUCCESS, MESS_LOADED_FAIL, MESS_LOADED_SUCCESS } from "./constants";

export const MessageContext = createContext();


const initialValue = localStorage.getItem('CONV_NOTI') ? JSON.parse(localStorage.getItem('CONV_NOTI')) : [];
const initialValueAdmin =  localStorage.getItem('CONV_NOTI_ADMIN') ? JSON.parse(localStorage.getItem('CONV_NOTI_ADMIN')) : [];

const MessageContextProvider = ({children}) => {
    const [messState, dispatch] = useReducer(MessageReducer, {
        messages: [],
        conversations: []
    })

    const [conversationNoti, setConversationNoti] = useState(initialValue)
    const [conversationNotiAdmin, setConversationNotiAdmin] = useState(initialValueAdmin)

    const [conversationIDActive, setConversationIDActive] = useState('');
    const [senderIDActive, setSenderIDActive] = useState('');
    //add message
    const addMessage = async (mess, socket) => {
        dispatch({
            type: ADD_MESSAGE,
            payload: mess
        })   

        try {
            const res = await axios.post(`${apiUrl}/messageUrl/message`, mess);
            if(res.data.success){
                socket.emit('addMessage', mess)
                socket.emit('addConverNoti', res.data.resConversation)
            }
        } catch (error) {
            console.log(error);
        }
    }
    //add message by socket
    const addMessageBySocket = (mess) => {
        dispatch({
            type: ADD_MESSAGE,
            payload: mess
        })
    }
    //get message
    const getMessages = async (recipientID) => {
        try {//console.log(recipientID)
            const res = await axios.get(`${apiUrl}/messageUrl/message/${recipientID}`);
            if(res.data.success){
                dispatch({
                    type: MESS_LOADED_SUCCESS,
                    payload: res.data.messages
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: MESS_LOADED_FAIL})
        }
    }
    //get conversation
    const getConversations = async () => {
        try {
            const res = await axios.get(`${apiUrl}/messageUrl/conversation`);
            if(res.data.success){
                dispatch({
                    type: CONVERSATION_LOADED_SUCCESS,
                    payload: res.data.conversations
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: CONVERSATION_LOADED_FAIL})
        }
    } 
    //add conversation notification 
    const addConversationNoti = (data) => {console.log(data)
        let index = conversationNoti.findIndex(conv => conv.conversationID === data.conversationID);
        
        let newConversation = [...conversationNoti];
        if(index !== -1){
            let newConversationCount = newConversation[index].conversationCount + 1
            newConversation[index] = {
                conversationID: data.conversationID, 
                conversationCount: newConversationCount,
                conversationStatus: true
            }
        }else{
            newConversation.push({
                conversationID: data.conversationID, 
                conversationCount: 1,
                conversationStatus: true
            })
        }
        setConversationNoti(newConversation)
        localStorage.setItem('CONV_NOTI', JSON.stringify(newConversation))
    }
    //delete conversation notification
    const deleteConversatioNoti = (conversationID) => {
        let index = conversationNoti.findIndex(conv => conv.conversationID === conversationID);

        let newConversation = [...conversationNoti];

        if(index !== -1){
            newConversation.splice(index, 1);
            setConversationNoti(newConversation)
            localStorage.setItem('CONV_NOTI', JSON.stringify(newConversation))
        }
    }
    //add conversation notification 
    const addConversationNotiAdmin = (data) => {
        let index = conversationNotiAdmin.findIndex(conv => conv.conversationID === data.conversationID);
        
        let newConversation = [...conversationNotiAdmin];
        if(index !== -1){
            let newConversationCount = newConversation[index].conversationCount + 1
            newConversation[index] = {
                conversationID: data.conversationID, 
                conversationCount: newConversationCount,
                conversationStatus: true
            }
        }else{
            newConversation.push({
                conversationID: data.conversationID, 
                conversationCount: 1,
                conversationStatus: true
            })
        }
        setConversationNotiAdmin(newConversation)
        localStorage.setItem('CONV_NOTI_ADMIN', JSON.stringify(newConversation))
    }
    //delete conversation notification admin
    const deleteConversatioNotiAdmin = (conversationID) => {
        let index = conversationNotiAdmin.findIndex(conv => conv.conversationID === conversationID);

        let newConversation = [...conversationNotiAdmin];

        if(index !== -1){
            newConversation.splice(index, 1);
            setConversationNotiAdmin(newConversation)
            localStorage.setItem('CONV_NOTI_ADMIN', JSON.stringify(newConversation))
        }
    }

    const messageContextData = {
        messState,
        addMessage,
        addMessageBySocket,
        getMessages,
        getConversations,
        addConversationNoti,
        addConversationNotiAdmin,
        conversationNoti,
        conversationNotiAdmin,
        deleteConversatioNoti,
        deleteConversatioNotiAdmin,
        conversationIDActive,
        setConversationIDActive,
        senderIDActive,
        setSenderIDActive
    }
    return (
        <MessageContext.Provider value={messageContextData}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider;