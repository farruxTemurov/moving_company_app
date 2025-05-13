let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,                // unique key for email
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    }
})
let userModel = mongoose.model("users", userSchema);    // users is the collection name in MongoDB
module.exports = userModel;
