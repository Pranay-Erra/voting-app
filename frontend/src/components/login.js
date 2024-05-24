import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State variables for aadhaar number, error message, name, and constituency
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [constituency, setConstituency] = useState('');  
  const nav = useNavigate();

  // Function to validate Aadhaar number
  const validateAadhaar = (value) => {
    const aadhaarRegex = /^\d{12}$/;
    if (aadhaarRegex.test(value)) {
      setError('');
    } else {
      setError('Aadhaar number must be a 12-digit numeric value.');
    }
  };

  // Handle changes in the Aadhaar number input field
  const handleChange = (e) => {
    const { value } = e.target;
    setAadhaarNumber(value);
    validateAadhaar(value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/login/${name}/${aadhaarNumber}/${constituency}`);
      console.log(response.data);
      if (response.data) {
        localStorage.setItem('place', constituency);  // Storing constituency in localStorage
        nav('/display-candidate');  // Redirect to display-candidate page
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login", error);
      alert("An error occurred during login");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          placeholder="Enter the name" 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="aadhaar">Aadhaar Number:</label>
        <input
          type="text"
          id="aadhaar"
          value={aadhaarNumber}
          onChange={handleChange}
          maxLength="12"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div>
        <label>Name of constituency:</label>
        <input 
          type="text" 
          placeholder="Enter the name" 
          onChange={(e) => setConstituency(e.target.value)} 
        />
      </div>
      <button onClick={handleSubmit}>Login</button>
    </>
  );
};

export default Login;
