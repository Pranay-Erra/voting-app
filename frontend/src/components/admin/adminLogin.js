import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin_login = () => {
  // State variables for aadhaar number, error message, name, and constituency
  const [name, setName] = useState('');
  const [password,setPassword]=useState('');
  const nav = useNavigate();


  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/admin-login/${name}/${password}`);
      console.log(response.data);
      if (response.data) {
        nav('/admin-home')
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
        <label>Password:</label>
        <input type="password" placeholder="Enter the password" onChange={(f)=>setPassword(f.target.value)}/>
      </div>
      <button onClick={handleSubmit}>Login</button>
    </>
  );
};

export default Admin_login;
