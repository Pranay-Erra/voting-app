import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Votereg from './components/voterReg';
import Display_candidate from './components/displayCandidate';
import Candidate_reg from './components/candidateReg';
import Dashboard from './components/dashboard';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/voter-reg' element={<Votereg/>}/>
        <Route path='/candidate-reg' element={<Candidate_reg/>}/>
        <Route path='/display-candidate' element={<Display_candidate/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        {/* <Route path='/otp-entry' element={<Otpentry/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
