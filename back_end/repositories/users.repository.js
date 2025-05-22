let usersModel = require("../models/users.model");

let signIn = async (user) => {
    let existingUser = await usersModel.findOne({ email: user.email });
    return existingUser;
}


let signUp = async (user) => {
    let existingUser = await usersModel.findOne({ email: user.email });
    if (existingUser) {
        let err = new Error("Email already exists");
        err.status = 409; // Conflict
        throw err;
    }

    let newUser = new usersModel(user);
    return await newUser.save();
};


module.exports = {
    signUp, signIn
}