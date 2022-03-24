const mongoose = require('mongoose')
const user = require('../models/User')
const User = mongoose.model('User',user)
const brcypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//helpers 
    const createdUserToken = require('../helpers/create-user-token')

module.exports = class controller{
    static all(req,res){
      res.status(200).json({message:"Tudo ok!"})
    }  
    static async login(req,res){
        const {name , email} = req.body;
    
        if(!name){
            res.status(422).json({message:'Required fields'})
            return
        }
        if(!name){
            res.status(422).json({message:'Required fields'})
            return
        }
        const user = await User.findOne({email:email})
        console.log(user)
        res.status(200).json({message:'Passei por tudo'})
    }
    static async newUser(req,res){
        const {name , email, confirmPassword,password } = req.body;
        const validatorEmail = await User.findOne({email})
        
        if(!name){
            res.status(422).json({message:'the field is mandatory'})
            console.log(name)
            return
        }
        if(!email){
            res.status(422).json({message:'the field E-MAIL is mandatory'})
            return
        }
        if(validatorEmail){
            res.status(422).json({message:'E-mail already registered '})
            return
        }
        if(!password){
            res.status(422).json({message:'The password is mandatory'});
            return
        }
        if(password.length <= 4 ){
            res.status(422).json({message:'The password must be longer than 4 charaters'})
            return
        }
        if(!confirmPassword){
            res.status(422).json({message:'The password is mandatory'})
            return
        }
        if(confirmPassword != password){
            res.status(422).json({message:"passwords are not similar"})
            return
        }       
        
        try {
            const salt = await brcypt.genSalt(12)
            const passwordHash = await brcypt.hash(password,salt)
            const newUser = new User({name,email, password:passwordHash})
            await newUser.save();
            await createdUserToken(newUser,req,res)
            return
        } catch (error) {
            console.log(error)
        }

        
    }

    static async deleteUser(req,res){
        var checkId = req.params.id
            const destroyId = await User.findOne({id:checkId})
            await destroyId.remove()
            res.status(200).json({message:`Usuario removido com sucesso ${destroyId}`})
    }
    
}