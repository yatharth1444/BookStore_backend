const express = require('express')
const UserRouter = express.Router()
const Registeruser = require('../controllers/UserRegistrationController')
const LoginUser = require('../controllers/LoginUserController')
UserRouter.post('/register', Registeruser);
UserRouter.post('/login', LoginUser)
 module.exports = UserRouter
