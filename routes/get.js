const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Meme = mongoose.model("Meme")

router.get('/memes', async (req, res) => {
    try{
        const posts = await Meme.find()
        res.status(200).json({data: posts})
    }catch(err){
        res.status(404).json({error: err})
    }
})

router.get('/memes/:id', async (req, res) => {
    try{
        const posts = await Meme.find({_id: req.params.id})
        res.status(200).json({data: posts})
    }catch(err) {
        res.status(404).json({error: err})
    }
})

module.exports = router