const jwt = require('jsonwebtoken');

const createdUserToken = async (user, req,res) => {
    const token = jwt.sign(
        //playload data 
        {
            name:user.name,
            id:user._id,
        },
        "nsdasdsadad23"
    );
    res.status(200).json({
        message:"you are autheticated",
        token:token,
        userId:user._id,
        userName:user.name
    });

};
module.exports = createdUserToken;