import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './candidateReg.css';

const CandidateReg = () => {
  const [name, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [constituency, setConstituency] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [party, setParty] = useState("");
  const [partySymbol, setPartySymbol] = useState(null);
  const [error, setError] = useState("");

  const validateAadhaar = (value) => {
    const aadhaarRegex = /^\d{12}$/;
    if (aadhaarRegex.test(value)) {
      setError("");
    } else {
      setError("Aadhaar number must be a 12-digit numeric value.");
    }
  };

  const handleAadhaarChange = (e) => {
    const { value } = e.target;
    setAadhaarNumber(value);
    validateAadhaar(value);
  };

  const handleFileChange = (e) => {
    setPartySymbol(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastName", lastName);
    formData.append("age", age);
    formData.append("aadhaarNumber", aadhaarNumber);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("constituency", constituency);
    formData.append("postalCode", postalCode);
    formData.append("party", party);
    formData.append("partySymbol", partySymbol);

    try {
      const response = await axios.post(
        "http://localhost:8000/candidate-reg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      toast.success("Candidate registered successfully");
    } catch (error) {
      // console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="title">Candidate Registration Form</div>
      <form className="form" onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="inputfield">
          <label>First Name</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        {/* Last Name */}
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

        {/* Age */}
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

        {/* Aadhaar Number */}
        <div className="inputfield">
          <label>Aadhaar Number</label>
          <input
            type="text"
            className="input"
            value={aadhaarNumber}
            onChange={handleAadhaarChange}
            maxLength="12"
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        {/* Gender */}
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

        {/* Email Address */}
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

        {/* Phone Number */}
        <div className="inputfield">
          <label>Phone Number</label>
          <input
            type="tel"
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Address */}
        <div className="inputfield">
          <label>Address</label>
          <textarea
            className="textarea"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Constituency */}
        <div className="inputfield">
          <label>Constituency</label>
          <input
            type="text"
            className="input"
            value={constituency}
            onChange={(e) => setConstituency(e.target.value)}
            required
          />
        </div>

        {/* Postal Code */}
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

        {/* Party */}
        <div className="inputfield">
          <label>Party</label>
          <div className="custom_select">
            <select
              value={party}
              onChange={(e) => setParty(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="JSP">JSP</option>
              <option value="TDP">TDP</option>
              <option value="YSRCP">YSRCP</option>
              <option value="INDEPENDENT">INDEPENDENT</option>
            </select>
          </div>
        </div>

        {/* Party Symbol */}
        <div className="inputfield">
          <label htmlFor="partySymbol">Party Symbol</label>
          <input
            type="file"
            className="input"
            id="partySymbol"
            name="partySymbol"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="inputfield">
          <input type="submit" value="Register" className="btn" />
        </div>
      </form>
    </div>
  );
};

export default CandidateReg;
