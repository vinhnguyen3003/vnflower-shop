import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import axios from 'axios';
import { apiUrl, 
    LOCAL_STORAGE_ACCESS_TOKEN_NAME, 
    LOCAL_STORAGE_REFRESH_TOKEN_NAME, SET_AUTH
} from "./constants";
import setAuthToken from "../utils/setAuthToken";


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    
    const [authState, dispatch] = useReducer(authReducer, {
        isWaiting: false,
        isAuthenticated: false,
        isAdmin: false,
        user: null
    })

    const loadUser = async (type) => {
        if(localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]);
        }
        try {
            const response = await axios.get(`${apiUrl}/admin`);
            if (response.data.success) {

                localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_NAME, response.data.user.refreshToken);
                
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true, 
                        isAdmin: response.data.user.userRole === 1 ? true : false,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: SET_AUTH,
                payload: {
                    isAuthenticated: false,
                    isAdmin: false, 
                    user: null
                }
            })
        }
    }
    useEffect(() => {
        loadUser();
    },[])
    //Login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/admin/login`, userForm);
            if (response.data.success){
                localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, response.data.accessToken);
            }

            await loadUser();

            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }
    const loginUserWith = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/admin/login-with`, userForm);
            if (response.data.success){
                localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, response.data.accessToken);
            }
            await loadUser();
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }
    //Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_NAME);
        dispatch({
            type: SET_AUTH,
            payload: {isAuthenticated: false, user: null}
        })
    }

    //Context Data
    const authContextData = {
        loginUser,
        loginUserWith,
        loadUser,
        authState, 
        logoutUser
    }
    //Return Provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider;