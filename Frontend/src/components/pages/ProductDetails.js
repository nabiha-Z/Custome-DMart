import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/productDetails/details';

class Listinggrid extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Custom D-Mart | Products</title>
                </MetaTags>
                <Header/>              
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Listinggrid;