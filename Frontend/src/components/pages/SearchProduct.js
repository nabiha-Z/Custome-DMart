import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Userbreadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/searchproducts/Content';

class Profile extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Custom D-Mart | Search</title>
                </MetaTags>
                <Header/>
                {/* <Breadcrumb/> */}
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Profile;