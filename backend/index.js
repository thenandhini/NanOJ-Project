




const express=require('express');

const app=express();//initialise express

const {DBConnection}=require('./database/db.js');//see if connection is established or not

const User=require('./models/user.js');

require('dotenv').config();
const crud=require('./crud.js');

const bcrypt=require('bcryptjs');//bcrypt 
const jwt=require('jsonwebtoken');//webtoken
const cookieParser=require('cookie-parser');//import cookie parser
const authenticateUser = require('./middlewares/authenticateUser');

const {generatePath}=require('./generatePath.js');
const{generateInputFile}=require('./generateInputFile.js');
const{executeFile}=require('./executeFile.js');


const cors = require('cors');



const prodOrigins = [
    "https://nan-oj-project-git-main-nandhinihgrs-projects.vercel.app",
   "https://nan-oj-project.vercel.app/",
    "https://nan-oj-project.vercel.app",
    "https://nan-oj-project-git-main-nandhinihgrs-projects.vercel.app/"
  ];

  const allowedOrigins = prodOrigins;
  app.use(
    cors({
      origin: (origin, callback) => {
       
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error(`${origin} not allowed by cors`));
          }
        // } else {
        //   callback(null, true);
        // }
      },
      optionsSuccessStatus: 200,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
  );

//mildwares
app.use(express.json()); //to convert data into json format
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


// Establish DB connection
DBConnection();

//authentication:

app.get("/",(req,res)=>{
    console.log('Cookies:',req.cookies);
    res.send("Welcome Hayagreevar!");



});
app.post("/run",async(req,res)=>{
    console.log("found /run");
    const { language = 'cpp', code ,input } = req.body;
    
        // If code is not defined
        if (code === undefined)
            {return res.status(500).json({ "success": false, "message": "Empty code body" });
        
                }
                console.log(code);
    
        try {
            // Generate file path
            const filePath = await generatePath(language, code); // Await the async function
            
           const input_filePath=await generateInputFile(input);
            
            //  "C:\\Users\\Nandhini\\Desktop\\NanOJ-Compiler-Pract\\backend\\codes\\9fff7a31-8f9a-4902-9813-f449aec3396d.cpp"
    
            // You can uncomment and add the logic for execution if needed
            const output = await executeFile(filePath,input_filePath);
            // return generated input file and uuid.exe     
    
           
          
          
            
          
           res.json({output}); 
    
        } catch (error) {
            
            res.status(500).json({ "success": false, "message": error.message });
        }


});

app.post("/signup",async (req,res)=>
{
    const { name, email, password } = req.body;
    try{
        if (!(name && email && password)) {
          return res.status(400).json({ error: "Please enter all the fields!" });
        }
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ error: "User already exists!" });
        }
    
        const hashPassword = bcrypt.hashSync(password, 5);
        const user = await User.create({ name, email, password: hashPassword });
    
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, { expiresIn: "2h" });
        user.token = token;
        user.password = undefined;
    
        res.status(201).json({ message: "You have successfully registered!", user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred. Please try again!" });
      }
    
    });

app.post("/login",async (req,res)=>
{   
    //get all the data from the req body
    const {email,password}=req.body;
    console.log(email,password);
    
     //see if all the fields are present
     if(!( email && password ))
        {
           return res.send("Please enter all the fields!");
        }
try
{       
    //check if user exists already
    const user= await User.findOne({email});
    if(!user)
    {
        return res.send("User does not exist!");
  
    }  
       
    //check if the password matches

    const validPassword= await bcrypt.compare(password,user.password)  //M1
  
    if(!validPassword)
    {
        return res.status(401).send("Incorrect password,kindly enter the correct password");

    }
    

    //give token to the user
    const token= jwt.sign({userId:user._id},process.env.SECRET_KEY,{ //removed email
        expiresIn: "24h"
    });
    
    
    user.token=token; 
    user.password=undefined;

    //store cookie - cookie parser
     const options={
        expires: new Date(Date.now()+24*60*60*1000), 
        httpOnly:true,

     };

  
    // return res.send("Logged in successfully");
    res.status(200).cookie("token", token, options).json({
        message: "You have successfully logged in",
        success: true,
        token,
        userId:user._id, //change
    });

    

    
}


catch(error){
    console.log(error);
    res.send("error");
    }

}); 

// Routes


app.post('/problems', crud.createProblem);

app.get('/problems', crud.getAllProblems);


app.get('/problems/:id', crud.getProblemById);


app.post('/problems/:problemId/submissions', authenticateUser, crud.createSubmission);


app.get('/problems/:problemId/submissions', authenticateUser, crud.getAllSubmissions);

app.post('/problems/:problemId/testcases', crud.addTestCase);

app.get('/user/:userId/submissions',crud.userSubmissionDetails);



app.listen(8000, () => {
    console.log("Server is listening on route  8000");
});
