require('dotenv').config();
const User = require("../models/user.model");
const bcryptjs = require('bcryptjs');
const errorHandler = require("../utils/error");
const jwt = require('jsonwebtoken');

const signup = async(req, res, next) => {
    console.log(req.body);
    const {userName, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully.'})   

    } catch (error) {
        next(error);
    }
}

const signin = async(req, res, next) => {
    const {email, password} = req.body;

    try {
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorHandler(401, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Worng Credential'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest} = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000) // 1 hour

        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate } )
            .status(200)
            .json(rest);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    signup,
    signin,
}