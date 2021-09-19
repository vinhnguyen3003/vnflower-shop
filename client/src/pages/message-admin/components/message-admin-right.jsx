import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { MessageContext } from '../../../contexts/messageContext';
import { SocketContext } from '../../../contexts/socketContext';
import { getFullTime } from '../../../utils/time-method';
import { MessageAdminContext } from '../contexts/message-admin-context';
import HelloImage from './../images/hello.png';

function MessageAdminRight() {
    const {messState: {messages}, 
        getMessages, addMessage
    } = useContext(MessageContext);
    const {recipientID} = useContext(MessageAdminContext);
    const {authState: {user}} = useContext(AuthContext);
    const {socketState: {socket}} = useContext(SocketContext);

    const [messageInput, setMessageInput] = useState('');

    const sendMessageAction = () => {
        if(messageInput !== '') {
            addMessage({
                sender: user._id,
                recipient: recipientID,
                content: messageInput,
                createdAt: new Date()
            }, socket);
            setMessageInput('');
        }
    }
    const sendMessageActionEnter = (e) => {
        if(e.key === 'Enter' && messageInput !== ''){
            addMessage({
                sender: user._id,
                recipient: recipientID,
                content: messageInput,
                createdAt: new Date()
            }, socket);
            setMessageInput('');
        } 
    }
    useEffect(()=>{
        if(recipientID !== '') getMessages(recipientID);
    }, [recipientID])

    //console.log(messages)
    return (
        <div className="message-admin-right">
            {
                recipientID !== '' ?
                <>
                    {
                        messages.length !== 0 ?
                        <div className="message-admin-right__header">
                            <div className="right-header-image">
                                <img src={messages[0].sender.userAvatar} alt="" />
                            </div>
                            <span className="right-header-text">
                                {messages[0].sender.userName}
                            </span>
                        </div> : null
                    }
                    <div className="message-admin-right__body">
                        <ul className="right-body-mess-list">
                            {
                                messages.map((mess, index) => (
                                    <React.Fragment key={index}>
                                        {
                                            (mess.sender._id ? mess.sender._id : mess.sender) !== user._id &&
                                            <li className="right-body-mess-item mess-item--left">
                                                <div className="mess-item-avatar">
                                                    <img src={mess.sender.userAvatar} alt="" />
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
                                            <li className="right-body-mess-item mess-item--right">
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
                    <div className="message-admin-right__footer">
                        <div className="right-footer-input-text">
                            <textarea 
                                name="content" 
                                placeholder="Nhập tin nhắn tại đây!"
                                value={messageInput}
                                onChange={(e)=>setMessageInput(e.target.value)}
                                onKeyDown={sendMessageActionEnter}
                            ></textarea>
                        </div>
                        <div 
                            className="right-footer-send-btn"
                            onClick={sendMessageAction}
                        >
                            <i className="fas fa-share"></i>
                        </div>
                    </div>
                </> : 
                <div className="message-admin-right__empty">
                    <img src={HelloImage} alt="" />
                    <span>Xin chào, mời bạn chọn cuộc hội thoại</span>
                </div>
            }
        </div>
    );
}

export default MessageAdminRight;