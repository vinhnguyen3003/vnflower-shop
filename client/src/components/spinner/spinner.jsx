import React from 'react';
import './stylesheets/spinner.scss';
import SpinnerImage from './images/flower.png';

function Spinner() {
    return (
        <div className="spinner-wrapper">
            <img src={SpinnerImage} alt="" />
        </div>
    );
}

export default Spinner;