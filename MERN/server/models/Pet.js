const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    owner: {
        type: String,
        required: false,
    },
    tp: {
        type: String,
        required: false,
    }
});

const PetModel = mongoose.model("pet", PetSchema);
module.exports = PetModel;