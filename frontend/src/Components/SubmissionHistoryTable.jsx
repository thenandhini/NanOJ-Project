



import React, { useState, useEffect } from 'react';
import axios from 'axios';




const SubmissionHistoryTable = () => {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Get user ID from localStorage
                console.log(userId);
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${userId}/submissions`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
                setError('Error fetching submissions');
            }
        };
        fetchSubmissions();
    }, []);
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleString();};

    return (  
        
       
        <div className="table-container">
            <table className="table-wide text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-lg text-white uppercase bg-purple-700 dark:bg-purple-800 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ProblemId
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Language
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Submission
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.length > 0 ? (
                        submissions.map(submission => (
                            <tr key={submission._id} className="bg-black text-white border-b dark:border-gray-700">
                                <td className="px-6 py-3">{submission.problem_id}</td>
                                <td className="px-6 py-3">{submission.language}</td>
                                <td className="px-6 py-3">{formatDate(submission.submission_time)}</td>
                                <td className="px-6 py-3">{submission.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-data">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>


     
  
);
       
         
      
    


};

export default SubmissionHistoryTable;
