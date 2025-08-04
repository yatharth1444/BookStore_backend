const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const LoginUser = async (req, res) => {
    const {email, password} = req.body
        const errors = []
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email || !emailRegex.test(email)){
            errors.push({msg: `please include a valid email`, param: "email"})

        }
        if(!password || password.trim() === ''){
            errors.push({msg: `please enter a password`, param:"password"})

        }
        if(errors.length > 0){
           return res.status(400).json({errors})
        }
    try {
       
        const UserToLogin = await User.findOne({email})
        if(!UserToLogin){
           return res.status(400).json({
              errors:[{msg: `invalid credentials`, param: "email"}]
            })
        }
        const isMatch = await bcrypt.compare(password, UserToLogin.passwordHash)
        if(!isMatch){
            return res.status(400).json({
                errors:[{msg: `invalid credentials`, param: "password"}]
            })
        }
        const payload ={
            user:{
               id: UserToLogin._id,
                name: UserToLogin.name,
                email: UserToLogin.email,
                role: UserToLogin.role,
            }
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h'},
            (error, token) =>{
                if(error) {
                    console.error(`JWT sign error`, error)
                 return   res.status(500).send(`Token generation error`)
                }
                res.json({
                  token,
                  user:payload.user,
                })
            }

        )
    } catch (error) {
        console.error(error.msg)
        res.status(500).json({
            message: `Server error`,
            success: false
        })
    }
}
module.exports = LoginUser