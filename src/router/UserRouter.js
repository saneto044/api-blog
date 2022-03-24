const express =  require('express')
const router = express.Router()
const controller = require('../controller/UserController');
//User
    router.get('/' , controller.all);
    router.post('/login',controller.login);
    router.post('/user', controller.newUser);
    router.delete('/user/:id', controller.deleteUser);
    
module.exports = router