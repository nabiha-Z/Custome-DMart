import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Breadcrumb from '../layouts/Userbreadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/Measuremenets/Content';

class Measuremenets extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>My Account | Measuremenets</title>
                </MetaTags>
                <Header/>
                <Breadcrumb/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Measuremenets;