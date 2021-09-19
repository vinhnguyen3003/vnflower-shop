import React from 'react';
// import PropTypes from 'prop-types';

NavSearch.propTypes = {
    
};

function NavSearch(props) {
    return (
        <form className="navbar-search">
            <input
                type="text"
                name="Search"
                className="navbar-search-input"
                placeholder="Bạn cần tìm gì?"
            />
            <i className="fas fa-search" />
        </form>
    );
}

export default NavSearch;