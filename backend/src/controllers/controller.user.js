const User = require("../models/model.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.register = async (req, res, next) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const { username, email, password } = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        const data = await User.insertUser(username, email, hashedPass);
        let token = await jwt.sign({ id: data.user_id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({
            status: "success",
            user: {
                user_id: data.user_id,
                username: data.username,
                email: data.email,
            },
            token,
        });
        next();
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await User.findUserByEmail(email);
        let token;
        const JWT_SECRET = process.env.JWT_SECRET;
        if (data) {
            const validUser = await bcrypt.compare(password, data.password);
            if (validUser) {
                token = await jwt.sign({ id: data.user_id }, JWT_SECRET, {
                    expiresIn: "1h",
                });
                return res.status(200).json({
                    status: "success",
                    user: {
                        user_id: data.user_id,
                        username: data.username,
                        email: data.email,
                    },
                    token,
                });
            } else {
                return res.status(401).json({
                    status: "failed",
                    message: "Invalid credentials",
                });
            }
        } else {
            return res.status(401).json({
                status: "failed",
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};

exports.adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await User.findUserByEmail(email);
        let token;
        const JWT_SECRET = process.env.JWT_SECRET;
        if (data) {
            const validUser = await bcrypt.compare(password, data.password);
            if (validUser) {
                token = await jwt.sign({ id: data.user_id }, JWT_SECRET, {
                    expiresIn: "1h",
                });
                return res.status(200).json({
                    status: "success",
                    user: {
                        user_id: data.user_id,
                        username: data.username,
                        email: data.email,
                        role: data.role
                    },
                    token,
                });
            } else {
                return res.status(401).json({
                    status: "failed",
                    message: "Invalid credentials",
                });
            }
        } else {
            return res.status(401).json({
                status: "failed",
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};
