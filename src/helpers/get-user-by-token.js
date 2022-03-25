const jwt = require('jsonwebtoken');

const User = require('../models/User');

//get user jwt token
const getUserByToken = async (token) => {
    if(!token) return res.status(401).json({error:"Access denied"});
    //find user
    const decoded = jwt.verify(token,"nsdasdsadad23");

    const userId = decoded.indexOf;

    const user = await User.findOne({_id:userId});
    
    return user;
};

module.exports = getUserByToken;