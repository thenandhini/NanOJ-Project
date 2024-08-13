



import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { useLocation ,useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './compiler.css';
import axios from 'axios';

function Compiler() {
  const location = useLocation();
  const { problemId } = useParams();
  const [code, setCode] = useState(
    ``
  );
  const navigate=useNavigate();
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(''); // State for storing submission status
  const description = location.state?.description || '';
 

  console.log(problemId);

  const handleRun = async () => {
    const payload = {
      language: 'cpp',
      code,
      input,
    };

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/run`, payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async () => {
    const payload = {
        language: 'cpp',
        code,
    };

    try {
        const token = localStorage.getItem('token'); // Retrieve token from storage
        console.log("Token stored", token);

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/problems/${problemId}/submissions`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        const { submission, results } = response.data || {};
       
        console.log("Submission:", submission);
        console.log("Results:", results);

        if (Array.isArray(results) && results.length > 0) {
            const overallStatus = results.every(result => result.status === "Accepted") ? "Accepted" : "Rejected";
            setSubmissionStatus(overallStatus);
         
            

        } else {
           
            setSubmissionStatus('No results found');
        }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setSubmissionStatus('Compiler Error');}
        else{

        
        console.error('Error fetching problem details:', error);
        setSubmissionStatus('Submission failed');
        }
    }
}


const handleBackToProblemList=()=>{
  navigate('/problemlist');
}
  

  return (
    <div className="body">
      <button className='navigation-button' onClick={handleBackToProblemList}>
        Back to Problem List
      </button>
      <div className="problemContainer">
        
      <textarea
          placeholder="Question Description"
          value={description}
          readOnly
          className="child1"
        />
        <div className="child2 ">
          <select className="select-lang pl-4">
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
          </select>
          <textarea
            placeholder="Enter your code here"
            className="code-box"
            onChange={e => setCode(e.target.value)}
          />
        </div>
        <div className="child3">
          <textarea
            placeholder="Input"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="input-box text-white placeholder:text-white pl-4" 
          />
          <textarea
            placeholder="Output"
            value={output}
            onChange={e => setInput(e.target.value)}
            className="output-box text-white placeholder:text-white pl-4"
          />
          <div className="operations">
            <button className='final-button' onClick={handleRun}>Run</button>
            <button className='final-button' onClick={handleSubmit}>Submit</button>
          </div>

          
          {submissionStatus && (
            <div className="submission-status">
              <h3>Submission Status:</h3>
              <p>{submissionStatus}</p>
            
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compiler;