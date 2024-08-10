


import React from 'react';
import SubmissionHistoryTable from './Components/SubmissionHistoryTable.jsx';
import './SubmissionHistoryPage.css'; // Ensure proper styling is applied
import { useLocation ,useNavigate} from 'react-router-dom';


const SubmissionHistoryPage = () => {

    const navigate=useNavigate();
    const handleBackToProblemList=()=>{
        navigate('/problemlist');
      }

    const handleBackToLogin=()=>{
        navigate('/login');
    }
    return (

        <div className="submission-history-page">
            
            <div className="navigation">                  

                    <button className='nav-problem-page' onClick={handleBackToProblemList} >
                    Back to Problem List
                    </button>
                    <button className='nav-login-page' onClick={handleBackToLogin} >
                    Back to Login
                    </button>
                    
                  </div>
                    
            <div className='submission-heading'>Submission History</div>
           
           
            
           
            <SubmissionHistoryTable />
        </div>
    );
};

export default SubmissionHistoryPage;
