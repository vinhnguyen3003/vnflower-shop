import { createContext, useState } from "react";


export const MessageAdminContext = createContext();

const MessageAdminContextProvider = ({children}) => {
    const [recipientID, setRecipientID] = useState('');

    const messAdminContextData = {
        recipientID,
        setRecipientID
    }
    return (
        <MessageAdminContext.Provider value={messAdminContextData}>
            {children}
        </MessageAdminContext.Provider>
    )
}

export default MessageAdminContextProvider;