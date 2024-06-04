import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./adminLogin.css"; // Import CSS file for styling

const AdminLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/admin-login/${name}/${password}`);
      console.log(response.data);
      if (response.data) {
        toast.success("Login successful");
        setTimeout(() => {
          nav('/admin-home');
        }, 4000); // Delay to allow the toast to be seen before navigation
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
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <label>Password</label>
        </div>
        <button type="button" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
