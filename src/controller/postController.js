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
        const{title, body} = req.body
        if(!title){
            res.status(422).json({message:"mandatory title"})
            return
        }
        if(!body){
            res.status(422).json({message:"mandatory body"})
            return
        }
        try { 
            const newPost = await Post.updateOne({title,body})
            res.status(200).json({message:`Post successfully updated `})

        } catch (error) {
            res.status(500).json({message:`There was an error ${error}`})
        }

    }
    static async getPost(req,res){
        const id = req.params.id
        const validatorId = await Post.findOne({id})
        if(validatorId){
            res.status(200).json({validatorId})
        }else{
            res.status(404).json({ error:"not find post"})
        }
    }
}