const User = require('../models/user');
const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {

    const users = await User.find({}, 'name email role google')

    res.json({
        ok: true,
        users,
        uid:req.uid
    });

}

const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const existsEmail = await User.findOne({ email});

        if (existsEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

        const user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        const token = await generateJWT( user.id );

        await user.save();

        res.json({
            ok: true,
            user,
            token,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"Error while creating user, view logs"
        })
    }

}

const updateUser = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }

        //Updates
        const { password, google, email, ...fields} = req.body;

        if ( userDB.email !== email ) {

            const existsEmail = await User.findOne({ email });
            if ( existsEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email already exists'
                })
            }
        }

        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate( uid, fields, {new: true} );

        res.json({
            ok: true,
            user: updatedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:"Error while updating user, view logs"
        });
    }
}

const deleteUser = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }

        await User.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'User deleted'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:"Error while deleting user, view logs"
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
