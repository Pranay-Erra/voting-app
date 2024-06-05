import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './login.css'; // Assuming you have CSS for the template

const Login = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [constituency, setConstituency] = useState('');  
  const nav = useNavigate();

  const validateAadhaar = (value) => {
    const aadhaarRegex = /^\d{12}$/;
    if (aadhaarRegex.test(value)) {
      setError('');
    } else {
      setError('Aadhaar number must be a 12-digit numeric value.');
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setAadhaarNumber(value);
    validateAadhaar(value);
  };

  const handleSubmit = async () => {
    if (error) {
      toast.error(error);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8000/login/${name}/${aadhaarNumber}/${constituency}`);
      console.log(response.data);
      if (response.data) {
        localStorage.setItem('authToken', 'your-auth-token'); // Set a dummy auth token
        localStorage.setItem('place', constituency); // Save the constituency to localStorage
        toast.success("Login successful");
        nav('/display-candidate');
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="login-box">
      <ToastContainer />
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input
            type="text"
            required=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Name</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            required=""
            id="aadhaar"
            value={aadhaarNumber}
            onChange={handleChange}
            maxLength="12"
          />
          <label>Aadhaar Number</label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="user-box">
          <input
            type="text"
            required=""
            value={constituency}
            onChange={(e) => setConstituency(e.target.value)}
          />
          <label>Name of Constituency</label>
        </div>
        <button className="login-button" type="button" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
