const express =  require('express')
const router = express.Router()
const UserController = require('../controller/UserController');
//Helper
    const verifyToken = require('../helpers/check-user')
//User
    router.get('/' , UserController.all);
    router.post('/login',UserController.login);
    router.post('/user', UserController.newUser);
    router.delete('/user/:id', verifyToken ,UserController.deleteUser);


module.exports = router