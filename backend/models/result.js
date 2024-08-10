


const mongoose=require("mongoose");

const resultSchema=({
    
    submission_id:
    {
        type:mongoose.Schema.Types.ObjectId,ref:"Submission",
        required:true,
    },

    testcase_id:{
        type:mongoose.Schema.Types.ObjectId,ref:"TestCase",
        required:true,
    },

    status:
    {
        type:String,
        required:true,
        enum:["Accepted","WrongAnswer", "CompilerError","RunTimeError"],

    },

});
    const Result=mongoose.model("Result",resultSchema);
    
    module.exports=Result;




