import React, { createContext } from 'react';
import CategoryApi from '../api/categoryApi';
import ProductApi from '../api/productApi';



export const GlobalStateContext = createContext();

const GlobalStateProvider = ({children}) => {

    const globalStateData = {
        categoryApi: CategoryApi(),
        productApi: ProductApi()
    }

    return (
        <GlobalStateContext.Provider value={globalStateData}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalStateProvider;