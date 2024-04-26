import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import firebase from "./firebase";
const Votereg=()=>{
const [n, setN] = useState('');
const [a, setA] = useState('');
const [b, setB] = useState('');
const [c, setC] = useState('');
const [d, setD] = useState('');
const [e, setE] = useState('');
const [f, setF] = useState('');
const [g, setG] = useState('');
const [otpVisible,setotpVisible]=useState('');
const [o,setO]=useState('');
const nav=useNavigate();
const handleSubmit= async() => {
    const  response = await axios.post("http://localhost:8000/voter-reg/"+a+"/"+b+"/"+c+"/"+d+"/"+e+"/"+f+"/"+g+"/"+n);
    console.log(response.data);
    
  };
    const handleSendOtp=()=>{
        return(
            setotpVisible(true)
        )
    }
    //OTP FUNTIONALITY*************************************************************************//
    
    return(
        <>
        <div>
            
                <div id="sign-in-button"></div>
        <h2>User Information Form</h2>
            
                {/* Name */}
                <label>Name:</label><br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(f)=>setA(f.target.value)}
                    required
                /><br /><br />

                {/* Age */}
                <label htmlFor="age">Age:</label><br />
                <input
                    type="number"
                    id="age"
                    name="age"
                    onChange={(g)=>setB(g.target.value)}
                    required
                /><br /><br />

                {/* Address */}
                <label htmlFor="address">Address:</label><br />
                <textarea
                    id="address"
                    name="address"
                    onChange={(t)=>setC(t.target.value)}
                    required
                /><br /><br />

                {/* District */}
                <label htmlFor="district">District:</label><br />
                <input
                    type="text"
                    id="district"
                    name="district"
                    onChange={(h)=>setD(h.target.value)}
                    required
                /><br /><br />

                {/* Qualification */}
                <label htmlFor="qualification">Qualification:</label><br />
                <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    onChange={(i)=>setE(i.target.value)}
                    required
                /><br /><br />

                {/* Caste */}
                <label htmlFor="caste">Caste:</label><br />
                <input
                    type="text"
                    id="caste"
                    name="caste"
                    onChange={(u)=>setF(u.target.value)}
                    required
                /><br /><br />
                <form >
                {/* Phone Number */}
                <label htmlFor="phone">Phone Number:</label><br />
                <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    onChange={(p)=>setG(p.target.value)}
                    required
                /><br /><br />
                </form>
                <form >
                {/* Send OTP Button */}
                <button type="button" onClick={handleSendOtp}>Send OTP</button><br /><br />

                {/* OTP Field (conditionally rendered) */}
                {otpVisible && (
                    <>
                        <label htmlFor="otp">OTP:</label><br />
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            
                            required
                        /><br /><br />
                    </>
                )}
                </form>
                {/* NRI (Yes or No) */}
                <label>NRI:</label><br />
                <div>
                    <input
                        type="radio"
                        id="nri_yes"
                        name="nri"
                        value="yes"
                        onChange={(q)=>setN(q.target.value)}
                        required
                    />
                    <label htmlFor="nri_yes">Yes</label><br />
                    <input
                        type="radio"
                        id="nri_no"
                        name="nri"
                        value="no"
                        onChange={(q)=>setO(q.target.value)}
                        required
                    />
                    <label htmlFor="nri_no">No</label><br /><br />
                </div>

                {/* Submit Button */}
                <button type="button" onClick={handleSubmit} >Submit</button>
                
        </div>


        </>
    );
}



export default Votereg;