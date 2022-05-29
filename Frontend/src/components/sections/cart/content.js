import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { fetchCart, updateQuantity, deleteItem, placeOrder, deleteCart} from '../../../api';
import Cookies from 'js-cookie';
import './styles.css';
import 'antd/dist/antd.css';
import { message, Space } from 'antd';

const Cart = () => {

    const [cart, setCart] = useState([]);
    const classes = useStyles();
    const [check, setCheck] = useState(false);
    const [total, setTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [disount, setDiscount] = useState(0);
    var amount=0;

    useEffect(async () => {
        await fetchCart({ uid: Cookies.get('id') })
            .then((response) => {
                console.log("Res cart: ", response.data.cart[0].items)
                if (response.data.message === true) {
                    setCart(response.data.cart[0])
                    response.data.cart[0].items.map((item)=>{
                        amount = amount+(item.pid.price * item.quantity);
                        setTotal(amount)
                        setGrandTotal(amount+100)
                        console.log("amount: ", amount)
                    })

                }
            }).catch((err) => {
                console.log("err: ", err.message)
            })


    }, [check])

    const updateItemQuantity = (itemId, quant, val) => {
        var quantity = quant + (val);
        if (quantity == 0) {
            deleteFunc(itemId)
        } else {
            updateQuantity({ cid: cart._id, itemId, quantity })
                .then((response) => {
                    console.log("response : ", response.data)
                    setCheck(!check)
                }).catch((err) => {
                    console.log("err: ", err.message)
                })
        }

    }

    const deleteFunc = async (itemId) => {
        await deleteItem({ cid: cart._id, itemId })
            .then((response) => {
                console.log("response : ", response.data)
                setCheck(!check)
            }).catch((err) => {
                console.log("err: ", err.message)
            })
    }

    const confirmorder = async () =>{
    
        await placeOrder({items:cart.items, totalamount: grandTotal, paymentmethod:'COD', status:'pending', user:Cookies.get('id')})
        .then(async(response) => {
                   await deleteCart({cid: cart._id})
                   .then((response) => {
                       if(response.data.message === true){                     
                        message.success("Order Placed")
                        setCheck(!check)
                       }else{
                           console.log("error")
                       }    
                   
                }).catch((err) => {
                    console.log("err: ", err.message)
                })
            
        }).catch((err) => {
            console.log("err: ", err.message)
        })

    }


    //console.log("cart: ", cart)
    const RenderEmptyCart = () => (
        <div style={{marginTop:60}}>
        <Typography variant="subtitle1">You have no items in your shopping cart,
            <Link className={classes.link} to="/products">start adding some</Link>!
        </Typography>
        </div>
    );

    const renderCart = () => (
        <>

            <div className="container-fluid px-lg-4">

                <div className="row">
                    <div className="col-md-8 mt-4">
                        <div className="table-responsive">
                            <table id="table" className="table v-middle">
                                <thead>
                                    <tr className="bg-light">
                                        <th scope="col">No</th>
                                        <th scope="col" ></th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col" ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.items.map((item, key) => (
                                        <tr>
                                            
                                            <td><i className='fa fa-trash' id="icon" onClick={() => deleteFunc(item._id)} style={{ fontSize: 17 }} /></td>
                                            <td><img class="cart-products-image" src={item.pid.picture} /></td>
                                            <td>{item.pid.title}</td>
                                            <td>{item.size}</td>
                                            <td><span><i className='fa fa-minus' id="icon" onClick={() => updateItemQuantity(item._id, item.quantity, -1)} /></span>{item.quantity}<span><i className='fa fa-plus' id="icon" style={{ color: '#2CAC5D' }} onClick={() => updateItemQuantity(item._id, item.quantity, 1)} /></span></td>
                                            <td>{item.pid.price}</td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="container" id="Billing">
                            <div className="Billing-header">
                                <h1>CART TOTAL</h1>
                            </div>
                            <div className="Billing-content">
                                <p>Total<span id="total">{total}</span></p>
                                <p>Shippping<span id="shipping">100</span></p>
                                <p>Payment<span id="shipping">COD</span></p>
                                <p className="ship-cost">Discount<span>0</span></p>
                                <hr/>
                                <h2 style={{marginTop:-30}}>Grand Total<span id="grandTotal">{grandTotal}</span></h2>
                            </div>
                            <button onClick={() => confirmorder()} className="checkout-btn">Place Order</button>
                        </div>

                    </div>


                </div>

            </div>
        </>
    );

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {cart.length === 0 ? RenderEmptyCart() : renderCart()}
        </Container>
    );
};

export default Cart;
