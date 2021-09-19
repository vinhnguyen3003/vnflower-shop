import { createContext, useState } from "react";


export const ProductAdminContext = createContext();

const ProductAdminProvider = ({children}) =>{

    //State
        const [prModalStatus, setPrModalStatus] = useState(false);
        const [editStatus, setEditStatus] = useState(false);
        const [prFindID, setPrFindID] = useState({});
    //End State


    //Start Action
    
    //End Action


    const ProductAdminData = {
        prModalStatus,
        setPrModalStatus,
        editStatus,
        setEditStatus,
        prFindID,
        setPrFindID
    }
    return(
        <ProductAdminContext.Provider value={ProductAdminData}>
            {children}
        </ProductAdminContext.Provider>
    )
}

export default ProductAdminProvider;