import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './voterReg.css'; // Ensure this CSS file contains your styles

const Votereg = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [constituency, setConstituency] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [otpVisible, setOtpVisible] = useState(false);
    const [otpInput, setOtpInput] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isConstituencyFocused, setIsConstituencyFocused] = useState(false);
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

    const sendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8000/send-otp', { email });
            if (response.data.success) {
                setIsOtpSent(true);
                setOtpVisible(true);
                toast.success('OTP sent successfully');
            } else {
                toast.error('Failed to send OTP');
            }
        } catch (error) {
            toast.error('Failed to send OTP');
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8000/verify-otp', { email, otp: otpInput });
            if (response.data.success) {
                setIsOtpVerified(true);
                toast.success('OTP verified successfully');
            } else {
                toast.error('Invalid OTP');
            }
        } catch (error) {
            toast.error('Failed to verify OTP');
        }
    };

    const handleSubmit = async () => {
        if (!isOtpVerified) {
            toast.warn("Please verify the OTP before submitting the form.");
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:8000/voter-reg/${name}/${age}/${aadhaarNumber}/${address}/${constituency}/${phone}/${email}`,
                { name, lastName, age, aadhaarNumber, address, constituency, phone, email, postalCode, gender, termsAccepted }
            );
            if (response.data.success) {
                nav('/login');
                toast.success('Registration successful');
            }
        } catch (error) {
            toast.error('Error submitting form');
        }
    };

    return (
        <div className="wrapper">
            <ToastContainer />
            <div className="title">
                Registration Form
            </div>
            <div className="form">
                <div className="inputfield">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>  
                <div className="inputfield">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>  
                <div className="inputfield">
                    <label>Age</label>
                    <input
                        type="number"
                        className="input"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>  
                <div className="inputfield">
                    <label>Aadhaar Number</label>
                    <input
                        type="text"
                        className="input"
                        value={aadhaarNumber}
                        onChange={handleChange}
                        maxLength="12"
                        required
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div> 
                <div className="inputfield">
                    <label>Gender</label>
                    <div className="custom_select">
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div> 
                <div className="inputfield">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div> 
                <div className="inputfield">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        className="input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div> 
                <div className="inputfield">
                    <label>Address</label>
                    <textarea
                        className="textarea"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    ></textarea>
                </div> 
                <div className="inputfield">
                    <label>Constituency</label>
                    <input
                        type="text"
                        className="input"
                        value={constituency}
                        onChange={(e) => setConstituency(e.target.value)}
                        onFocus={() => setIsConstituencyFocused(true)}
                        onBlur={() => setIsConstituencyFocused(false)}
                        required
                    />
                    {isConstituencyFocused && (
                        <p>If you are testing, give input as 1. Vizag 2. Bhimavaram 3. Anakapalle</p>
                    )}
                </div> 
                <div className="inputfield">
                    <label>Postal Code</label>
                    <input
                        type="number"
                        className="input"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                </div> 
                <div className="inputfield terms">
                    <label className="check">
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            required
                        />
                        <span className="checkmark"></span>
                    </label>
                    <p>Agreed to terms and conditions</p>
                </div> 
                <div className="inputfield">
                    <input
                        type="button"
                        value="Register"
                        className="btn"
                        onClick={handleSubmit}
                    />
                </div>
                {isOtpSent && (
                    <>
                        <div className="inputfield">
                            <label htmlFor="otp">Enter OTP:</label>
                            <input
                                type="text"
                                className="input"
                                id="otp"
                                value={otpInput}
                                onChange={(e) => setOtpInput(e.target.value)}
                                required
                            />
                        </div>
                        <div className="inputfield">
                            <input
                                type="button"
                                value="Verify OTP"
                                className="btn"
                                onClick={verifyOtp}
                            />
                        </div>
                    </>
                )}
                <div className="inputfield">
                    <input
                        type="button"
                        value="Send OTP"
                        className="btn"
                        onClick={sendOtp}
                        disabled={isOtpSent}
                    />
                </div>
                <div className="inputfield">
                    <p>Already registered? <a href="/login">Sign in</a></p>
                </div>
            </div>
        </div>
    );
};

export default Votereg;
