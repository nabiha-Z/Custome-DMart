import React, { Component, Fragment } from 'react';

import About from '../homefour/About';
import Counter from './Counter';
import Video from './Video';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <About />
                <Counter />
                <div className="section pb-0">
                  
                </div>
                <Video />
               
            </Fragment>
        );
    }
}

export default Content;