const mongoose=require('mongoose');
//urls from .env =>dot env imported
const dotenv=require('dotenv');
//configure
dotenv.config();

//db connection
const DBConnection= async()=>{
    //url obtained from env
    const MONGO_DB_URL=process.env.MONGO_DB_URI;
    try{

        await mongoose.connect(MONGO_DB_URL,{useNewUrlParser:true});
        console.log("DB Connection established");

    }
    catch(error)
    {
        console.log("Error connecting to MongoDB"+error);
    }
}
//export established connection
module.exports= {DBConnection};


