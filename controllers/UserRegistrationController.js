
// require('dotenv').config()
// const { validationResult} = require('express-validator')
// const bcrypt  = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const Users = require('../models/User')

// const Registeruser = (async (req, res) => {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({
//             errors: errors.array()
//         })
//     }
//     const{ name, email, password } = req.body
//     try {
//         let user = await Users.findOne({email})
//         if(user){
//           return  res.status(400).json({
//                 errors:[
//                     {
//                         msg: `User already exists`,
//                         param: 'email'
//                     }
//                 ]
//             })
//         }
//        const salt = await bcrypt.genSalt()
//        const hashedPassword = await bcrypt.hash(password, salt)
//         user = new Users({
//             name,
//             email,
//             passwordHash: hashedPassword
//         })
//         await user.save()
//         const payload = {
//             user:{
//                 id: user.id
//             }
//         }
//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             {expiresIn: '1h'},
//             (err, token)=>{
//                if(err){
//                 console.error(err)
//                 return res.status(500).send('token error')
//                }
//                 res.json({token})
//             }
//         )
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error')
        
//     }
// })

// module.exports = Registeruser
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');

const Registeruser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const errors = [];

  if (!name || name.trim() === '') {
    errors.push({ msg: 'Name is required', param: 'name' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push({ msg: 'Please include a valid email', param: 'email' });
  }
  if (!password || password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters', param: 'password' });
  }
  if (!confirmPassword) {
    errors.push({ msg: 'Please confirm your password', param: 'confirmPassword' });
  } else if (confirmPassword !== password) {
    errors.push({ msg: 'Passwords do not match', param: 'confirmPassword' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    let user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'User already exists',
            param: 'email',
          },
        ],
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Users({
      name,
      email,
      passwordHash: hashedPassword,
    });

    await user.save();
                                       
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).send('token error');
        }
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
module.exports = Registeruser;
