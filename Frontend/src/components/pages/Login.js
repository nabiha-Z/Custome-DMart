import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Content from '../sections/login/Content';

class Login extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Custom D-Mart | Login</title>
                </MetaTags>
                <Header/>
                <Content/>
            </Fragment>
        );
    }
}

export default Login;