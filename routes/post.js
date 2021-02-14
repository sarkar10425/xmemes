const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Meme = mongoose.model("Meme")

router.post('/memes', async (req, res) => {

    try{
        const {name, url, caption} = req.body

        
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator


        if(pattern.test(url)){
            return res.status(422).json({error: "Please enter a valid url"})
        }
        

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
