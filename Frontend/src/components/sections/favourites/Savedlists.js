import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Button } from 'react-bootstrap';
import Sidebar from '../../layouts/Shopsidebar';
import listing from '../../../data/listings.json';
import classNames from 'classnames';
import Loader from '../../layouts/Loader';
import axios from 'axios';
import Cookies from 'js-cookie';
//import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { unFavProduct, addCart } from '../../../api';
import { message, Space } from 'antd';
import 'antd/dist/antd.css';

const gallerytip = (
    <Tooltip>
        Gallery
    </Tooltip>
);

const areatip = (
    <Tooltip>
        Square Feet
    </Tooltip>
);


const gridtip = (
    <Tooltip>
        Grid
    </Tooltip>
);

function Savedlists(props) {

    const [items, setitems] = useState(props.list);
    const [listItem, setListItem] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(6);
    const [loading, setloading] = useState(false);

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

        //    setloading(true);
        //     setTimeout(() => {

        //             setcurrentPage(number);
        //             setloading(false);

        //     }, 2000);

    }

    const onunFav = (item) => {

        const token = Cookies.get("token");
        const user = jwt_decode(token);
        const user_id = user.id;
        console.log("currentuser", user_id);
        console.log(user_id);

        unFavProduct({ item, user_id })

            .then(function (response) {
                console.log("response.data", response.data);
                if (response.data.message === true) {
                    message.success('Product unsaved');
                    props.setCheck(!props.check)
                    //window.location.reload(false);
                } else {
                    message.error(response.data.error);
                }

            })
            .catch(function (error) {

            });
    }

    const addtocart = async (product) => {
        await addCart({ uid: Cookies.get('id'), product, size:'M', color:'grey' })
            .then((response) => {
                console.log("res:", response.data)
                if (response.data.message === true) {
                    message.success("Added to Cart")
                }
            }).catch((err) => {
                console.log("err: ", err.message)
                message.error(err.message)
            })
    }

    const indexOfLastitem = currentPage * itemsPerPage;
    const indexOfFirstitem = indexOfLastitem - itemsPerPage;
    console.log("items", items[0].title);
    const currentitems = items.slice(indexOfFirstitem, indexOfLastitem);

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


    return (
        <div>
            <div className="row">
                {currentitems.map((item, i) => {
                    return <div className="col-md-5 col-sm-10" key={i}>
                        {/* <h1>item= {item.title}</h1> */}
                        <div className="listing" style={{ width: '80%' }}>
                            <div className="listing-thumbnail">
                                <Link to="/listing-details-v1"><img src={item.picture} alt="listing" style={{ width: 200, height: 200 }} /></Link>

                                <div className="listing-controls">
                                    <Link className="favorite" style={{ backgroundColor: '#E52E2E' }}><i className="far fa-heart" style={{ color: 'white' }} onClick={() => onunFav(item)} /></Link>
                                    {/* <Link to="#" className="compare"><i className="fas fa-sync-alt" /></Link> */}
                                </div>
                            </div>
                            <div className="listing-body">
                                {/* <div className="listing-author">
              <img src={process.env.PUBLIC_URL + "/" + item.authorimg} alt="author" />
              <div className="listing-author-body">
                  <p> <Link to="#">{item.authorname}</Link> </p>
                  <span className="listing-date">{item.postdate}</span>
              </div>
              <Dropdown className="options-dropdown">
                  <Dropdown.Toggle as={NavLink}><i className="fas fa-ellipsis-v" /></Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right">
                      <ul>
                          <li> <Link to="tel:+123456789"> <i className="fas fa-phone" /> Call Agent</Link> </li>
                          <li> <Link to="mailto:+123456789"> <i className="fas fa-envelope" /> Send Message</Link> </li>
                          <li> <Link to="/listing-details-v1"> <i className="fas fa-bookmark" /> Book Tour</Link> </li>
                      </ul>
                  </Dropdown.Menu>
              </Dropdown>
          </div> */}
                                <h5 className="listing-title"> <Link to="/listing-details-v1" title={item.title}>{item.title}</Link> </h5>
                                <span className="listing-price">{new Intl.NumberFormat().format((item.price).toFixed(2))}$ <span></span> </span>
                               


                                <div className="listing-gallery-wrapper">
                                    <button onClick={() => addtocart(item)} className="btn-custom btn-sm primary">Add to Cart</button>
                                    {/* <OverlayTrigger overlay={gallerytip}>
                                        <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
                                    </OverlayTrigger> */}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                {/* Listing End */}

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

    );

}


export default Savedlists;