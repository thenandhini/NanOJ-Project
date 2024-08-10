


import React from 'react';
import Table from './Components/Table.jsx';
import SubmissionHistoryTable from './Components/SubmissionHistoryTable.jsx'; // Import if needed for local display
import { useNavigate } from 'react-router-dom';
import './ProblemList.css'; // Ensure proper styling is applied

const ProblemList = () => {
    const navigate = useNavigate();

    const handleViewSubmissionHistory = () => {
        navigate('/submission-history'); // Navigate to the submission history page
    };
    const handleBackToLogin = () => {
        navigate('/'); // Navigate to the submission history page
    };

    return (
        <div className='problem-list-page'>

        <div className="title-elements">

            
            <button className='submission-history-button' onClick={handleBackToLogin}>Back to Login</button>         
            <div className="problem-list-heading">Problem List</div>
            <button className='submission-history-button' onClick={handleViewSubmissionHistory}>Submission History</button>  
        
             

        </div>

        <div className="problem-list">
            <Table />     
        </div>    


        </div> 

           
   
        

    );
};

export default ProblemList;
