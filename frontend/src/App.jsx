


import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


import Signup  from './Components/Signup.jsx';
import Compiler from './Compiler.jsx';
import ProblemList from './ProblemList.jsx';

import Login from './Components/Login.jsx';


import SubmissionHistoryPage from './SubmissionHistoryPage.jsx';

function App() {
  const [output, setOutput] = useState('');
  

  return (
    <Router>
 
        <Routes>
          <Route path="/signup" element={<Signup setOutput={setOutput}  />} />
          <Route path="/" element={<Login setOutput={setOutput} />} />
          <Route path="/compiler/:problemId" element={<Compiler setOutput={setOutput} />} />
          <Route path="/problemlist" element={<ProblemList setOutput={setOutput} />} />
          <Route path="/submission-history" element={<SubmissionHistoryPage  />} />
          
          
        </Routes>
        {output && <div>{output}</div>}
      
    </Router>
  );
}

export default App