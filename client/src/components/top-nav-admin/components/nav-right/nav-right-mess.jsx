import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageContext } from '../../../../contexts/messageContext';
import { SocketContext } from '../../../../contexts/socketContext';


function NavRightMess() {
    const { conversationNotiAdmin, 
        addConversationNotiAdmin, conversationIDActive
    } = useContext(MessageContext);
    const {socketState: {socket}} = useContext(SocketContext);

    useEffect(()=>{
        socket.on('addConverNotiToRecipient', data => {
            //console.log(conversationIDActive)
            if(data.conversationID !== conversationIDActive) {
                addConversationNotiAdmin(data);
            }
        })
        return () => socket.off('addConverNotiToRecipient')
    },[socket, addConversationNotiAdmin, conversationIDActive])

    return (
        <li className="nav-item">
            <Link to="/admin/message" className="nav-link">
                <i className="fas fa-comment-dots"></i>
                {
                    conversationNotiAdmin.filter(convAd => convAd.conversationStatus === true).length !== 0 ?
                    <span className="navbar-badge">
                        {conversationNotiAdmin.filter(convAd => convAd.conversationStatus === true).length}
                    </span> : null
                }
            </Link>
        </li>
    );
}

export default NavRightMess;