const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Meme = mongoose.model("Meme")

router.post('/memes', async (req, res) => {

    try{
        const {name, url, caption} = req.body
        

        if(!name || !url|| !caption){
            return res.status(422).json({error: "Please add all the fields"})
        }
        const meme = new Meme({
            name,
            url,
            caption
        })
        const result = await meme.save()
        res.status(201).json({success: "Meme sucessfully posted"})
        
    }catch(err){
        res.status(400).json({error: "Something went wrong!!"})
    }
})

module.exports = router
