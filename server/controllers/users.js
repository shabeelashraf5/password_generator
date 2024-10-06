const express = require('express')
//const router = express.Router()

const collectionUser = require('../models/User')


const userRegister = async (req, res) => {

    const { email, password, rpassword, fname, lname, phone, address } = req.body;

    try {

        const users = {

            email, password, rpassword, fname, lname, phone, address
        }

        let user = await collectionUser.insertMany([users])

        console.log(user)

        return res.json({ user: [] , success: true, message: 'SUCCESS'})

    }catch (error){

        console.error('Error adding Users:', error);
        
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
 }


 const userLogin = async (req, res) => {

    try {
    
    const {email, password} = req.body
    // console.log('Login attempt with email:', email);
    // console.log('Request body:', req.body);

    const getUser = await collectionUser.findOne({email})
    // console.log('User found:', getUser);

    if(!getUser){

        console.log('User not found in Database')
        return res.status(400).json({success: false, message: 'User not found. Please register your account'})
    }

    if (getUser.password !== password) {
        console.log('Password is incorrect');
        return res.status(401).json({ success: false, message: 'Password is incorrect.' });
    }

    return res.status(200).json({ success: true, message: 'SUCCESS' })

    }catch (error){

        console.log('Errors as shown', error)

        return res.status(500).json({
            success: false,
            message: 'An error Occurred'
        })
        
    }
 }






 module.exports = { userLogin, userRegister }
