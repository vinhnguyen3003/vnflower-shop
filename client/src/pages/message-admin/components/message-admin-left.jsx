import React, { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../../contexts/messageContext';
import { MessageAdminContext } from '../contexts/message-admin-context';
import { getFullTime } from '../../../utils/time-method';
import { AuthContext } from '../../../contexts/authContext';

function MessageAdminLeft() {
    const {messState: {conversations}, 
        getConversations, 
        conversationNotiAdmin,
        setConversationIDActive,
        setSenderIDActive,
        deleteConversatioNotiAdmin
    } = useContext(MessageContext);

    const {setRecipientID} = useContext(MessageAdminContext);
    const {authState: {user}} = useContext(AuthContext);

    const [conversationActive, setConversationActive] = useState(-1);


    useEffect(()=>{
        getConversations();
        return () => setConversationIDActive('')
    },[])

    return (
        <div className="message-admin-left">
            <div className="message-admin-left__header">
                Tin nhắn
            </div>
            <div className="message-admin-left__body">
                <ul className="message-group">
                    {
                        conversations.length !== 0 ? conversations.map((conv, index)=>{
                            let newRecipients = conv.recipients.filter(re => re._id !== user._id);
                            return <li 
                                        className={`message-group__item ${conversationActive === index ? '--active' : ''}`}
                                        key={index}
                                        onClick={()=>{
                                            setRecipientID(newRecipients[0]._id)
                                            setConversationActive(index)
                                            setConversationIDActive(conv._id)
                                            setSenderIDActive(newRecipients[0]._id)
                                            deleteConversatioNotiAdmin(conv._id)
                                        }}
                                    >
                                        <div className="message-group-image">
                                            <img src={newRecipients[0].userAvatar} alt="" />
                                        </div>
                                        <div className="message-group-content">
                                            <span>{newRecipients[0].userName}</span>
                                            <span>{getFullTime(conv.updatedAt)}</span>
                                        </div>
                                        
                                        {
                                            conversationNotiAdmin && conversationNotiAdmin.map((convAd, index) => {
                                                let count = '';
                                                if(convAd.conversationID === conv._id){
                                                    count = convAd.conversationCount.toString()
                                                }
                                                return (
                                                    count !== '' ?
                                                    <div className="message-group-badge" key={index}>
                                                        <span>{count}</span>
                                                    </div> : null
                                                )
                                            })
                                        }
                                    </li>
                        }) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default MessageAdminLeft;