import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Votereg = () => {
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
    const [otpInput, setOtpInput] = useState("");
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [error, setError] = useState('');
    const [destination, setDestination] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
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

    const handleDestination = (f) => {
        const { value } = f.target;
        setDistrict(value);
        setDestination('If you are testing the app, give your constituency as 1. Bhimavaram, 2. Vizag, 3. Anakapalle');
    };

    const sendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8000/send-otp', { email });
            if (response.data.success) {
                setIsOtpSent(true);
                setOtpVisible(true);
                alert('OTP sent successfully');
            } else {
                alert('Failed to send OTP');
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert('Failed to send OTP');
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8000/verify-otp', { email, otp: otpInput });
            if (response.data.success) {
                setIsOtpVerified(true);
                alert('OTP verified successfully');
            } else {
                alert('Invalid OTP');
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert('Failed to verify OTP');
        }
    };

    const handleSubmit = async () => {
        if (!isOtpVerified) {
            alert("Please verify the OTP before submitting the form.");
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:8000/voter-reg`,
                { name, age, aadhaarNumber, address, district, qualification, caste, phone, email, nri }
            );
            console.log(response.data);
            if (response.data.success) {
                nav('/login');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            <div>
                <h2>User Information Form</h2>

                <label htmlFor="name">Name:</label><br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br /><br />

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

                <label htmlFor="address">Address:</label><br />
                <textarea
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="district">Consistuency:</label><br />
                <input
                    type="text"
                    id="district"
                    name="district"
                    value={district}
                    onChange={handleDestination}
                    required
                />
                {destination && <p style={{ color: 'red' }}>{destination}</p>}
                <br />

                <label htmlFor="qualification">Qualification:</label><br />
                <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="caste">Caste:</label><br />
                <input
                    type="text"
                    id="caste"
                    name="caste"
                    value={caste}
                    onChange={(e) => setCaste(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="phone">Phone Number:</label><br />
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="email">Email:</label><br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br /><br />

                <button
                    type="button"
                    onClick={sendOtp}
                    disabled={isOtpSent}
                >
                    Send OTP
                </button><br /><br />

                {otpVisible && (
                    <>
                        <label htmlFor="otp">Enter OTP:</label><br />
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                            required
                        /><br /><br />
                        <button type="button" onClick={verifyOtp}>Verify OTP</button><br /><br />
                    </>
                )}

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

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isOtpVerified}
                >
                    Submit
                </button>
            </div>
        </>
    );
};

export default Votereg;
