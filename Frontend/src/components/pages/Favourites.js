import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Breadcrumb from '../layouts/Userbreadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/profile/Content';

class Favourites extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>My Account | Favourites</title>
                </MetaTags>
                <Header/>
                <Breadcrumb/>
                <Content/>
                
            </Fragment>
        );
    }
}

export default Favourites;