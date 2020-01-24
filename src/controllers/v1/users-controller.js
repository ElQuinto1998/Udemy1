const bcrypt = require('bcryptjs');
const Users = require('../../mongo/models/users');
const jwt = require('jsonwebtoken');

const expiresIn = 60 * 10;

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await Users.findOne({email});
        if (user) {
            const isOk = await bcrypt.compare(password, user.password);
            if (isOk) {
                const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET,
                    {expiresIn});
                res.send({status: 'OK', data: {token, expiresIn}});
            } else {
                res.status(403).send({status: 'INVALID PASSWORD', message: 'Contraseña incorrecta'});
            }
        } else {
            res.status(401).send({status: 'USER NOT FOUND', message: 'No existe el usuario'});
        }
    } catch (e) {
        res.status(505).send({status: 'ERROR', message: error.message});
    }
};

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const {username, email, password, data} = req.body;
        const hash = await bcrypt.hash(password, 15);

        await Users.create({
            username,
            email,
            password: hash,
            data
        });

        res.send({status: 'OK', message: "User Created"});
    } catch (error) {
        res.status(505).send({status: 'ERROR', message: error.message});
    }
};

const deleteUser = (req, res) => {
    res.send({status: 'OK', message: "User Deleted"});
};

const getUsers = (req, res) => {
    res.send({status: 'OK', data: []});
};

const updateUser = async (req, res) => {

    try {
        const {username, email, data, userId} = req.body;
        await Users.findByIdAndUpdate(userId, {
            username, email
        });
        res.send({status: 'OK', message: "User Updated"});
    } catch (e) {
        res.status(500).send({status: 'ERROR', data: e.message});
    }


};

module.exports = {createUser, deleteUser, getUsers, updateUser, login};
