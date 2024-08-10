const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');


//C:\Users\Nandhini\Desktop\NanOJ-Compiler-Pract\backend\outputs
const inputPath= path.join(__dirname, 'inputs');
//console.log(outputPath);


// If dirCodes does not exist already, create new (first-time)
if (!fs.existsSync(inputPath))
    fs.mkdirSync(inputPath, { recursive: true });

// uuid.cpp file generate with code as content inside the file


const generateInputFile = async (input) => {  
    
    const fileId= uuid();//
    const input_filename=`${fileId}.txt`;
    const inPath=path.join(inputPath,input_filename);
    fs.writeFileSync(inPath, input);
    
    return inPath;
 
 //C:\Users\Nandhini\Desktop\NanOJ-Compiler-Pract\backend\outputs\6bde5772-c411-4fbf-a62c-df2207050148.exe        


   
};

module.exports = {generateInputFile};