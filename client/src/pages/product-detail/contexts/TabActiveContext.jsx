import React, {createContext, useState} from 'react';

export const TabActiveContext = createContext();

const TabActiveContextProvider = ({children}) =>{
    
    //state
    const [tabActive, setTabActive] = useState(0);

    //function set tab active
    const changeTabActive = (index) =>{
        setTabActive(index);
    }

    //context data
    const tabActiveContextData = {
        tabActive,
        changeTabActive
    }

    //return provider
    return(
        <TabActiveContext.Provider value={tabActiveContextData}>
            {children}
        </TabActiveContext.Provider>
    )
}

export default TabActiveContextProvider;