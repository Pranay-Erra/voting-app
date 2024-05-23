import React from "react";
import { useState } from "react";
import axios from "axios";

const Candidate_reg=()=>{
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [qualification, setQualification] = useState("");
    const [caste, setCaste] = useState("");
    const [phone, setPhone] = useState("");
    const [party, setParty] = useState("");
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
  

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/candidate-reg/${name}/${age}/${aadhaarNumber}/${address}/${district}/${qualification}/${caste}/${phone}/${party}`
            );
            console.log(response.data);
            // Add navigation if needed
            // navigate("/next-route");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    return(
        
        <>
            <div>
                <h2>Candidate Registration Form</h2>

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

                

                {/* NRI (Yes or No) */}
                <label>Party</label><br />
                <div>
                    <input
                        type="radio"
                        id="nri_yes"
                        name="nri"
                        value="YSRCP"
                        onChange={(e) => setParty(e.target.value)}
                        required
                    />
                    <label htmlFor="nri_yes">YSRCP</label><br />
                    <input
                        type="radio"
                        id="nri_no"
                        name="nri"
                        value="TDP"
                        onChange={(e) => setParty(e.target.value)}
                        required
                    />
                    <label htmlFor="nri_no">TDP</label><br /><br />
                    <input
                        type="radio"
                        id="nri_no"
                        name="nri"
                        value="JSP"
                        onChange={(e) => setParty(e.target.value)}
                        required
                    />
                    <label htmlFor="nri_no">JSP</label><br /><br />
                    <input
                        type="radio"
                        id="nri_no"
                        name="nri"
                        value="INDEPENDENT"
                        onChange={(e) => setParty(e.target.value)}
                        required
                    />
                    <label htmlFor="nri_no">INDEPENDENT</label><br /><br />
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
    )
}

export default Candidate_reg;