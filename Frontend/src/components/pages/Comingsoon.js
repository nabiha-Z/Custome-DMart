import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Content from '../sections/comingsoon/Content';

class Comingsoon extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Custom D-Mart| Coming Soon</title>
                </MetaTags>
                <Header/>
                <Content/>
            </Fragment>
        );
    }
}

export default Comingsoon;