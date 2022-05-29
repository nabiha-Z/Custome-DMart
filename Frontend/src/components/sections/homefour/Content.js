import React, { Component, Fragment, useState, useEffect } from 'react';
import Banner from './Banner';
import Categories from './Categories';
import CompanySlider from '../../layouts/CompanySlider';
import LatestProducts from './Latest';
import Cookies from 'js-cookie';
import 'antd/dist/antd.css';
import { message } from 'antd';
import RecommendationSlider from './RecommendationSlider';



function Content (){

    const [check, setCheck] = useState(false);
    

        return (
            <Fragment>
                <Banner />
             
                <div className="section section-padding pt-0">
                
                </div>
                <div className="acr-footer footer-2">
                    {/* <App /> */}
                </div>
                <RecommendationSlider/>
                <LatestProducts check={check} setCheck={setCheck}/>
                {/* <Latestblog/> */}
               
            </Fragment>
        );
    
}

export default Content;