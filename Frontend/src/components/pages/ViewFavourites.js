import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Userbreadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/favourites/Content';

class ViewFavourites extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Custom D-Mart | Saved</title>
                </MetaTags>
                <Header/>
                <Breadcrumb />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default ViewFavourites;