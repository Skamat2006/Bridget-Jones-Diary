const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register(req, res) {
    try {
        const data = req.body;

        //generate a salt
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        //hash the password with the salt
        data['password'] = await bcrypt.hash(data['password'], salt);

        //create the user
        const result = await User.create(data);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function login(req, res) {
    const data = req.body;

    try {
        //get the user from the database
        const user = await User.getOneByUsername(req.body.username);

        // check if the user exists
        if (!user) {
            throw new Error('User not found');
        }

        //compare the password with the hash in the database
        const match = await bcrypt.compare(data.password, user.password);

        if (match) {
            //  create a payload
            const payload = { username: user.username }

            // create a token
            const sendToken = (err, token) => { 
                if (err) {
                    throw new Error('Error in token generation');
                }
                res.status(200).json({ 
                    success:true,
                    token: token
                 });
            }

            // sign the token
            jwt.sign(payload, process.env.JWT_SECRET_TOKEN, { expiresIn: 3600 }, sendToken);

        } else {
            throw new Error('Incorrect password');

        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { register, login };