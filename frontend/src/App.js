import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Votereg from './components/voterReg';
import Otpentry from './components/otp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/voter-reg' element={<Votereg/>}/>
        <Route path='/otp-entry' element={<Otpentry/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
