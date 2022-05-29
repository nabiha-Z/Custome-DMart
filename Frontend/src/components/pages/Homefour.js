import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Footer from '../layouts/Footerthree';
import Content from '../sections/homefour/Content';

class Homefour extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Custom D-Mart | Homepage</title>
                </MetaTags>
                <Content/>
               
            </Fragment>
        );
    }
}

export default Homefour;