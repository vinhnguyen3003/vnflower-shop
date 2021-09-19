import React, { useContext, useEffect } from 'react';
import SidebarAdmin from '../../components/sidebar-admin/sidebar-admin';
import TopNavAdmin from '../../components/top-nav-admin/top-nav-admin';
import { AuthContext } from '../../contexts/authContext';
import { MessageContext } from '../../contexts/messageContext';
import { SocketContext } from '../../contexts/socketContext';
import MessageAdminLeft from './components/message-admin-left';
import MessageAdminRight from './components/message-admin-right';
import MessageAdminContextProvider from './contexts/message-admin-context';
import './stylesheets/message-admin.scss';

function MessageAdmin(props) {
    const {socketState: {socket}} = useContext(SocketContext);
    const { getMessages, getConversations, senderIDActive } = useContext(MessageContext);

    useEffect(()=>{
        socket.on('addMessageToRecipient', msg =>{
            if(msg.sender === senderIDActive) { 
                //addMessageBySocket(msg) 
                getMessages(msg.sender)
            }
            getConversations();
        })
        return () => socket.off('addMessageToRecipient')
    },[socket, senderIDActive, getMessages, getConversations])

    return (
        <div className="app">
            <title>Admin | Tin nhắn</title>
            <TopNavAdmin />
            <SidebarAdmin {...props}/>
            <div className="wrapper mess-wrapper">
                <div className="message-admin-wrapper">
                    <MessageAdminContextProvider>
                        <MessageAdminLeft />
                        <MessageAdminRight />
                    </MessageAdminContextProvider>
                </div>
            </div>
        </div>
    );
}

export default MessageAdmin;