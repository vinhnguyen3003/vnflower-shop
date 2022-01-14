import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Message from '../message/message';

function WrapperRoute({render: Component, firstNotiStatus, ...rest}) {
    return (
        <Route 
            {...rest}
            render={()=>(
                <div className="app">
                    <Header firstNotiStatus={firstNotiStatus}/>
                    <Component />
                    <Footer />
                    <Message />
                </div>
            )}
        />
    )
}

export default WrapperRoute;