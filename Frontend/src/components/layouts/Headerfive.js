import React, { Fragment } from 'react';
import Menu from '../layouts/Menu';
import Mobilemenu from '../layouts/Mobilemenu';
import HeaderComponent from '../../helper/Navigationhelper';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';
class Headerfive extends HeaderComponent {
    render() {
        return (
            <Fragment>
                {/* Aside (Mobile Navigation) */}
                <aside className={classNames("main-aside", { "open": this.state.navtoggle })}>
                    <div className="aside-title">
                        <div className="aside-controls aside-trigger">
                            <h4>Menu</h4>
                            <div className="close-btn close-dark" onClick={this.navtoggleClass} >
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                    <Mobilemenu />
                </aside>
                <div className="aside-overlay aside-trigger" onClick={this.navtoggleClass} />
                {/* Header Start */}
                <header className="main-header header-fw">
                    {/* Top Header Start */}
                    <div className="top-header">
                        <div className="top-header-inner">
                          
                            <ul className="top-header-nav">
                                <li> <Link to="/login"> Login</Link> </li>
                                <li>or</li>
                                <li> <Link to="/register"> Signup</Link> </li>
                            </ul>
                        </div>
                    </div>
                    {/* Top Header End */}
                    <nav className="navbar">
                        {/* Menu */}
                        <Menu color="black"/>
                        <div className="header-controls">
                          
                            {/* Toggler */}
                            <div className="aside-toggler aside-trigger" onClick={this.navtoggleClass}>
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </nav>
                </header>
                {/* Header End */}
            </Fragment>
        );
    }
}

export default Headerfive;