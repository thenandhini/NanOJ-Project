


const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId, ref: "User",
            required: true

        },
        problem_id: {
            type: mongoose.Schema.Types.ObjectId, ref: "Problem",
            required: true
        },

        language: {
            type: String,
            required: true,
            enum: ["cpp", "c", "python"],
            default: "cpp"

        },
        code: {
            type: String,
            required: true,
        },

        submission_time: {

            type: Date,
            default: Date.now
        }
        ,
        status: {

            type: String,
            required: true
        }

    });


const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;