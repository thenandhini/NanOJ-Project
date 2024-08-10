




const fs = require("fs");
const { promisify } = require('util');

const Problem = require("./models/problem");

const Submission = require("./models/submission");

const TestCase = require("./models/testcase");
const SubmissionResult = require("./models/result");
const mongoose=require('mongoose');
const ObjectId  = mongoose.Types.ObjectId; 


const runTest = require("./runTest.js");



const writeFileAsync = promisify(fs.writeFile);
/*
const addUsers = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
*/

const createProblem = async (req, res) => {
    try {
        const problem = await Problem.create(req.body);

        res.status(201).json(problem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.json(problems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProblemById = async (req, res) => {
    try {
        const problemId = req.params.problemId;
        const problem = await Problem.findById(problemId);
        //change
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }
        res.json(problem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createSubmission = async (req, res) => {
    try {
        const problemId = req.params.problemId; // No need to create a new ObjectId here
        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            return res.status(400).json({ error: "Invalid problem ID" });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        console.log("Srilakshmihayagreevar");

        const submission = await Submission.create({
            user_id: req.user.userId,
            problem_id: problem._id,
            language: req.body.language,
            code: req.body.code,
            status:'Pending'
           
        });

        const testCases = await TestCase.find({ problem_id: submission.problem_id });
        if (testCases.length === 0) {
            return res.status(400).json({ error: "No test cases found for the given problem." });
        }

        const results = [];
        let overallStatus='Accepted';
       
        for (let testCase of testCases) {
            const result = await runTest(submission, testCase);
            results.push({ ...result, test_case_id: testCase._id, submission_id: submission._id });
            if(result.status!=='Accepted')
            {
                overallStatus='Rejected';
            }
           
        }
        
        
        // await submission.save(); 

        await SubmissionResult.insertMany(results);
        submission.status=overallStatus;
        await submission.save();

        console.log("Results:", results);

        // Send response with both submission and results
        res.status(201).json({
            submission,
            results
         
        });
    } catch (error) {
        console.error("Error in createSubmission:", error);
        res.status(400).json({ error: error.message });
    }
};

/*

const createSubmission = async (req, res) => {
    try {
        const problemId =new ObjectId(req.params.problemId); //change
        if (!mongoose.Types.ObjectId.isValid(req.params.problemId)) {
            return res.status(400).json({ error: "Invalid problem ID" });
        }
        
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }
        
        console.log("Srilakshmihayagreevar");

        const submission = await Submission.create({
            user_id: req.user.userId,
            problem_id: problem._id,
            language: req.body.language,
            code: req.body.code,
        });

        const testCases = await TestCase.find({ problem_id: submission.problem_id });
        if (testCases.length === 0) {
            return res.status(400).json({ error: "No test cases found for the given problem." });
        }

        const results = [];
        for (let testCase of testCases) {
            const result = await runTest(submission, testCase);
            results.push({ ...result, test_case_id: testCase._id, submission_id: submission._id });
        }

        await SubmissionResult.insertMany(results);
        console.log("Results:",results);
        res.status(201).json(submission,results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
/*
const createSubmission = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.problemId);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }
        console.log(req.user);

        const submission = await Submission.create({
            user_id:req.user.userId,
            problem_id: req.params.problemId,
            language: req.body.language,
            code: req.body.code,
        });

        const testCases = await TestCase.find({ problem_id: submission.problem_id });

        const results = [];
        console.log("Hello hgr!");
        for (const testCase of testCases) {

            const result = await runTest(submission, testCase);
            results.push({ ...result, test_case_id: testCase.id, submission_id: submission.id });
        }
        
        await SubmissionResult.insertMany(results);

        res.status(201).json(submission);
    } catch (error) {
        
        console.log("Problem here,HAYAGREEVAR");
        res.status(400).json({ error: error.message });
    }
};*/

const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ problem_id: req.params.problemId, user_id: req.user.id });
        if (!submissions) return res.status(404).json({ error: "Submission not found!" });
        let output = [];
        for (let submission of submissions) {
            const results = await SubmissionResult.find({ submission_id: submission.id }).select("status");
            output.push(
                { language: submission.language,
                     code: submission.code, 
                     submission_time: submission.submission_time,
                     status:submission.status,
                      results });
        }
        res.json(output);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const addTestCase = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.problemId);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        const { input, output } = req.body;

        //const inputFilePath = `./testcases/${problem._id}_${Date.now()}_input.txt`;
        //const outputFilePath = `./testcases/${problem._id}_${Date.now()}_output.txt`;
        
       // console.log("Hayagreevar");
       // console.log(inputFilePath);
       //console.log(outputFilePath);

        //await Promise.all([writeFileAsync(inputFilePath, input), writeFileAsync(outputFilePath, output)]);

        const testcase = await TestCase.create({
            problem_id: req.params.problemId,
            input: input,
            output: output,
        });
        
        console.log(testcase);
        res.status(201).json(testcase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    };

}
    //new change




const userSubmissionDetails=async(req,res)=>{
    try {
        const { userId } = req.params;
        const submissions = await Submission.find({ user_id:userId }); // Assuming you have a userId field in your Submission model

        console.log(userId);
        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found' });
        }

        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
    
    



module.exports = {
    createProblem,
    getAllProblems,
    getProblemById,
    createSubmission,
    getAllSubmissions,
    addTestCase,
    userSubmissionDetails,
   
}