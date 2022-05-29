import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Button } from 'react-bootstrap';
import Sidebar from '../../layouts/Shopsidebar';
import Bounce from "react-activity/dist/Bounce";
import "react-activity/dist/Bounce.css";
import classNames from 'classnames';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import 'antd/dist/antd.css';
import './style.css';
import { message } from 'antd';
import { fetchProducts, favourite, addCart } from '../../../api/index';



const gallerytip = (
    <Tooltip>
        Gallery
    </Tooltip>
);
const gridtip = (
    <Tooltip>
        Grid
    </Tooltip>
);
const listtip = (
    <Tooltip>
        List
    </Tooltip>
);
const maptip = (
    <Tooltip>
        Map
    </Tooltip>
);
const bedstip = (
    <Tooltip>
        Beds
    </Tooltip>
);
const bathstip = (
    <Tooltip>
        Bathrooms
    </Tooltip>
);
const areatip = (
    <Tooltip>
        Square Feet
    </Tooltip>
);

function Content() {

    const routerHistory = useHistory();
    const [products, setProducts] = useState([
        { title: "Floral Tshirt", picture: '/images/products/f6.jpg', price: '1000', color:'#E28120' },
        { title: "Laptop Cover", picture: '/images/products/laptop3.jpg', price: '2000' , color:'#3A3836'},
        { title: "Cutomized Cup", picture: '/images/products/cup1.jpg', price: '1500', color:'#E7E3E1'},
        { title: "Floral Tshirt", picture: '/images/products/f3.jpg', price: '1000', color:'#DB6F1B' },
        { title: "Coffee Mug", picture: '/images/products/cup4.jpg', price: '1200',color:'#C45A40' },
        { title: "Floral Tshirt", picture: '/images/products/f1.jpg', price: '1500',color:'#DFC928' }
    ]);
    const [nonfeatured, setnonfeatured] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [productsPerPage, setproductsPerPage] = useState(6);
    const [loading, setloading] = useState(false);





    const LoadingData = () => {
        return (
            <>
                <div className="container" style={{ textAlign: "center", marginTop: "50%", color: "#59B0CD", fontSize: "80" }}>
                    <Bounce size='20' />
                </div>
            </>
        );
    };



    const handleClick = (number) => {
        // var paginationContent = event.target.closest('.pagination-content');

        // if (paginationContent) {
        //     paginationContent.scrollIntoView();
        // }

        setloading(true);
        setTimeout(() => {

            setcurrentPage(number);
            setloading(false);


        }, 2000);

    }

    const onFav = async (item, e) => {
        e.preventDefault();
        console.log("onFav");
        if (Cookies.get("token") != undefined) {
            const token = Cookies.get("token");

            const user = jwt_decode(token);
            const user_id = user.id;
            console.log(user_id);

            await favourite({ item, user_id })

                .then(function (response) {
                    console.log("onFav= ", response.data)
                    if (response.data.message === true) {
                        message.success("Saved")
                    } else {
                        message.error("Already in saved products");
                    }
                })
                .catch(function (error) {

                });
        } else {
            message.error("You need to login first!");
        }
    }

    const showDetails = (item) => {

        console.log("product item: ", item.title);
        routerHistory.push({
            pathname: "/details",
            state: { product: item }
        });

    }

    // const { products, currentPage, productsPerPage } = this.state;

    // const { products, currentPage, productsPerPage } = this.state;

    // Logic for displaying products
    const indexOfLastitem = currentPage * productsPerPage;
    const indexOfFirstitem = indexOfLastitem - productsPerPage;


    const RenderItem = ({ list }) => {
        //console.log("list length= ", list.length);
        const currentproducts = list.slice(indexOfFirstitem, indexOfLastitem);


        return (
            currentproducts.map((item, i) => {

                return (<div key={i} className="col-lg-4 col-md-6 col-sm-10" style={{ justifyContent: 'center' }}>
                    <div className="listing">
                        <div className="listing-thumbnail">
                            <button onClick={() => showDetails(item)} className="image-container"><img src={item.picture} alt="product" style={{ width: 280, height: 320 }} /></button>
   
                        </div>
                        <div className="listing-body">
                            <h5 className="listing-title"> <Link to="#" title={item.title}>{item.title}</Link> </h5>
                            <p className="listing-text">{item.location}</p>
                            <span className="listing-price">{item.price} RS/-</span>

                            <div className="listing-gallery-wrapper" style={{ justifyContent: 'flex-end', marginTop: 20 }}>

                                <button onClick={() => showDetails(item)} className="btn-custom btn-sm secondary" style={{ marginRight: 10, backgroundColor: '#D9813D'}}>View Details</button>
                              
                            </div>
                        </div>
                    </div>
                </div>

                )

            })
        );
    }
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    const renderPagination = pageNumbers.map(number => {
        const activeCondition = currentPage === number ? 'active' : ''
        return (
            <Fragment key={number}>
                {pageNumbers.length > 1 ? <li className={classNames("page-item", { "active": activeCondition })}>
                    <Link className="page-link" to="#" data-page={number} onClick={() => handleClick(number)}>{number}</Link>
                </li> : ''}
            </Fragment>
        );
    });

    return (
        <div className="section pagination-content">
            <div className="container">
                <div className="category-buttons">
                    <Link className="btn active" to="#" style={{backgroundColor:'#D86833', color:'white'}}>All</Link>
                    <Link className="btn" to="#">Shirts</Link>
                    <Link className="btn" to="#">Laptop Covers</Link>
                    <Link className="btn" to="#">Cups</Link>
                </div>
                <div className="row">
                    <div className="col-lg-12">

                        {/* Controls End */}
                        <div className="row" >
                            {/* Listing Start */}
                            {loading === false ?
                                <>
                                    {products.length != 0 && <RenderItem list={products} />}
                                    
                                </>

                                : <LoadingData />}

                        </div>
                        {/* Pagination Start */}
                        {pageNumbers.length > 1 ?
                            <ul className="pagination">
                                {/* Prev */}
                                {/* to show previous, we need to be on the 2nd or more page */}
                                {pageNumbers.length > 1 && currentPage !== 1 ?
                                    <li className="page-item">
                                        <Link className="page-link" to="#" data-page={currentPage - 1} onClick={() => handleClick}>
                                            <i className="fas fa-chevron-left" />
                                        </Link>
                                    </li>
                                    : ''}
                                {/* Prev */}
                                {renderPagination}
                                {/* Next */}
                                {/* to show next, we should not be on the last page */}
                                {pageNumbers.length > 1 && currentPage !== pageNumbers.length ? <li className="page-item">
                                    <Link className="page-link" to="#" data-page={parseInt(currentPage + 1)} onClick={() => handleClick}>
                                        <i className="fas fa-chevron-right" />
                                    </Link>
                                </li>
                                    : ''}
                                {/* Next */}
                            </ul> : ''}
                        {/* Pagination End */}
                    </div>
                    {/* Posts End */}
                </div>
            </div>
        </div>
    );

}

export default Content;