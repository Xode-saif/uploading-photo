const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    image:String
})

const UserModel = mongoose.model("photos",userSchema);
module.exports = UserModel