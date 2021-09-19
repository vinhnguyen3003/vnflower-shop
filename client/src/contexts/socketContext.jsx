import { createContext, useEffect, useReducer } from "react";
import { io } from "socket.io-client";
import { SocketReducer } from "../reducers/socketReducer";
import { INIT_SOCKET } from "./constants";


export const SocketContext = createContext();

const SocketContextProvider = ({children}) => {
    //state
    const [socketState, dispatch] = useReducer(SocketReducer, {
        socket: {}
    })

    //init socket
    const initSocket = (socketData) => {
        dispatch({
            type: INIT_SOCKET,
            payload: socketData
        })
    }

    //order context data
    const socketContextData = {
        socketState,
        initSocket
    }
    useEffect(()=>{
        const socket = io(
            process.env.NODE_ENV !== 'production'
            ? ''
            : 'https://vnflower-shop-server.herokuapp.com'
        );
        //console.log(socket)
        dispatch({
            type: INIT_SOCKET,
            payload: socket
        })
        return () => socket.close()
    },[])
    return (
        <SocketContext.Provider value={socketContextData}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider;