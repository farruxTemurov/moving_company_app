let usersModel = require("../models/users.model");

let signIn = async (user) => {
    let existingUser = await usersModel.findOne({ email: user.email });
    return existingUser;
}


let signUp = async (user) => {
    let existingUser = await usersModel.findOne({ email: user.email });
    if (existingUser) {
        throw new Error("Email already exists");
    } else {
        let newUser = new usersModel(user);
        let result = await newUser.save();
        return result;
    }
}

module.exports = {
    signUp, signIn
}