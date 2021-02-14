const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true
    },
})

mongoose.model("Meme", memeSchema)

