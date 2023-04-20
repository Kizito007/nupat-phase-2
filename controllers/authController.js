const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET;

const register = async (req, res) => {
    let { name, gender, password, } = req.body;
    const salt = await bcrypt.genSalt();

    bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
            res.status(500).send({ data: {}, message: err, status: 1 });
        } else {
            const user = new User({
                name,
                gender,
                password: hash,
            });
            await user.save();

            res.status(201).send({
                data: user,
                message: "User registered successfully",
                status: 0,
            });
        }
    });
};

const login = async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name: name });
    if (!user) {
        res.status(401).send({
            data: {},
            message: `User with ${name} not found!`,
            status: 1,
        });
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            res.status(500).send({ data: {}, message: err, status: 1 });
        } else if (!result) {
            res.status(401).send({
                data: {},
                message: "Email or password is incorrect",
                status: 1,
            });
        } else {
            const token = jwt.sign({ id: user._id }, secretKey, {
                expiresIn: "1h",
            });
            res.status(200).send({
                data: {
                    token,
                    id: user._id,
                    name: user.name,
                    gender: user.gender,
                },
                message: "User logged in successfully",
                status: 0,
            });
        }
    });
};

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
        return res
            .status(401)
            .json({ msg: "No authenication token, authorization denied" });

    const verfied = jwt.verify(token, process.env.SECRET);
    if (!verfied)
        return res
            .status(401)
            .json({ msg: "Token verification failed, authorization denied" });

    req.user = verfied.id;
    next();
};

const tokenIsValid = async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).send({ data: {}, error: err.message, status: 1 });
    }
};

module.exports = {
    register,
    login,
    auth,
    tokenIsValid,
};  