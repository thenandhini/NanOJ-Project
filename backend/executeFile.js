





const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');


//C:\Users\Nandhini\Desktop\NanOJ-Compiler-Pract\backend\outputs
const outputPath = path.join(__dirname, 'outputs');
//console.log(outputPath);


// If dirCodes does not exist already, create new (first-time)
if (!fs.existsSync(outputPath))
    fs.mkdirSync(outputPath, { recursive: true });

// uuid.cpp file generate with code as content inside the file
const executeFile = async (filePath,input_filePath) => {  
    
    const fileId= path.basename(filePath).split(".")[0];//1234.cpp 
    const output_filename=`${fileId}.out`;
    const outPath=path.join(outputPath,output_filename);
 
 //C:\Users\Nandhini\Desktop\NanOJ-Compiler-Pract\backend\outputs\6bde5772-c411-4fbf-a62c-df2207050148.exe        
    console.log(input_filePath);

    return new Promise((resolve,reject)=>{

      
       
        exec(`g++ ${filePath} -o ${outPath} && ${outPath} < ${input_filePath}`,

            (error,stdout,stderr)=>{
                if(error){
                    console.log(error)
                    reject({error,stderr});
                }
                    
                if(stderr)
                {
                    reject(stderr);
                    console.log(error);
                   
                }

                resolve(stdout);
               
            }

        );


    });

   
};

module.exports = {executeFile};
