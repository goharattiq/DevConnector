const jwt = require('jsonwebtoken'),
      config=require('config');

module.exports = function (req,res,next){
    const token = req.header('x-auth-token');
    
    if(!token){
        return res.status(401).json({msg:"No tokken, authorization denied"});
    }

    try {
        const decoded = jwt.verify(token,config.get('jwtsecret'));
        req.user=decoded;
        
        next();
    } catch (error) {
        res.status(401).json({msg:"Token is invalid"})
    }
}

//mongodb://localhost:27017/learn