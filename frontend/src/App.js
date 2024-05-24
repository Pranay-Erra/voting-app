import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Votereg from './components/voterReg';
import Display_candidate from './components/displayCandidate';
import Candidate_reg from './components/candidateReg';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Admin_login from './components/admin/adminLogin';
import Admin_voter from './components/admin/adminVoter';
import Admin_candidate from './components/admin/adminCandidate';
import Admin_home from './components/admin/adminHome';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/voter-reg' element={<Votereg/>}/>
        <Route path='/candidate-reg' element={<Candidate_reg/>}/>
        <Route path='/display-candidate' element={<Display_candidate/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin-login' element={<Admin_login/>}/>
        <Route path='/admin-voter' element={<Admin_voter/>}/>
        <Route path='/admin-candidates' element={<Admin_candidate/>}/>
        <Route path='/admin-home' element={<Admin_home/>}/>
        {/* <Route path='/otp-entry' element={<Otpentry/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
