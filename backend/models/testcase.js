





const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({

    problem_id:
    {
        type: mongoose.Schema.Types.ObjectId, ref: "Problem",
        required: true
    },
    input: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true,
    }
})


const TestCase = mongoose.model("testCase",testCaseSchema);

module.exports = TestCase;