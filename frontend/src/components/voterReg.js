import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Votereg = () => {
    // State variables
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [qualification, setQualification] = useState("");
    const [caste, setCaste] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [nri, setNri] = useState("");
    const [otpVisible, setOtpVisible] = useState(false);
    const [otpVal, setOtpVal] = useState("");
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [error, setError] = useState('');
  
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
    

    // Load the smtp.js script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://smtpjs.com/v3/smtp.js";
        script.async = true;
        document.head.appendChild(script);
        
        // Cleanup function
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // Function to handle form submission
    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/voter-reg/${name}/${age}/${aadhaarNumber}/${address}/${district}/${qualification}/${caste}/${phone}/${nri}`
            );
            console.log(response.data);
            // Add navigation if needed
            // navigate("/next-route");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    // Function to send OTP
    const sendOtp = async () => {
        // Retrieve the email input from the user
        const emailInputElement = document.getElementById("email");
        const email = emailInputElement.value;
    
        // Validate the email input
        if (!email || !validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        const generatedOtp = Math.floor(Math.random() * 10000);
        setOtpVal(generatedOtp.toString());
        
    
        const emailBody = `<h2>Your OTP is:</h2> ${generatedOtp}`;
    
        // Send the OTP using smtp.js
        window.Email.send({
            SecureToken: "6a35dbc0-d012-465f-bbc4-4353b813db71",
            To: email,
            From: "pranayerra2003@gmail.com",
            Subject: "Email OTP using JavaScript",
            Body: emailBody,
        }).then((message) => {
            console.log("SMTP.js message response:", message);
            if (message === "OK") {
                alert(`OTP sent to your email ${email}`);
                setOtpVisible(true);
            } else {
                alert("Failed to send OTP. Please try again.");
                console.error("Failed to send OTP. Response:", message);
            }
        }).catch((error) => {
            alert("Failed to send OTP. Please try again.");
            console.error("SMTP.js error:", error);
        });
    };
    
    // Function to validate email using a regular expression
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    
    return (
        <>
            <div>
                <h2>User Information Form</h2>

                {/* Name */}
                <label htmlFor="name">Name:</label><br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br /><br />

                {/* Age */}
                <label htmlFor="age">Age:</label><br />
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                /><br /><br />

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
                {/* Address */}
                <label htmlFor="address">Address:</label><br />
                <textarea
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                /><br /><br />

                {/* District */}
                <label htmlFor="district">District:</label><br />
                <input
                    type="text"
                    id="district"
                    name="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                /><br /><br />

                {/* Qualification */}
                <label htmlFor="qualification">Qualification:</label><br />
                <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    required
                /><br /><br />

                {/* Caste */}
                <label htmlFor="caste">Caste:</label><br />
                <input
                    type="text"
                    id="caste"
                    name="caste"
                    value={caste}
                    onChange={(e) => setCaste(e.target.value)}
                    required
                /><br /><br />

                {/* Phone Number */}
                <label htmlFor="phone">Phone Number:</label><br />
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                /><br /><br />

                {/* Email */}
                {/* <label htmlFor="email">Email:</label><br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br /><br /> */}

                {/* Send OTP Button */}
                {/* <button type="button" onClick={sendOtp}>Send OTP</button><br /><br /> */}

                {/* OTP Field (conditionally rendered) */}
                {/* {otpVisible && (
                    <>
                        <div className="otpverify">
                            <input
                                type="text"
                                id="otp_inp"
                                placeholder="Enter the OTP sent to your Email..."
                                required
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const inputOtp = document.getElementById("otp_inp").value;
                                    if (inputOtp === otpVal) {
                                        alert("OTP verified successfully!");
                                    } else {
                                        alert("Invalid OTP. Please try again.");
                                    }
                                }}
                            >
                                Verify OTP
                            </button>
                        </div>
                    </>
                )} */}

                {/* NRI (Yes or No) */}
                <label>NRI:</label><br />
                <div>
                    <input
                        type="radio"
                        id="nri_yes"
                        name="nri"
                        value="yes"
                        onChange={(e) => setNri(e.target.value)}
                        required
                    />
                    <label htmlFor="nri_yes">Yes</label><br />
                    <input
                        type="radio"
                        id="nri_no"
                        name="nri"
                        value="no"
                        onChange={(e) => setNri(e.target.value)}
                        required
                    />
                    <label htmlFor="nri_no">No</label><br /><br />
                </div>

                {/* Submit Button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </>
    );
};

export default Votereg;
