import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/authContext';
import AvatarImage from './../../images/woman.png';


function NavRightAvt() {
    const history = useHistory();
    const [userMenuStatus, setUserMenuStatus] = useState(false);

    const {authState: {user: {userName}}, logoutUser} = useContext(AuthContext);

    const logout = () => {
        logoutUser();
        history.push('/admin/login');
    }
    return (
        <li className="nav-item avt-wrapper">
            <div className="avt dropdown">
                <img 
                    src={AvatarImage}
                    alt=""
                    className="dropdown-toggle"
                    data-toggle="user-menu"
                    onClick={()=>setUserMenuStatus(!userMenuStatus)}
                />
                <ul id="user-menu" className={`dropdown-menu ${userMenuStatus ? 'dropdown-expand' : ''}`}>
                    <li className="dropdown-menu-item">
                        <a href="#vv" className="dropdown-menu-link">
                            <div>
                                <i className="fas fa-user-tie" />
                            </div>
                            <span>Tài khoản</span>
                        </a>
                    </li>
                    <li className="dropdown-menu-item">
                        <a href="#vv" className="dropdown-menu-link">
                            <div>
                                <i className="fas fa-cog" />
                            </div>
                            <span>Thiết lập</span>
                        </a>
                    </li>
                    <li className="dropdown-menu-item">
                        <a href="#vv" className="dropdown-menu-link">
                            <div>
                                <i className="far fa-credit-card" />
                            </div>
                            <span>Thanh toán</span>
                        </a>
                    </li>
                    <li className="dropdown-menu-item" onClick={logout}>
                        <div href="#vv" className="dropdown-menu-link">
                            <div>
                                <i className="fas fa-sign-out-alt" />
                            </div>
                            <span>Đăng xuất</span>
                        </div>
                    </li>
                </ul>
            </div>
        </li>
    );
}

export default NavRightAvt;