import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Votereg from './components/voterReg/voterReg';
import Display_candidate from './components/display-candidate/displayCandidate';
import Candidate_reg from './components/candidateReg/candidateReg';
import Login from './components/login/login';
import Admin_login from './components/admin/adminLogin';
import Admin_voter from './components/admin/adminVoter';
import Admin_candidate from './components/admin/adminCandidate';
import Admin_home from './components/admin/adminHome';
import Home from './Home';
import ProtectedRoute from './protectedRoute';
import ProtectedAdmin from './protectedAdmin';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/voter-reg' element={<Votereg />} />
        <Route path='/candidate-reg' element={<Candidate_reg />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin-login' element={<Admin_login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path='/display-candidate' element={<Display_candidate />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>

        <Route element={<ProtectedAdmin />}>
          <Route path='/admin-voter' element={<Admin_voter />} />
          <Route path='/admin-candidates' element={<Admin_candidate />} />
          <Route path='/admin-home' element={<Admin_home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
