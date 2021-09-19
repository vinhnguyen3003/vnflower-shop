import React, { useContext, useEffect, useState } from 'react';
import './stylesheets/message.scss';
import { GoogleLogin } from 'react-google-login';
import { AuthContext } from '../../contexts/authContext';
import { SocketContext } from '../../contexts/socketContext';
import { MessageContext } from '../../contexts/messageContext';
import { getFullTime } from './../../utils/time-method';

function Message() {
    const [messModalStatus, setMessModalStatus] = useState(false);
    const { authState: {isAuthenticated, isAdmin, user}, loginUserWith} = useContext(AuthContext);
    const {socketState: {socket}} = useContext(SocketContext);
    const {messState: {messages, conversations}, 
            addMessage, getMessages, 
            addMessageBySocket, addConversationNoti,
            conversationNoti, getConversations,
            deleteConversatioNoti
    } = useContext(MessageContext);

    const [message, setMessage] = useState('');

    const handleMessModal = () => {
        setMessModalStatus(!messModalStatus)
        if(isAuthenticated && conversations.length !== 0) { 
            deleteConversatioNoti(conversations[0]._id)
        }
    }

    const handleChangeInput = (e) => {
        if(!e.target.value.match(/\n/)){//không có chứa kí tự \n (xuống dòng)
            setMessage(e.target.value);
        }
    }
    const sendMessageAction = () => {
        if(message !== ''){
            addMessage({
                sender: user._id,
                recipient: '613ad99cd38f4576a4e16aed',
                content: message,
                createdAt: new Date()
            }, socket)
            setMessage('');
        }
    }
    const sendMessageActionEnter = (e) => {
        if(e.key === 'Enter' && message !== ''){
            addMessage({
                sender: user._id,
                recipient: '613ad99cd38f4576a4e16aed',
                content: message,
                createdAt: new Date()
            }, socket)
            setMessage('');
        }
    }

    const autoHeightTextarea = (e) => {
        if(e.target.value !== ''){
            e.target.style.height = 'auto';
            e.target.style.height = (e.target.scrollHeight - 19) + 'px';
        }
        else{
            e.target.style.height = '40px';
        }
    }

    const googleSuccess = async (res) => {
        //console.log(res);
        const {email, name, imageUrl} = res.profileObj;
        loginUserWith({
            loginName: email,
            userName: name,
            userAvatar: imageUrl,
            accessToken: res.accessToken
        })
        if(conversationNoti.length !== 0 && conversations.length !== 0) {
            deleteConversatioNoti(conversations[0]._id)
        }
    }
    const googleFailure = (error) => {
        console.log(error)
        console.log('Đăng nhập bằng Google thất bại. Vui lòng thử lại sau')
    }
    useEffect(()=>{
        if(socket && user !== null) socket.emit('joinUser', user)
    },[socket, user])

    useEffect(()=>{
        if(isAuthenticated) {
            getMessages('613ad99cd38f4576a4e16aed');
            getConversations();
        }
    },[isAuthenticated])

    useEffect(()=>{
        //console.log(socket)
        if(socket.connected !== undefined){
            socket.on('addMessageToRecipient', msg =>{console.log('what')
                addMessageBySocket(msg);
            })
            return () => socket.off('addMessageToRecipient')
        }
    },[socket, addMessageBySocket])
    useEffect(()=>{
        //console.log(socket)
        if(socket.connected !== undefined){
            socket.on('addConverNotiToRecipient', data => {
                if(!messModalStatus) addConversationNoti(data);
            })
            return () => socket.off('addConverNotiToRecipient')
        }
    },[socket, addConversationNoti, messModalStatus])
    //console.log(messages)
    return (
        <div className="message">
            <div className="message__wrapper">
                <span 
                    className="message-icon"
                    onClick={handleMessModal}
                >
                    <i className="fas fa-circle"></i>
                    <i className="fas fa-circle"></i>
                    <i className="fas fa-circle"></i>
                </span>
                {
                    conversations.length !== 0 ? 
                        conversationNoti.map((conv, index) => {
                            let count = '';
                            if(conv.conversationID === conversations[0]._id){
                                count = conv.conversationCount.toString()
                            }
                            return <span className="message-badge" key={index}>{count}</span>
                        }) : null
                }
                <div className={`message-modal ${messModalStatus ? '--show' : ''}`}>
                    <div className="message-modal__header">
                        <span>VnFlower</span>
                        <span onClick={()=>setMessModalStatus(false)}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    {
                        isAuthenticated && isAdmin === false ? 
                            <>
                                <div className="message-modal__body">
                                    <ul className="modal-body-mess-list">
                                        {
                                            messages.map((mess, index) => (
                                                <React.Fragment key={index}>
                                                    {
                                                        (mess.sender._id ? mess.sender._id : mess.sender) !== user._id &&
                                                            <li className="modal-body-mess-item mess-item--left">
                                                                <div className="mess-item-avatar">
                                                                    <img src="https://cdn-icons-png.flaticon.com/512/3048/3048122.png" alt="" />
                                                                </div>
                                                                <div className="mess-item-content">
                                                                    <div className="mess-item-content__text">
                                                                        {mess.content}
                                                                    </div>
                                                                    <div className="mess-item-content__time">
                                                                        {getFullTime(mess.createdAt)}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                    }
                                                    {
                                                        (mess.sender._id ? mess.sender._id : mess.sender) === user._id &&
                                                            <li className="modal-body-mess-item mess-item--right">
                                                                <div className="mess-item-content">
                                                                    <div className="mess-item-content__text">
                                                                        {mess.content}
                                                                    </div>
                                                                    <div className="mess-item-content__time">
                                                                        {getFullTime(mess.createdAt)}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                    }
                                                </React.Fragment>
                                            ))
                                        }
                                        
                                    </ul>
                                </div>
                                <div className="message-modal__footer">
                                    <div className="modal-footer-input-text">
                                        <textarea 
                                            name="message" 
                                            placeholder="Nhập tin nhắn tại đây!"
                                            value={message}
                                            onChange={handleChangeInput}
                                            onKeyDown={sendMessageActionEnter}
                                            onInput={autoHeightTextarea}
                                        ></textarea>
                                    </div>
                                    <div 
                                        className="modal-footer-send-btn"
                                        onClick={sendMessageAction}
                                    >
                                        <i className="fas fa-share"></i>
                                    </div>
                                </div>
                            </> :
                            <div className="message-modal__login">
                                <span>Bạn cần đăng nhập để nhắn tin</span>
                                <GoogleLogin 
                                    clientId="613805094967-tn8daig5mogru4h2gj917hg585fi7k25.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <button 
                                            className="message-modal-google-login"
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                        >
                                            Tiếp tục với Google
                                            <i className="fab fa-google"></i>
                                        </button>
                                    )}
                                    buttonText="Login"
                                    onSuccess={googleSuccess}
                                    onFailure={googleFailure}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Message;