const User = require("../models/userModel");

const getUser = async (req, res) => {
    try {
        let { id } = req.params;
        const user = await User.findById(id);

        res.status(200).send({
            data: {
                id: user._id,
                name: user.name,
                gender: user.gender,
            },
            message: "User Details",
            status: 0,
        });
    } catch (err) {
        res.status(500).send({ data: {}, error: err.message, status: 1 });
    }
};

const getMaleUsers = async (req, res) => {
    try {

        const user = req.user;

        if (!user)
            return res
                .status(401)
                .send({ data: {}, message: "Unauthorized!", status: 1 });

        const maleUsers = await User.find({ gender: "male" });

        res.status(200).send({
            data: maleUsers,
            message: "User Details",
            status: 0,
        });
    } catch (err) {
        res.status(500).send({ data: {}, error: err.message, status: 1 });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({
            data: users,
            message: "All Users",
            status: 0,
        });
    } catch (err) {
        res.status(500).send({ data: {}, error: err.message, status: 1 });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            _id: id,
        });
        if (!user)
            return res.status(401).send({
                data: {},
                message: "User does not exist!",
                status: 1,
            });

        const updatedUser = await User.findByIdAndUpdate(id, req.body);
        res
            .status(201)
            .send({ data: updatedUser, message: "User Updated", status: 0 });
    } catch (err) {
        res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            _id: id,
        });
        if (!user)
            return res.status(401).send({
                data: {},
                message: "User does not exist!",
                status: 1,
            });

        const deletedUser = await User.findByIdAndRemove(id);
        res.status(201).send({ message: "User Deleted", status: 0 });
    } catch (err) {
        res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
    }
};

module.exports = {
    getUsers,
    getMaleUsers,
    getUser,
    updateUser,
    deleteUser,
};
