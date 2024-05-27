const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const validateToken = (req,res,next) => {
    const tokenKey = process.env.TOKEN_KEY || ''
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(authHeader);
    if (token == null)
      return res.status(401).send("Token requerido");
    jwt.verify(token, tokenKey, (err, user)=>{
      if(err) return res.status(403).send("token no valido");
      //console.log(user);
      req.user = user;
      next();
    });
  }

module.exports = {validateToken}