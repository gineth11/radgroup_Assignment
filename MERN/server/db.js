const mongoose = require("mongoose");

const client=mongoose.connect("mongodb://localhost:27017/pet", {
    useNewUrlParser: true,
})
if (client) {
    console.log("connected")
}
const Database = mongoose.connection;

module.exports = {client,Database};