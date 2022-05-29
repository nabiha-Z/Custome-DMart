import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';
import Sidebar from '../../layouts/Shopsidebar';
import listing from '../../../data/listings.json';
import classNames from 'classnames';
import Loader from '../../layouts/Loader';
import axios from 'axios';
import {categoryList, favourite} from '../../../api/index';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
// import 'antd/dist/antd.css';
// import { message, Space } from 'antd';




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
    const [items, setitems] = useState([]);
    const routerHistory = useHistory();
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(6);
    const [loading, setloading] = useState(false);
    //const [ctg,setcategory]=useState([]); 
    let { category } = useParams();
    console.log(category);

    async function place() {
        console.log("here");
        console.log(category);
        await categoryList({ category })
            .then(function (response) {
                setitems(response.data);
                console.log("in", response.data)

            })
            .catch(function (error) {
                console.log(error.message);

            });

        // setcategory();

    }

    useEffect(() => {
        place();
    }, []);

    const handleClick = (number) => {

        console.log(number);
        setloading(true);

        setTimeout(() => {

            setcurrentPage(number);
            setloading(false);

        }, 2000);

    }
    const onFav = (item,e) => {
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
                        // message.success('Saved');
                    } else {
                        // message.error('Already in save items');
                    }


                })
                .catch(function (error) {

                });
        }
    }


    const indexOfLastitem = currentPage * itemsPerPage;
    const indexOfFirstitem = indexOfLastitem - itemsPerPage;
    console.log("items", items);
    const currentitems = items.slice(indexOfFirstitem, indexOfLastitem);

    const renderitems = currentitems.map((item, i) => {
        return <div key={i} className="col-md-6">
            <div className="listing">
                <div className="listing-thumbnail">
                    <Link to="/listing-details-v1"><img src={item.picture} alt="listing" style={{ width: 300, height: 250 }} /></Link>
                    <div className="listing-badges">
                        {
                            item.star === true ? <span className="listing-badge featured"> <i className="fas fa-star" /> </span> : ''
                        }
                        {
                            item.sale === true ? <span className="listing-badge sale">On Sale</span> : ''
                        }
                        {
                            item.pending === true ? <span className="listing-badge pending"> Pending</span> : ''
                        }
                        {
                            item.rental === true ? <span className="listing-badge rent"> Rental</span> : ''
                        }
                    </div>
                    <div className="listing-controls">
                        <Link to="#" className="favorite"><i className="far fa-heart"  onClick={(e) => onFav(item,e)}/></Link>
                        {/* <Link to="#" className="compare"><i className="fas fa-sync-alt" /></Link> */}
                    </div>
                </div>
                <div className="listing-body">

                    <h5 className="listing-title"> <Link to="#" title={item.title}>{item.title}</Link> </h5>
                    <span className="listing-price">{new Intl.NumberFormat().format((item.price).toFixed(2))}$ <span></span> </span>
                    <p className="listing-text">{item.description}</p>
                    <div className="acr-listing-icons">

                        <OverlayTrigger overlay={areatip}>
                            <div className="acr-listing-icon">
                                <i className="flaticon-ruler" />
                                <span className="acr-listing-icon-value">{item.area}</span>
                                <span className="acr-listing-icon-value">&nbsp;{item.unit}</span>
                            </div>
                        </OverlayTrigger>
                    </div>
                    <div className="listing-gallery-wrapper">
                        <button onClick={(e) => showDetails(e, item)} className="btn-custom btn-sm secondary">View Details</button>
                        {/* <OverlayTrigger overlay={gallerytip}>
                                <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
                            </OverlayTrigger> */}
                    </div>
                </div>
            </div>
        </div>
    });

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


    const showDetails = (e, item) => {

        e.preventDefault();
        console.log("listing item: ", item.title);
        routerHistory.push({
            pathname: "/listing-details-v1",
            state: { listing: item }
        });
    }

    return (
        <div className="section pagination-content">
            <div className="container">
                <div className="row">

                    <div className="col-lg-4">
                        <Sidebar />
                    </div>

                    <div className="col-lg-8">

                        <div className="acr-global-listing-controls">
                            <div className="acr-listing-active-filters">
                                <Link to="#">
                                    <div className="close-btn close-dark">
                                        <span />
                                        <span />
                                    </div>
                                    Any Status
                                </Link>
                                <Link to="#">
                                    <div className="close-btn close-dark">
                                        <span />
                                        <span />
                                    </div>
                                    West Roxbury, MA
                                </Link>
                                <Link to="#">
                                    <div className="close-btn close-dark">
                                        <span />
                                        <span />
                                    </div>
                                    House
                                </Link>
                            </div>
                            <div className="acr-toggle-views">
                                <OverlayTrigger placement="top" overlay={gridtip}>
                                    <Link to="/listing-grid" className="active"><i className="fas fa-th-large" /></Link>
                                </OverlayTrigger>

                            </div>
                        </div>

                        <div className="row">

                            {loading === false ? renderitems : <Loader />}

                        </div>

                        {pageNumbers.length > 1 ?
                            <ul className="pagination">

                                {pageNumbers.length > 1 && currentPage !== 1 ?
                                    <li className="page-item">
                                        <Link className="page-link" to="#" data-page={currentPage - 1} onClick={() => handleClick}>
                                            <i className="fas fa-chevron-left" />
                                        </Link>
                                    </li>
                                    : ''}

                                {renderPagination}

                                {pageNumbers.length > 1 && currentPage !== pageNumbers.length ? <li className="page-item">
                                    <Link className="page-link" to="#" data-page={parseInt(currentPage + 1)} onClick={() => handleClick}>
                                        <i className="fas fa-chevron-right" />
                                    </Link>
                                </li>
                                    : ''}

                            </ul> : ''}

                    </div>

                </div>
            </div>
        </div>
    );

}

export default Content;