import React from 'react';
import NavRightNoti from './nav-right-noti';
import NavRightAvt from './nav-right-avt';
import NavRightMess from './nav-right-mess';
// import PropTypes from 'prop-types';

NavRight.propTypes = {
    
};

function NavRight(props) {
    return (
        <div className="navbar-nav nav-right">
            <NavRightMess />
            <NavRightNoti />
            <NavRightAvt />
        </div>
    );
}

export default NavRight;