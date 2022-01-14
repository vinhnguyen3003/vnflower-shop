import axios from 'axios';
import {useContext, useEffect} from 'react';
import {Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext';
import { apiUrl, ADMIN_LOCAL_STORAGE_ACCESS_TOKEN_NAME, ADMIN_LOCAL_STORAGE_REFRESH_TOKEN_NAME } from '../../contexts/constants';
import { SocketContext } from '../../contexts/socketContext';

const ProtectedRoute = ({render: Component, ...rest}) => {
    const {authState: { isWaiting, isAuthenticated, isAdmin, user }, loadUser} = useContext(AuthContext);
    const {socketState: {socket}} = useContext(SocketContext);

    //Refresh token
    useEffect(()=>{
        if(localStorage[ADMIN_LOCAL_STORAGE_REFRESH_TOKEN_NAME]){
            const refreshToken = async () => {
                const res = await axios.put(`${apiUrl}/admin/refreshToken`, {refreshToken : localStorage[ADMIN_LOCAL_STORAGE_REFRESH_TOKEN_NAME]});
                if(res.data.success){

                    localStorage.setItem(ADMIN_LOCAL_STORAGE_REFRESH_TOKEN_NAME, res.data.tokens.refreshToken);
                    localStorage.setItem(ADMIN_LOCAL_STORAGE_ACCESS_TOKEN_NAME, res.data.tokens.accessToken);
                    await loadUser('admin'); 
                    
                    setTimeout(()=>{
                        refreshToken();
                    }, 5 * 60 * 1000)
                }
            }
            refreshToken();
        }
    },[])

    useEffect(()=>{
        if(socket && user !== null) {
            socket.emit('joinUser', user)
        }
    },[socket, user])


    if(isWaiting)
    return (
        <Route 
            {...rest}
            render = {props => 
                isAuthenticated && isAdmin ? (
                   (<Component {...rest} {...props}/>)
                ) :
                (
                    <Redirect to='/admin/404'/>
                )
            }
        />
    )
    else return null
}

export default ProtectedRoute;