import React, { Fragment, useState, useEffect } from 'react';
import Menu from '../layouts/Menu';
import Mobilemenu from '../layouts/Mobilemenu';
import HeaderComponent from '../../helper/Navigationhelper';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { loginuser } from '../../api';
import { useHistory } from 'react-router';
import './headerCart.css';


const Header = () => {
    const stickyheader = 'sticky';
    const [user, setuser] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [orders, setOrders] = useState([]);
    const [img, setImg] = useState("");
    const [navtoggle, setnavtoggle] = useState(false);
    // console.log("user.limit");
    // console.log(user.limit);

    let history = useHistory();

    const currentuser = async () => {
        await loginuser({
            token: Cookies.get('token')
        })
            .then(function (response) {
                // console.log("header rewsponse", response);
                if (response.data.message == "true") {
                    try {
                        setuser(response.data.user);
                        // console.log("limit=", response.data.user.limit)
                    } catch (e) {
                        return null;
                    }
                } else if (response.data.message === "false") {

                }

            })
            .catch(function (error) {

            });
    }

    

    useEffect(() => {
        currentuser()
    }, [user]);

    const navtoggleClass = () => {
        setnavtoggle(!navtoggle)
    }



    return (
        <Fragment>
            {/* Aside (Mobile Navigation) */}
            <aside className={classNames("main-aside", { "open": navtoggle })}>
                <div className="aside-title">
                    <div className="aside-controls aside-trigger">
                        <h4>Menu</h4>
                        <div className="close-btn close-dark" onClick={() => navtoggleClass()} >
                            <span />
                            <span />
                        </div>
                    </div>
                </div>
                <Mobilemenu />
            </aside>
            <div className="aside-overlay aside-trigger" onClick={() => navtoggleClass()} />
            {/* Header Start */}
            <header className={`main-header header-fw can-sticky header-1 ${stickyheader}`}>
                {/* Top Header Start */}
                <div className="top-header">
                    <div className="top-header-inner">

                        <ul className="top-header-nav">
                            {Cookies.get('mail') === undefined ? <><li> <Link to="/login"> Login</Link> </li>
                                <li>or</li>
                                <li> <Link to="/register"> Signup</Link> </li></> : ""}

                        </ul>
                    </div>
                </div>
                {/* Top Header End */}
                <nav className="navbar">
                    {/* Menu */}
                    <Menu />
                    <div className="header-controls">
                        <ul className="header-controls-inner d-none d-lg-flex">
                            <Link to="#" onClick={(e) => {
                                e.preventDefault()
                                setModalOpen(!modalOpen)
                            }}><i /> Order history</Link>
                        </ul>
                        {/* Toggler */}
                        <div className="aside-toggler aside-trigger" onClick={() => navtoggleClass()}>
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                </nav>
            </header>
            {/* Header End */}

            {modalOpen ? (<>
                <div className="modalWrapper">
                    <div className="modal">
                        <h4>Order History</h4>
                        <button onClick={() => setModalOpen(false)} className='btnClose'> X </button>
                        <table id="table" className="table v-middle">
                            <thead>
                                <tr className="bg-light">
                                    <th scope="col">OrderNo</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item) => (
                                    <>
                                        <tr>
                                            <td>{item.orderNo}</td>
                                            <td>Rs.{item.totalamount}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    </>

                                ))}
                            </tbody>
                        </table>
                    </div>

                </div></>) : ""}
        </Fragment>
    );
}

export default Header;