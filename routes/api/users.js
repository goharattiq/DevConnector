const express = require('express'),
      router = express.Router(),
      gravatar=require('gravatar'),
      bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken'),
      config      = require('config'),
      User    = require('../../models/User'),
      auth =require('../../middleware/auth'),
      {check,validationResult}=require('express-validator');

router.post('/register', [
    check('name','Name is required').not().isEmpty(),
    check('email','Email is not valid').isEmail(),
    check('password','Please Enter Password 6 or more characters').isLength({min:6})
],(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password}=req.body;
    User.findOne({email}).then(user=>{
        if(user){
            res.status(400).json({errors:[{msg:'User already exists'}]})
        }else {
            const avatar = gravatar.url(email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Default
            });
            const newUser = new User({
                name,
                email,
                avatar,
                password
            });
           
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => {
                        const payload = { id: user.id}; 
                        jwt.sign(payload,config.get("jwtsecret"),{ expiresIn: 3600 },(err, token) => {
                            if(err) throw err
                            res.json({token,user});
                        });

                    })
                    .catch(err => console.log(err));
                });
                });   
        }
    });
});

router.post('/login', [
    check('email','Email is not valid').isEmail(),
    check('password','Please Enter Password').exists()
], (req, res) => {
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;
 
    
    User.findOne({ email },)
    .then(user => {
     
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
  
      
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
         
          const payload = { id: user.id};
          jwt.sign(payload,config.get("jwtsecret"),{ expiresIn: 3600 },(err, token) => {
              if(err)throw err;
              res.json({token,user});
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
});

module.exports = router;
