



const fs = require("fs");
const { promisify } = require("util");
const { generatePath } = require("./generatePath.js");
const { executeFile } = require("./executeFile.js");

const readFileAsync = promisify(fs.readFile);

const runTest = async (submission, testcase) => {
    const code = submission.code;
    const language = submission.language; // Ensure the language is taken from the submission
    const input = testcase.input
    const output=testcase.output;
    const problem_id=testcase.problem_id;
     // testcases/pid_date_input.txt



    const inputFilePath = `./testcases/${problem_id}_${Date.now()}_input.txt`;
    const outputFilePath = `./testcases/${problem_id}_${Date.now()}_output.txt`;
    fs.writeFileSync(inputFilePath,input);
    fs.writeFileSync(outputFilePath,output);
    // testcases/pid_date_output.txt


    try {
        console.log("Hayagreevar!");
        console.log("TestCaseObject:",testcase);
        console.log("Code:", code);
        console.log("Language:", language);
        console.log("Input file path:", inputFilePath);
        console.log("Output file path:", outputFilePath);
        
    

        let executionResult;
        if (language === "cpp") {
            // For C++ code
            const codePath = await generatePath(language, code); // Ensure await is used here
            console.log("Generated code path:", codePath);

            executionResult = await executeFile(codePath, inputFilePath);
        } else {
            throw new Error(`Unsupported language: ${language}`);
        }

        // Compare output with expected output
        const expectedOutput = await readFileAsync(outputFilePath, "utf8");
        const actualOutput = executionResult.trim();
        const status = actualOutput === expectedOutput.trim() ? "Accepted" : "WrongAnswer";
        console.log(status);

        // Create result object
        return {
            
            status: status,
            testcase_id: testcase._id,
            submission_id: submission._id,
            
            // execution_time: executionResult.executionTime,
            // memory_usage: executionResult.memoryUsage,
        };
       
    } catch (error) {
        let status = "CompilerError"; // default to CompilerError
        if (error.message.includes("Runtime")) {
            status = "RunTimeError";
        }
        console.log(status);
        return {
            status: status,
            testcase_id: testcase._id,
            submission_id: submission._id,
           
        };
    }
};

module.exports = runTest;
