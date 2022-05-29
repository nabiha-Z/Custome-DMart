import mongoose from "mongoose";
import Users from '../models/users.js'
import measurements from "../models/measurements.js";
import products from "../models/products.js";
import designer from "../models/designner.js";
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
    const { firstName, lastName, contact, email,  password, } = req.body;
    //console.log(name, email, phonenumber, password, address);
    try {

        if (await designer.findOne({ email: email }).exec()) {
            console.log("existed")
            res.status(201).json({ "message": false, error: 'Already Exists' });
        }
        else {
            await designer.create({ firstName, lastName, contact, email, password, verified: false, resetToken: null, expires: null });
            designer.find({ email: email }, function (err, docs) {
                jwt.sign(
                    { id: docs[0].id },
                    "secretKey",
                    { expiresIn: "1h" },
                    (err, token) => {
                        try {

                            res.status(201).json({ "message": true, "token": token, designer: docs[0] });

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
        const existingUser = await designer.findOne({ email, password });
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


export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        await designer.findOne({ email: email })
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

                        const a = await designer.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password, resetToken: resetCode, expires: expire }, { new: true });

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
            const a = await designer.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password: pass, resetToken: null, expires: null }, { new: true });
            console.log("a= ", a.resetToken);

            return res.status(200).json({ "message": true, success: "Password Chanegd!\n Sign in to Continue." });
        }


    } catch (error) {
        return res.status(200).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {

    const { username, contact, address, id } = req.body;
    try {
        const userdata = await designer.findByIdAndUpdate({ _id: id }, { name: username, phonenumber: contact, address: address }, {
            new: true
        });
        res.status(200).json({ 'message': true });
    } catch (error) {
        console.log(error)

    }

}

export const addProducts = async (req, res) => {
    const {
        title,
        description,
        picture,
        price,
        main_category,
        category,
        color,
        colorCode,
        arImage,
        sizes
    } = req.body;

    //console.log("re: ", req.body)

    try {


        const g = await products.create({
            title,
            description,
            picture,
            price,
            main_category,
            category,
            color,
            colorCode,
            arImage,
            sizes
        });

        res.status(201).json({
            message: true
        });


    } catch (error) {
        console.log(error);
        res.status(201).json({
            message: false, error: error.message
        });
    }
}


export const getProduct = async (req, res) => {
    const pid = req.body;
    await products.findOne({ _id: pid })
        .then((data) => {
            res.status(201).json({ 'message': true, "products": data });
        }).catch((err) => {
            res.status(201).json({ 'message': false, 'error': err.message });
        })
}
export const editProduct = async (req, res) => {
    const {
        pid,
        title,
        description,
        picture,
        price,
        main_category,
        category,
        color,
        colorCode,
        arImage,
        sizes,
        ARImage
    } = req.body;

    console.log("file: ", ARImage)

    await products.findByIdAndUpdate({ _id: pid },
        {
            title,
            description,
            picture,
            price,
            main_category,
            category,
            color,
            colorCode,
            arImage,
            sizes
        }, { new: true })
        .then((data) => {
            res.status(201).json({ 'message': true });
        }).catch((err) => {
            res.status(201).json({ 'message': false, 'error': err.message });
        })
}

export const deleteProduct = async (req, res) => {

    const pid = req.body.pid;
    await products.findByIdAndDelete({ _id: pid })
        .then((data) => {

            res.status(201).json({ "message": true })
        }).catch((err) => {
            res.status(201).json({ 'message': false, 'error': err.message });
        })
}