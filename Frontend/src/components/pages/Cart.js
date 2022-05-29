import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Content from '../sections/cart/content';

class Cart extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Custom D-Mart | Cart</title>
                </MetaTags>
                <Header/>
                {/* <Breadcrumb/> */}
                <Content/>
     
            </Fragment>
        );
    }
}

export default Cart;