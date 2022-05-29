import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './category.css';
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import { useHistory } from 'react-router';
import { searchCategory, search } from '../../../api';
import { FiSearch } from 'react-icons/fi';
function Categories() {

    const [categories, setCategories] = useState([]);
    const [searchField, setSeacrhField] = useState();

    const CategoryConatiner = (props) => {
        var path = "/images/" + props.img + ".png";

        return (
            <>
                <div className='category-block'>
                    <Link onClick={() => searchCat(props.title)}>
                        <div className='category-circle'>
                            <img src={path} className='image-icon' />
                        </div>
                    </Link>
                    <p>{props.title}</p>
                </div></>
        )
    }

    const history = useHistory();

    const searchCat = async (category) => {
       
        await searchCategory({ category })
            .then((response) => {
                if (response.data.message === true) {
                    history.push({ pathname: '/searchProducts', state: { products: response.data.products } })
                }

            }).catch((err) => {
                console.log("error:", err.message)
            })
    }

    const searchText = async () => {
        await search({
            searchField
        })
            .then(function (response) {

                if (response.data.message === true) {
                    history.push({ pathname: '/searchProducts', state: { products: response.data.products } })
                }

            })
            .catch(function (error) {

            });
    }

    return (
        <div className="section section-padding">
            <div className="container">
                <div className="section-title-wrap section-header">

                    <h2 className="title" style={{ marginTop: '20px' }}>SHOP CATEGORIES</h2>
                </div>
                <div className="row" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>

                    <div className='searchbar'>
                        <div className='searchfield'>
                            <input type='text' className='searchinput' placeholder="Search a product" value={searchField} onChange={(e) => setSeacrhField(e.target.value)} />
                            {/* <img src="/images/search.png" className='searchicon'/> */}
                            <FiSearch className='searchicon' onClick={() => searchText()} />
                        </div>
                    </div>
                    <div className='categories'>

                        <CategoryConatiner title="Dress" img="dress" />
                        <CategoryConatiner title="Shirts" img="shirt" />
                        <CategoryConatiner title="Jeans" img="jeans" />
                        <CategoryConatiner title="Suits" img="suit" />
                        {/* <CategoryConatiner title="Accessories" img="accessory" /> */}

                    </div>


                </div>
            </div>
        </div>
    );

}

export default Categories;