import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//import mongoose from "mongoose";
import nodemailer from 'nodemailer';
import Admin from "../models/admin.js";
import orders from "../models/order.js";
import desniger from "../models/designner.js";
import products from "../models/products.js";
import dotenv from 'dotenv';

dotenv.config();
// const EMAIL = process.env.EMAIL;
// const host = process.env.HOST;

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ email });

    if (!existingUser)
      return res.status(201).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(201).json({ message: false, error: "Invalid Password" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: "6h" }
    );
    res.status(200).json({ message: true, token, user: existingUser._id });
  } catch (error) {
    res.status(500).json({ message: false, "error": error.message });
  }
};

export const signup = async (req, res) => {

  const { firstName, lastName, email, password } = req.body;
 
  try {
    if (await Admin.findOne({ email: email }).exec()) {

      return res.status(200).json({ "message": false, error: "User already exists." });
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await Admin.create({
        firstName,
        lastName,
        email,
        password,
        resetToken: null,
        expires: null
      });

      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.SECRET,
        { expiresIn: "6h" }
      );

      res.status(200).json({ "message": true, token, admin:result});
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};
export const updateProfile = async (req, res) => {

  const { email } = req.body;

  console.log(email);
  const data = req.body;
  try {
    const existingUser = await Admin.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    await Admin.findOneAndUpdate(email, data, {
      returnOriginal: false
    });

    const admindata = await Admin.find();

    console.log(admindata);
    res.json(admindata);

  } catch (error) {

    res.status(404).json({ message: error.message });
  }
};
export const getcurrentuser = async (req, res) => {
  const id = req.body.user_id;
  console.log(req.body);
  console.log(id);
  try {

    const listings = await Admin.find({ _id: id });
    console.log(listings);
    res.status(200).json(listings);
  }
  catch (error) {
    res.status(404).json({ message: error.message });

  }
}

export const userProfile = async (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

  try {
    const { firstName, lastName, email } = await Admin.findById(req.userId);

    res.status(200).json({ firstName, lastName, email });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const verifyDesigners = async (req, res) => {

  try {
    await desniger.findByIdAndUpdate({ _id: req.body.did }, { verified: req.body.verified })
      .then((response) => {
        return res.status(200).json({ "message": true });
      })
      .catch((err) => {
        return res.status(200).json({ "message": false, "error": err.message });
      })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const removeDesigner = async (req, res) => {

  try {
    await desniger.findByIdAndDelete({ _id: req.body.did })
      .then((response) => {
        return res.status(200).json({ "message": true });
      })
      .catch((err) => {
        return res.status(200).json({ "message": false, "error": err.message });
      })

  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const viewVerifiedDesigners = async (req, res) => {

  try {
    await desniger.find({ verified:true })
      .then((data) => {
        return res.status(200).json({ "message": true, 'desingers': data});
      })
      .catch((err) => {
        return res.status(200).json({ "message": false, "error": err.message });
      })

  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const forgotPassword = async (req, res) => {

  const { email } = req.body;
  try {
    await Admin.findOne({ email: email })
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

            const a = await Admin.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password, resetToken: resetCode, expires: expire }, { new: true });

            console.log("a= ", a.expires);
            return res.status(200).json({ 'message': true, success: "Check your email", resetCode: resetCode })

          }
        });
      })
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

export const resetPassword = async (req, res) => {
  const { pass, user_email } = req.body;
  try {

    let user = await Admin.findOne({ email: user_email, expires: { $gt: Date.now() } })

    if (!user) {
      return res.status(200).json({ "message": false, error: "Try again sesssion expired!" });
    } else {

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(pass, salt);
      const { _id, firstName, lastName, email, password, resetToken, expires } = user;
      console.log("expires= ", expires);
      const a = await Admin.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password: hashedPassword, resetToken: null, expires: null }, { new: true });
      console.log("a= ", a.password);
      console.log("a= ", a.token);

      return res.status(200).json({ "message": true, success: "Password Chanegd!\nReturn back to Sign in" });
    }


  } catch (error) {
    return res.status(200).json({ message: error.message });
  }


}

export const getProducts = async (req, res) => {

  try {
    await products.find({})
      .then((data) => {
        res.status(200).json({ 'message': true, "products": data });
      }).catch((err) => {
        res.status(200).json({ 'message': false, "error": err.message });
      })

  } catch (error) {
    res.status(201).json({
      message: error.message
    });

  }
}


export const gettOrders = async (req, res) => {

  await orders.find({})
    .then((data) => {
      res.status(201).json({ "message": true, "orders": data })
    }).catch((err) => {
      res.status(201).json({ 'message': false, 'error': err.message });
    })
}
