import mongoose from "mongoose";
import Users from '../models/users.js'
import measurements from "../models/measurements.js";
import products from "../models/products.js";
import cart from "../models/cart.js";
import orders from "../models/order.js";
import jwt from "jsonwebtoken";
import config from "config";
import nodemailer from 'nodemailer';

export const getusers = async (req, res) => {
    console.log('get users')
    try {
        const users = await Users.find();
        res.status(200).json({ "message": true, "users": users });
    }
    catch (error) {
        res.status(200).json({ message: false, error: error.message });

    }
}

export const loginuser = async (req, res) => {
    const { user } = req.body;
    if (user !== undefined) {
        //const id = JSON.parse(user);
        try {
            await Users.find({ _id: user })
                .then((data) => {

                    res.status(201).json({ "message": true, "user": data[0] });
                }).catch((err) => {
                    res.status(201).json({ "message": false, "error": err.message });

                })


        } catch (error) {
            console.log("err:", error.message)
            res.status(201).json({ "message": false, 'error': error.message });
        }
    }
}

export const currentuser = async (req, res) => {
    const { user } = req.body;
    console.log("user: ", user)

    if (user !== undefined) {
        const id = JSON.parse(user);
        console.log("type: ", typeof (user))
        try {
            await Users.find({ _id: id })
                .then((data) => {

                    res.status(201).json({ "message": true, "user": data[0] });
                }).catch((err) => {
                    res.status(201).json({ "message": false, "error": err.message });

                })


        } catch (error) {
            console.log("err:", error.message)
            res.status(201).json({ "message": false, 'error': error.message });
        }
    }
}


export const signup = async (req, res) => {
    const { name, email, phonenumber, password, address } = req.body;
    console.log(name, email, phonenumber, password, address);
    try {

        if (await Users.findOne({ email: email }).exec()) {
            console.log("existed")
            res.status(201).json({ "message": false, error: 'Already Exists' });
        }
        else {
            await Users.create({ name, email, phonenumber, password, address, favorites: [] });
            Users.find({ email: email }, function (err, docs) {
                jwt.sign(
                    { id: docs[0].id },
                    "secretKey",
                    { expiresIn: "1h" },
                    (err, token) => {
                        try {

                            res.status(201).json({ "message": true, "token": token, user: docs[0] });

                        } catch (error) {
                            res.status(404).json({ message: error.message });
                        }
                    }
                )
            })

        }


    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const login = async (req, res) => {

    var { email, password } = req.body;
    // email = 'nabihazubair100@gmail.com';
    console.log("email :", email);


    try {
        const existingUser = await Users.findOne({ email, password });
        //console.log("exi: ", existingUser)
        if (!existingUser) {
            // res.send("none")
            console.log("Not found")
            return res.status(201).json({ message: false, error: "Invalid User" });
        } else {

            jwt.sign(
                { email: existingUser.email, id: existingUser._id },
                config.get('jwtSecretKey'),
                { expiresIn: "1h" },
                (err, token) => {
                    try {
                        // res.send({ "message": true, "token": token, "user": existingUser })
                        return res.status(201).json({ message: true, "token": token, "user": existingUser });

                    } catch (error) {
                        // res.send(error.message)
                        return res.status(201).json({ message: false, error: error.message });
                    }
                }
            )

        }
    }
    catch (error) {
        // res.send(error.message);
        return res.status(409).json({ message: false, error: error.message });
    }
}


export const favList = async (req, res) => {

    const { item, user_id } = req.body;
    console.log("favourites")
    try {

        const userData = await Users.findOne({ _id: user_id });
        var favourites = userData.favorites;
        for (let i = 0; i < favourites.length; i++) {
            if (favourites[i]._id === item._id) {
                return res.status(200).json({ "message": false });
            }
        }
        favourites.push(item);

        const updated = await Users.findByIdAndUpdate({ _id: user_id }, { favorites: favourites }, { new: true });
        return res.status(200).json({ "message": true });

    } catch (error) {

        res.status(404).json({ message: error.message });
    }

}

export const viewFavourites = async (req, res) => {

    var{ id } = req.body;
    if (req.body.flag === "1" ) {
        id = JSON.parse(id)
    } 
    try {

        const userData = await Users.findOne({ _id: id });
       
        var favourites = userData.favorites;
        res.status(200).json({ "message": true, favourites: favourites });

    } catch (error) {

        res.status(404).json({ "message": false, error: error.message });
    }
}


export const unfavList = async (req, res) => {

    const { item, user_id } = req.body;
    const userdata = await Users.findOne({ _id: user_id });

    var favourites = userdata.favorites;

    try {
        console.log("length before = ", favourites.length);
        for (let i = 0; i < favourites.length; i++) {
            if (favourites[i]._id === item._id) {
                console.log("in fav loop", i);
                favourites.splice(i, i + 1);
                break;
                // console.log("in loop")
                // res.status(200).json({"message":false});
                //check =!check;
            }
        }
        console.log("final favlist" + favourites);
        const updated = await Users.findByIdAndUpdate({ _id: user_id }, { favorites: favourites }, { new: true });

        //console.log("updated user fav"+updated);
        res.status(200).json({ "message": true });

    } catch (error) {

        res.status(404).json({ message: false, error: error.message });

    }
}
export const fetchSaved = async (req, res) => {

    const { id } = req.body;
    try {

        //let list = [];

        const userData = await Users.findOne({ _id: id }).exec();

        //console.log("userData" + userData);
        const { _id, name, email, phonenumber, password, type, Status, favorites, limit, access, message } = userData;
        if (favorites.length === 0) {
            res.status(200).json({ 'message': false, favorites });

        }
        // let list = [];

        // for (let i = 0; i < favorites.length; i++) {

        //    // console.log("favorites" + i + favorites[i] );
        //     const index = favorites[i];
        //     const r = await products.findOne({_id:index});
        //     //console.log("r" +r);


        //     list.push(r);
        // }

        // let list1 = [];
        // list1.push(list)
        //console.log("list1 "+typeOf(favorites));
        //console.log("list= ", list);
        res.status(200).json({ 'message': true, favorites: userData.favorites });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }


}

export const getuserdetails = async (req, res) => {

    const id = req.body.user_id;
    try {

        const details = await Users.findOne({ _id: id });
        res.status(200).json({ details });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {

    const { username, contact, address, id } = req.body;
    try {
        const userdata = await Users.findByIdAndUpdate({ _id: id }, { name: username, phonenumber: contact, address: address }, {
            new: true
        });
        res.status(200).json({ 'message': true });
    } catch (error) {
        console.log(error)

    }

}

export const changePassword = async (req, res) => {

    const { newPassword, useremail } = req.body;
    try {
        const userdata = await Users.findOne({ email: useremail });
        const { _id, name, email, phonenumber, password, type, status, masterid, access, limit, message } = userdata;
        const updated = await Users.findByIdAndUpdate(_id, { _id, name, email, phonenumber, password: newPassword, type, status, masterid, access, limit, message }, {
            new: true
        });

        res.status(200).json({ 'message': true });
    } catch (error) {
        res.status(200).json({ 'message': false });
    }

}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        await Users.findOne({ email: email })
            .then(users => {
                if (!users) {
                    console.log("Not Found");
                    return res.status(200).json({ 'message': false, error: "User dont exists with that email" })
                }
                var transporter = nodemailer.createTransport({

                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.USER,
                        pass: process.env.PASS
                    },

                });

                var currentDateTime = new Date();
                const resetCode = 1 + Math.floor(Math.random() * 10000);
                var mailOptions = {
                    from: 'no-reply@gmail.com',
                    to: users.email,
                    subject: "Reset password link",

                    html: `<h1>You requested for password reset </h1><p>\
              If you have requested to reset your password then use the code below to reset password for your account<br/>\
             <h1>${resetCode}</h1><br/>\
             This code will expire within 1 hour.<br/>\
              </p>`
                };

                transporter.sendMail(mailOptions, async function (error, info) {
                    if (error) {
                        console.log("not sent: ", error);
                    } else {

                        const token = jwt.sign(
                            { id: users._id },
                            process.env.resetToken,
                            { expiresIn: "600s" }
                        )

                        const expire = Date.now() + 3600000;
                        const { _id, firstName, lastName, email, password, resetToken, expires } = users;

                        const a = await Users.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password, resetToken: resetCode, expires: expire }, { new: true });

                        console.log("a= ", a.expires);
                        return res.status(200).json({ 'message': true, success: "Check your email", resetCode: resetCode })

                    }
                });
                // console.log("message")
            })
    } catch (error) {
        // console.log("err in catch=", error);

        return res.status(404).json({ message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { email, pass } = req.body;
    try {

        let users = await Users.findOne({ email: email, expires: { $gt: Date.now() } })

        if (!users) {
            return res.status(200).json({ "message": false, error: "Try again sesssion expired!" });
        } else {
            // const salt = await bcrypt.genSalt(10);

            // const hashedPassword = await bcrypt.hash(pass, salt);
            const { _id, firstName, lastName, email, password, resetToken, expires } = users;
            const a = await Users.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password: pass, resetToken: null, expires: null }, { new: true });
            console.log("a= ", a.resetToken);

            return res.status(200).json({ "message": true, success: "Password Chanegd!\n Sign in to Continue." });
        }


    } catch (error) {
        return res.status(200).json({ message: error.message });
    }
}

export const fetchMeasurements = async (req, res) => {

    var id = req.body.uid;
 
    // id = parseInt(id)
    console.log("id: ", id)
    console.log("type: ", typeof(id))
    if (req.body.flag === "1" ) {
        id = JSON.parse(id)
    } else {
        console.log("no need")
    }

    await measurements.find({ user: id })
        .then((data) => {
            console.log("measurement: ", data)
            return res.status(200).json({ "message": true, "measurement": data });
        }).catch((err) => {
            return res.status(200).json({ "message": false, "error": err.message });
        })

}

export const deleteMeasurements = async (req, res) => {

    await measurements.findOneAndDelete({ _id: req.body.mid })
        .then((data) => {
            return res.status(200).json({ "message": true });
        }).catch((err) => {
            return res.status(200).json({ "message": false });
        })

}

export const editMeasurements = async (req, res) => {

    // const { shoulders, arms, fullLength, knee, waist, shirt, bottom } = req.body;
    const { shoulders, arms, fullLength, knee } = req.body;
    const mid = req.body.mid;
    await measurements.findByIdAndUpdate({ _id: mid }, { shoulders, fullLength, arms, knee }, { new: true })
        .then((data) => {
            res.status(201).json({ "message": true })
        }).catch((err) => {
            res.status(201).json({ "message": false, "error": err.message })
        })
}


export const latestProducts = async (req, res) => {

    await products.find({}).sort('-date').limit(9)
        .then((data) => {
            res.status(201).json({ message: true, products: data })
        }).catch((err) => {
            res.status(201).json({ message: false, error: err.message })
        })
}

export const categorySearch = async (req, res) => {

    console.log("cat: ", req.body.category)
    await products.find({ category: req.body.category })
        .then((data) => {
            res.status(201).json({ message: true, products: data })
        }).catch((err) => {
            res.status(201).json({ message: false, error: err.message })
        })
}


export const filterProducts = async (req, res) => {

    const { color, categ, price } = req.body;
    await products.find({ $or: [{ category: categ }, { price: price }, { color: color }, { main_category: categ }] })
        .then((data) => {

            res.status(201).json({ message: true, products: data })
        }).catch((err) => {
            res.status(201).json({ message: false, error: err.message })
        })
}

export const searchProducts = async (req, res) => {

    const txt = req.body.searchField;
    var capitalize  = txt.charAt(0).toUpperCase() + txt.slice(1);
    await products.find({ $or: [{ title: capitalize }, { category: capitalize }, { color: txt }, { main_category: capitalize }] })
        .then((data) => {
            res.status(201).json({ message: true, products: data })
        }).catch((err) => {
            res.status(201).json({ message: false, error: err.message })
        })
}

export const getProduct = async (req, res) => {

    await cart.find({ user: req.body.pid })
        .then((data) => {
            res.status(201).json({ message: true, cart: data })
        }).catch((err) => {
            res.status(201).json({ message: false, error: err.message })
        })
}

export const fetchCart = async (req, res) => {

    await cart.find({ user: req.body.uid }).populate('items.pid')
        .then((data) => {
            res.status(201).json({ message: true, cart: data })
        }).catch((err) => {
            res.status(201).json({ message: false, error: err.message })
        })
}


export const addInCart = async (req, res) => {

    const { uid, product, size, color } = req.body;
    var quantity = 0, errors = "", count = 0;
    console.log("api")
    const cartData = await cart.find({ user: uid })
    var productObj = {
        pid: product._id,
        quantity: 1,
        size: size,
        color: color
    }
    try {
        if (cartData.length !== 0) {

            cartData[0].items.map((item) => {

                var id = JSON.stringify(item.pid)

                if (id.includes(product._id)) {
                    console.log("incraese quantity")
                    if (item.size === size) {
                        count = 1;
                        console.log("before: ", item.quantity)
                        quantity = item.quantity + 1;
                        item.quantity = quantity
                        //console.log("after update: ", cartData[0]._id)
                        cart.findByIdAndUpdate({ _id: cartData[0]._id }, { items: cartData[0].items }, { new: true })
                            .then((data) => {
                                console.log(data);

                            }).catch((err) => {
                                errors = err.message
                                console.log("err found: ", err.message)
                            })
                    }

                }
            })
            if (count === 0) {
                console.log("new insertion into cart")
                var items = cartData[0].items;
                items.push(productObj)
                cart.findByIdAndUpdate({ _id: cartData[0]._id }, { items: items }, { new: true })
                    .then((data) => {

                    }).catch((err) => {
                        errors = err.message
                        console.log("err found: ", err.message)
                    })

            }
        } else {
            console.log("new data", uid)
            var items = [];
            items.push(productObj)
            await cart.create({ items, user: uid })
                .then((data) => {

                }).catch((err) => {
                    errors = err.message
                    console.log("err: ", err.message)
                })
        }

        if (errors.length === 0) {
            res.status(201).json({ message: true })
        } else {
            res.status(201).json({ message: false, error: err.message })
        }

    }
    catch (err) {
        console.log("error: ", err.message)
    }


}

export const updateQuantity = async (req, res) => {

    const { cid, itemId, quantity } = req.body;
    console.log("itemId: ", itemId)
    const cartData = await cart.find({ _id: cid })
    try {
        cartData[0].items.map((item) => {
            console.log("item: ", item)
            var id = JSON.stringify(item._id)
            console.log("id: ", id)
            if (id.includes(itemId)) {
                console.log("sdajdk")
                item.quantity = quantity
            }
            console.log("sdd")
        })
        await cart.findByIdAndUpdate({ _id: cid }, { items: cartData[0].items }, { new: true })
            .then((data) => {

                res.status(201).json({ message: true, cart: data })
            }).catch((err) => {
                res.status(201).json({ message: false, error: err.message })
            })

    }
    catch (err) {
        console.log("error: ", err.message)
    }

}

export const deleteCart = async (req, res) => {
    const { cid } = req.body;
    console.log("deleting ...", cid)
    try {

        await cart.findByIdAndDelete({ _id: cid })
            .then((data) => {
                res.status(201).json({ "message": true })
            }).catch((err) => {
                res.status(201).json({ message: false, error: err.message })
            })
    }
    catch (err) {
        console.log("error: ", err.message)
    }
}


export const deleteCartItem = async (req, res) => {

    const { cid, itemId } = req.body;
    const cartData = await cart.find({ _id: cid })
    const itemsArr = cartData[0].items;
    try {

        // const items = itemsArr.filter(item => !(JSON.stringify(item._id).includes(itemId)));
        const items = itemsArr.filter(item => (!JSON.stringify(item._id).includes(itemId)));
        //var temp = itemsArr.slice(index + 1, itemsArr.length)

        console.log("items:", items)

        await cart.findOneAndUpdate({ _id: cid }, { items: items }, { new: true })
            .then((data) => {
                res.status(201).json({ message: true, cart: data })
            }).catch((err) => {
                res.status(201).json({ message: false, error: err.message })
            })

    }
    catch (err) {
        console.log("error: ", err.message)
    }

}


export const changePicture = async (req, res) => {

    const { user, picture } = req.body;
    console.log("id: ", user)
    var userId = JSON.parse(user);
    console.log("id json: ", userId)

    try {
        await Users.findByIdAndUpdate({ _id: userId }, { picture: picture }, { new: true })
            .then((data) => {
                res.status(201).json({ "message": true });
            }).catch((err) => {
                res.status(201).json({ "message": false, "error": err.message });

            })
    }
    catch (err) {
        res.status(201).json({ "message": false, "error": err.message });
    }
}

export const updatePicture = async (req, res) => {

    const { user, picture } = req.body;
    console.log("id: ", user)
    try {
        await Users.findByIdAndUpdate({ _id: user }, { picture: picture }, { new: true })
            .then((data) => {
                res.status(201).json({ "message": true });
            }).catch((err) => {
                res.status(201).json({ "message": false, "error": err.message });

            })
    }
    catch (err) {
        res.status(201).json({ "message": false, "error": err.message });
    }
}

export const smartAdvisor = async (req, res) => {
    const { category, main_category, product_color } = req.body;

    var select_Category = "";
    console.log("product_color: ", product_color, main_category, category)
    var items = [];
    if (category === 'Shirts') {
        select_Category = "Jeans";
    } else if (category === 'Jeans') {
        select_Category = "Shirts";
    } else if (category === 'Dress') {
        select_Category = "Trouser";
    } else if (category === 'Suits') {
        select_Category = "Dress pant";
    }

    console.log("selected: ", select_Category)
    if (product_color == 'white') {
        items = await products.find({ $and: [{ $or: [{ color: 'black' }, { color: 'blue' }, { color: 'skin' }, { color: 'brown' }, { color: 'green' }, { color: 'light blue' }] }, { main_category: main_category }, { category: select_Category }] })
    }
    else if (product_color == 'black') {
        if (select_Category === 'Shirts') {
            items = await products.find({ $and: [{ $or: [{ color: 'white' }, { color: 'blue' }, { color: 'black' }, { color: 'brown' }, { color: 'red' }, { color: 'maroon' }] }, { main_category: main_category }, { category: select_Category }] })
            console.log("items:", items)
        } else {
            items = await products.find({ $and: [{ $or: [{ color: 'white' }, { color: 'blue' }, { color: 'black' }, { color: 'skin' }] }, { main_category: main_category }, { category: select_Category }] })
        }

    } else if (product_color == 'blue') {
        if (select_Category === 'Shirts') {
            items = await products.find({ $and: [{ $or: [{ color: 'blue' }, { color: 'black' }, { color: 'grey' }, { color: 'green' }, { color: 'brown' }, { color: 'maroon' }, { color: 'red' }, { color: 'white' }] }, { main_category: main_category }, { category: select_Category }] })
        } else {
            items = await products.find({ $and: [{ $or: [{ color: 'white' }, { color: 'blue' }, { color: 'black' }, { color: 'grey' }] }, { category: select_Category }] })

        }

    } else if (product_color == 'orange') {
        items = await products.find({ $and: [{ $or: [{ color: 'black' }, { color: 'blue' }, { color: 'white' }] }, { main_category: main_category }, { category: select_Category }] })
    }
    else if (product_color == 'grey') {
        items = await products.find({ $and: [{ $or: [{ color: 'black' }, { color: 'blue' }, { color: 'white' }] }, { main_category: main_category }, { category: select_Category }] })
    }
    else if (product_color == 'red') {
        items = await products.find({ $and: [{ $or: [{ color: 'black' }, { color: 'blue' }, { color: 'white' }] }, { main_category: main_category }, { category: select_Category }] })
    }
    else if (product_color == 'pink') {
        items = await products.find({ $and: [{ $or: [{ color: 'black' }, { color: 'blue' }, { color: 'white' }] }, { main_category: main_category }, { category: select_Category }] })
    }
    else if (product_color == 'purple') {
        items = await products.find({ $and: [{ $or: [{ color: 'black' }, { color: 'blue' }, { color: 'white' }] }, { main_category: main_category }, { category: select_Category }] })
    }
    else if (product_color == 'green') {
        items = await products.find({ $and: [{ $or: [{ color: 'black' }, { color: 'blue' }, { color: 'white' }] }, { main_category: main_category }, { category: select_Category }] })
        console.log("items: ", items)
    }

    return res.status(201).json({ "message": true, "products": items });
}

export const recommendations = async (req, res) => {
    var counts = req.body.counts;
    //console.log("chars:" , counts)
    const chars = counts.split(",");
    console.log("chars:", chars)
    var max = parseInt(chars[0]);
    var maxIndex = 0;
    //console.log("max: ", max)
    const categories = ['Shirts', "Jeans", "Suits", "Dress", "Trousers", "Dress Pants"];

    for (let i = 1; i < chars.length; i++) {
        if (chars[i] > max) {
            max = chars[i];
            maxIndex = i;
        }
    }
    //console.log("max Index: ", maxIndex)

    const category = categories[maxIndex];

    await products.find({category: category}).limit(10)
        .then((data) => {
            console.log("data: ", data.length)
            return res.status(201).json({ "message": true, "products": data });
        }).catch((err) => {
            return res.status(201).json({ "message": false, "error": err.message });

        })

}

export const placeorder = async (req, res) => {
    var data = req.body;
    console.log("data: ", data)
    var orderNo = (1 + Math.floor(Math.random() * 10000000));
    console.log("orderNo:", orderNo)
    data.orderNo = orderNo;
    console.log("data: ", data)

    await orders.create({ orderNo, items: data.items, totalamount: data.totalamount, paymentmethod: data.paymentmethod, status: data.status, user: data.user })
        .then((data) => {
            return res.status(201).json({ "message": true });
        }).catch((err) => {
            console.log("err: ", err.message)
            return res.status(201).json({ "message": false, "error": err.message });
        })
}

export const orderhistory = async (req, res) => {

    const { uid } = req.body;

    await orders.find({ user: uid })
        .then((data => {
            return res.status(201).json({ "message": true, "orders": data });
        })).catch((err) => {
            return res.status(201).json({ "message": false, "error": err.message });
        })
}