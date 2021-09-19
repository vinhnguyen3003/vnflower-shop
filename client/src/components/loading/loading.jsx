import React from 'react';
import './stylesheets/loading.scss';

function Loading(type) {
    return (
        <div className={`lds-dual-ring ${type}`}></div>
    )
}

export default Loading
