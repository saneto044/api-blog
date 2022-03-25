const jwt = require("jsonwebtoken");

//middleware to validate token
const checkToken = (req,res,next) => {
    const authHeader = req.headers['authorizarion'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401).json({message:"Not token , access denied"})
    try{
        const verified = jwt.verify(token,"nsdasdsadad23");
        req.user = verified;
        next();
    }catch{
        res.status(400).json({message:'Token is invalid'})
    }
};

module.exports = checkToken;