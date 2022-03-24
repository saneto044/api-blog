const mongoose = require('mongoose');
const post = require('../models/Post');
const Post = mongoose.model('Blog',post)

module.exports = class blogController{

    static async allPost(req,res){
       const post = await Post.find()
        res.status(200).json({post})
        console.log(post.title ,post.body)
        return
    }
    static async newPost(req,res){
        const {title, body, } = req.body;

        if(!title){
            res.status(422).json({message:"mandatory title"})
            return
        }
        if(!body){
            res.status(422).json({message:"mandatory body"})
            return
        }
        //colocar o escritor
        try {
            const newPost = new Post({title,body})
            await newPost.save()
            res.status(200).json({message:"Novo post cadastrado"})
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({error:`Deu algum erro ${error}`})
        }
    }
    static async deletePost(req,res){
        const id = req.params.id;
        try {
            const validatorId = await Post.findOne({id})
            validatorId.remove({})
            res.status(200).json({message:"Post delete is success!"})
        } catch (error) {
            res.status(500).json({message:`There was an error`})
        }
    }
    static async updatePost(req,res){
        const{name, body} = req.body
        if(!name){
            res.status(422).json({message:"mandatory name"})
        }
        if(!body){
            res.status(422).json({message:"mandatory body"})
        }
        try {
            const id = req.params.id ;
            const validatorId = await Post.findOne({id})
            const newPost = {name,body}
            
            console.log(validatorId.title, validatorId.body)
            res.status(200).json({validatorId})
        } catch (error) {
            res.status(500).json({message:`There was an error ${error}`})
        }

    }
}