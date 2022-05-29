import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Content from '../sections/forgotpassword/Content';

class Forgotpassword extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Custom D-Mart | Forgot Password</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Content/>
            </Fragment>
        );
    }
}

export default Forgotpassword;