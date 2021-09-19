import React, { useState, useContext } from 'react';
import './stylesheets/login-admin.scss';
import LogoImage from './images/logo-edit.png';
import {AuthContext} from './../../contexts/authContext';
import { useHistory } from 'react-router-dom';

function LoginAdmin() {
    //const {authState: { isAuthenticated }} = useContext(AuthContext);
    
    const [loginForm, setLoginForm] = useState({
        loginName: '',
        password: ''
    })
    const [messageRes, setMessageRes] = useState('');

    const {loginName, password} = loginForm;

    const handleChange = (e) => {
        if(messageRes !== '') setMessageRes('');
        let {name, value} = e.target;
        setLoginForm({...loginForm, [name]: value});
    }
    const {loginUser} = useContext(AuthContext);

    const history = useHistory();
    const login = async e => {
        e.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if(loginData.success) {
                history.push('/admin')
            }else{
                setMessageRes(loginData.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div >
            <title>Admin | Đăng nhập</title>
            <div className="login-admin-wrapper">
                <div className="login-admin-form">
                    <div className="login-form-logo">
                        <img src={LogoImage} alt=""/>
                    </div>
                    <form onSubmit={login}>
                        <div className="login-form-group">
                            <input type="text" placeholder="Tên đăng nhập" 
                            name="loginName" value={loginName} onChange={handleChange}/>
                        </div>
                        <div className="login-form-group">
                            <input type="password" placeholder="Mật khẩu"
                            name="password" value={password} onChange={handleChange}/>
                        </div>
                        <div className="login-form-message">
                            {messageRes}
                        </div>
                        <div className="login-form-group --remember">
                            {/* <i class="far fa-check-square"></i> */}
                            <span><i className="fas fa-check-square"></i></span>
                            <span>Ghi nhớ</span>
                        </div>
                        <div className="login-form-group --btn-login">
                            <button className="btn btn--green" type="submit">Đăng nhập</button>
                        </div>
                    </form>
                    <div className="login-admin-forget">
                        Quên mật khẩu ?
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;