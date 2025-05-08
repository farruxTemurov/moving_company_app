let mongoose = require('mongoose');
let dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
let MongoDbConnect = async () => {
    try{
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("MongoDB connected successfully");    
    }catch(err){
        console.log(err);
    }
}

module.exports ={
    MongoDbConnect
}