



const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');

// Directory to store all the codes
const dirCodes = path.join(__dirname, 'codes');

// If dirCodes does not exist already, create new (first-time)
if (!fs.existsSync(dirCodes))
    fs.mkdirSync(dirCodes, { recursive: true });

// uuid.cpp file generate with code as content inside the file
const generatePath = async (language, code) => {  
    const fileId = uuid();

    const fileName = `${fileId}.${language}`; // 12345.cpp
    
    const filePath = path.join(dirCodes, fileName); 
    fs.writeFileSync(filePath, code);
     console.log("File path:", filePath);
    return filePath;
};

module.exports = { generatePath };
