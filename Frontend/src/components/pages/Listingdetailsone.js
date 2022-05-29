import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import HeaderFour from '../layouts/Headerfour';
import Footer from '../layouts/Footer';
import Cookies from 'js-cookie';
import Content from '../sections/listing-details-v1/Content';

class Listingdetailsone extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title></title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                {Cookies.get('mail') === undefined ? <HeaderFour/> : <Header/>}
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Listingdetailsone;