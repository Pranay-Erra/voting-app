import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [error, setError] = useState('');
    const [n,setN]=useState('');
    const [c,setC]=useState('');  
    const nav=useNavigate();
    localStorage.place=c;
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

    const handleSubmit= async() => {
        const  response = await axios.get("http://localhost:8000/login/"+n+"/"+aadhaarNumber+"/"+c);
        console.log(response.data);
        if(response.data)
        {
            nav('/display-candidate')
        }
        else
        {
            alert("Failed")
        }
      };
    return(
        <>
            <h1>Login</h1>
            <label>Name:</label>
            <input type="text" placeholder="Enter the name" onChange={(e)=>setN(e.target.value)}/>
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
            <label>Name of constituency:</label>
            <input type="text" placeholder="Enter the name" onChange={(f)=>setC(f.target.value)}/>
            <button onClick={handleSubmit}>Login</button>
        </>
    )
}

export default Login;