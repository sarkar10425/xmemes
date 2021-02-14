const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Meme = mongoose.model("Meme");

router.delete("/memes/:id", async (req, res) => {
    try {
		const meme = await Meme.findOne({ _id: req.params.id })
        
		meme.remove()
		res.status(202).send({success: "Meme successfully removed"})
	} catch(err) {
		res.status(404)
		res.send({ error: "Meme doesn't exist!" })
	}
});


module.exports = router
