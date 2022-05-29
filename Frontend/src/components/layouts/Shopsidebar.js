import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import dropDown from './drop-down.css';
import { Collapse } from 'react-bootstrap';


const colors = ["green", "blue", "red", "brown", "purple"];
const pricelist = ["500-1000", "1000-2000", "2000-3000", "3000-5000"]
const categories = ["women", "men", "shirts", "jeans", "kurti", "dress"]
function Shopsidebar() {

    const [open, setopen] = useState(true);
    const history = useHistory();
    const [color, setcolor] = useState([]);
    const [categ, setcateg] = useState();
    const [price, setprice] = useState();

    return(
        <div className="sidebar sidebar-left">
            <div className="sidebar-widget">
                <div className="acr-collapse-trigger acr-custom-chevron-wrapper" onClick={() => setopen(!open)}>
                    <h5>Filter Products</h5>
                    <div className="acr-custom-chevron">
                        <span />
                        <span />
                    </div>
                </div>
                <Collapse in={open}>
                    <div className="acr-collapsable">
                        <div className="acr-filter-form">
                            <form onSubmit= {(e)=> e.preventDefault()}>
                               

                                <div className="drop-down">
                                    <label>Category: </label>
                                    <select className="form-control" name="location" value={categ} onChange={(e) => setcateg(e.target.value)}>

                                        {categories.map((item, i) => {

                                            return <option key={i} value={item}>{item}</option>
                                        })}

                                    </select>
                                </div>

                                <div className="drop-down">
                                    <label>Color: </label>
                                    <input type="text" className="form-control form-control-light" placeholder="Color" name="color" style={{margin:5, marginTop:-7}} value={color} onChange={(e) => setcolor(e.target.value)} />
                                    {/* <select className="form-control" name="location" value={color} onChange={(e) => setcolor(e.target.value)} required>

                                        {colors.map((item, i) => {

                                            return <option key={i} value={item}>{item}</option>
                                        })}

                                    </select> */}
                                </div>
                                <div className="drop-down">
                                    <label>Price: </label>
                                    <input type="text" className="form-control form-control-light" placeholder="Price" name="price" style={{margin:5, marginTop:-7}} value={price} onChange={(e) => setprice(e.target.value)} />
                                </div>
                                <button className="btn-custom secondary btn-block" name="button">Search Products</button>
                            </form>
                        </div>
                    </div>
                </Collapse>
            </div>
            </div>
    );
           
}


export default Shopsidebar;