import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import './menu.css'
class Menu extends Component {

 
  render() {
    

    return (
      <Fragment>
        {/* Logo */}
        {/* <Link className="navbar-brand" to="/">
          
          <img
            src={ "/logo2.png"}
            alt="logo"
            style={{width:'100%', height:'auto'}}
          />
        </Link> */}
        {/* Menu */}
        <ul className="navbar-nav">
          <li className="menu-item menu-item-has-children">
            <Link to="/" className="links" >Home</Link>
          </li>
          <li className="menu-item menu-item-has-children" >
            <Link to="/products" className="links">Products</Link>
          </li>
          
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/about" className="links" >About Us</Link>
          </li>
          */}
        
          <li className="menu-item menu-item-has-children">
            {Cookies.get("id") === undefined ? (
              ""
            ) : (
              <Link to="/profile" className="links" >My Account</Link>
            )}

          
          </li>
        <li> <h2 style={{marginLeft:Cookies.get("id") === undefined ?250:150, fontSize:30, fontWeight:'bold', marginTop:10}}>Custom D-Mart</h2></li>
        </ul>
        
      </Fragment>
    );
  }
}

export default Menu;
