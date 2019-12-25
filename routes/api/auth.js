const express = require('express'),
      router = express.Router(),
      //gravatar=require('gravatar'),
      //bcrypt = require('bcryptjs'),
      //jwt = require('jsonwebtoken'),
      //config      = require('config'),
      User    = require('../../models/User'),
      auth =require('../../middleware/auth');
      //{check,validationResult}=require('express-validator');

// @route    GET /api/auth
// @desc     Test route
// @access   Public
      router.get('/', auth,(req, res) => {
        User.findById(req.user.id).select('-password')
        .then(()=>{
          res.json(user);
        })
        .catch((err) =>{
          res.status(500).send('Server Error');
      })
    });

module.exports = router;
