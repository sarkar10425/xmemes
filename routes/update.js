const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Meme = mongoose.model("Meme");

router.patch("/memes/:id", async (req, res) => {
    try {
		const meme = await Meme.findOne({ _id: req.params.id })

		if(!req.body.url && !req.body.caption){
			return res.status(422).json({error: "Please add all the fields"})
		}
        
		if (req.body.url) {
			meme.url = req.body.url
		}

		if (req.body.caption) {
			meme.caption = req.body.caption
		}

		await meme.save()
		res.json({success: "Meme successfully updated!"})
	} catch(err) {
		res.status(404)
		res.json({ error: "Meme not found" })
	}
});


module.exports = router