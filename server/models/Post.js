const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true,
  },
  user:{
    type: String,
    required:true
  }
});

const PostModel = mongoose.model("posts", PostSchema);
module.exports = PostModel;
