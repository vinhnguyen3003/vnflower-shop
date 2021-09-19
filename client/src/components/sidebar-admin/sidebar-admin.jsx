import React from 'react';
import { Link } from 'react-router-dom';
import sidebar_data from './../../assets/json-data/sidebar.json';
// import PropTypes from 'prop-types';

SidebarAdmin.propTypes = {
    
};

function SidebarAdmin(props) {
    const sidebarActive = sidebar_data.findIndex(sidebarItem => sidebarItem.route === props.location.pathname)

    let sidebarItemList = sidebar_data.map((sidebarItem, index)=>{
        return <li 
                    className="sidebar-nav-item" 
                    key={index}
                >
                    <Link 
                        to={`${sidebarItem.route}`} 
                        className={`sidebar-nav-link ${sidebarActive === index ? 'active' : ''}`}
                    >
                        <div>
                            <i className={sidebarItem.icon} />
                        </div>
                        <span>{sidebarItem.display_name}</span>
                    </Link>
                </li>
    })
    return (
        <div className="sidebar">
            <ul className="sidebar-nav">
                {sidebarItemList}                
            </ul>
        </div>
    );
}

export default SidebarAdmin;