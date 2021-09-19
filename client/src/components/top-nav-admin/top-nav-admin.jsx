import React from 'react';
import './stylesheets/top-nav-admin.scss';
import NavLeft from './components/nav-left/nav-left';
import NavSearch from './components/nav-search/nav-search';
import NavRight from './components/nav-right/nav-right';
//import PropTypes from 'prop-types';

TopNavAdmin.propTypes = {};

function TopNavAdmin(props) {
    return (
        <div className="navbar">
            <NavLeft />
            <NavSearch />
            <NavRight />
        </div>
    );
}

export default TopNavAdmin;