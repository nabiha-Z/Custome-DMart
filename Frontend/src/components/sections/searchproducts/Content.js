import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';
import Sidebar from '../../layouts/Shopsidebar';
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { useLocation, useHistory } from "react-router-dom";
import { favourite } from '../../../api';
import jwt_decode from "jwt-decode";


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

export default function Content() {

    const location = useLocation();
    const routerHistory = useHistory();
    console.log(location.state);
    const [items, setitems] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(6);
    const [loading, setloading] = useState(false);
    const [products, setProducts] = useState(location.state.products);
    const [searchedList, setsearchedList] = useState([]);

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
    const onFav = (item, e) => {
        e.preventDefault();

        if (Cookies.get("token") != undefined) {
            const token = Cookies.get("token");
            const user = jwt_decode(token);
            const user_id = user.id;
            console.log("currentuser");
            console.log(user_id);

            favourite({ item, user_id })

                .then(function (response) {
                    console.log("onFav= ", response.data)
                    if (response.data.message === true) {
                        alert("Saved");
                    } else {
                        alert("Already in saved items");
                    }


                })
                .catch(function (error) {

                });
        }
    }
    // const showDetails = (item) => {

    //     console.log("listing item: ", item.title);
    //     // routerHistory.push({
    //     //     pathname: "/listing-details-v1",
    //     //     state: { listing: item }
    //     // });

    // }

    const showDetails = (item) => {

        console.log("product item: ", item.title);
        routerHistory.push({
            pathname: "/details",
            state: { product: item }
        });

    }


    const RenderItem = ({ list }) => {
        console.log("list length= ", list.length);
        return (
            list.map((item, i) => {

                return (<div key={i} className="col-md-4 col-sm-8" style={{ justifyContent: 'center' }}>
                    <div className="listing">
                        {console.log("TTitle= ", item.title)}
                        <div className="listing-thumbnail">
                            <Link to="/listing-details-v1"><img src={item.picture} alt="listing" style={{ width: 300, height: 300 }} /></Link>
                            
                            <div className="listing-controls">
                                <Link className="favorite"><i className="far fa-heart" onClick={(e) => onFav(item, e)} /></Link>
                                <Link to="#" className="compare"><i className="fas fa-camera" /></Link>
                            </div>
                        </div>
                        <div className="listing-body">

                            <h5 className="listing-title"> <Link to="/listing-details-v1" title={item.title}>{item.title}</Link> </h5>
                            
                            <span className="listing-price">{new Intl.NumberFormat().format((item.price).toFixed(2))} /-<span></span> </span>
                            <p className="listing-text">{item.description}</p>
                            <div className="listing-gallery-wrapper">
                            <button onClick={() => showDetails(item)} className="btn-custom btn-sm secondary" style={{marginRight:10}}>View Details</button>
                                {/* <OverlayTrigger overlay={gallerytip}>
                                    <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
                                </OverlayTrigger> */}
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
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
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



    const EmptySearch = () => {
        return (
            <div className="container" style={{ textAlign: 'center' }}>
                <h4>No Products found</h4>
            </div>
        );
    }

    return (
        <div className="section pagination-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h3 style={{ textAlign: 'center', marginBottom: 30, marginTop:50 }}>Searched Results</h3>
                        <div className="row">
                            {/* Listing Start */}
                            
                            {products.length !== 0 ? (<RenderItem list={products} />) : (<EmptySearch />)}

                            {/* Listing End */}
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
                </div>
            </div>
        </div>

    )
}
