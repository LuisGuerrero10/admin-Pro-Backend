const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await Usuario.findOne({ email });

        if ( !userDB ) {
            return res.status(404).json({
                ok:false,
                msg:'Email or Password not found'
            })
        }

        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok:false,
                msg:'Email or Password invalid'
            })
        }

        //generate jwt

        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please try again'
        })

    }
}

module.exports = {
    login
}