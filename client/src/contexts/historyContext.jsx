import { createContext, useReducer } from "react";
import { HistoryReducer } from "../reducers/historyReducer";
import { ADD_HISTORY } from "./constants";


export const HistoryContext = createContext();

const storageData = localStorage.getItem('HISTORY') ? JSON.parse(localStorage.getItem('HISTORY')) : [];
const initialState = {prHistorys: storageData};

const HistoryContextProvider = ({children}) => {
    //State
    const [historyState, dispatch] = useReducer(HistoryReducer, initialState)
    
    //Action
    const addHistory = (addData) => {
        dispatch({
            type: ADD_HISTORY,
            payload: addData
        })
    }

    //History context data
    const historyContextData = {
        historyState,
        addHistory
    }

    return (
        <HistoryContext.Provider value={historyContextData}>
            {children}
        </HistoryContext.Provider>
    )
}

export default HistoryContextProvider;