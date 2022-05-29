import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Content from '../sections/resetpassword/Content';

class Forgotpassword extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Custom D-Mart | Reset Password</title>
                   
                </MetaTags>
                <Header/>
                <Content/>
            </Fragment>
        );
    }
}

export default Forgotpassword;