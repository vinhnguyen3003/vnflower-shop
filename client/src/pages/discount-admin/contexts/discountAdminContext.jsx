import { createContext, useState } from "react";


export const DiscountAdminContext = createContext();

const DiscountAdminContextProvider = ({children}) => {

    const [productAdjust, setProductAdjust] = useState({});
    //context data
    const discountAdminContextData = {
        productAdjust,
        setProductAdjust
    }

    return (
        <DiscountAdminContext.Provider value={discountAdminContextData}>
            {children}
        </DiscountAdminContext.Provider>
    )
}

export default DiscountAdminContextProvider;
