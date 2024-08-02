const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const { keyURI } = require("../config/vars")
var jwt = require('jsonwebtoken');


const userRegistration = async (req, res) => {
    try {
        const payload = req.body;
        const existingUser = await User.findOne({ email: payload.email })
        if (existingUser) {
            return res.status(400).send({
                message: "User already exsits"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);
        payload.password = hashedPassword;

        const newUser = await User.create(payload);
        res.status(201).send({
            message: "User has been created successfully",
            user: newUser,
            status: true
        });
    } catch (error) {
        console.log(error, "error");
        res.status(500).send({
            message: 'Something Went Wrong',
            status: false
        });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).send({
                message: "Incorrect Email, Try Again"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).send({
                message: "Incorrect Password, Try Again"
            });
        }
        const token = jwt.sign({ userId: existingUser._id }, keyURI, { expiresIn: '1h' });
        res.status(200).send({
            message: "Login Successful",
            user: existingUser,
            token: token,
            status: true

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something Went Wrong"
        });
    }
};

module.exports = { userLogin };




module.exports = { userRegistration, userLogin };
