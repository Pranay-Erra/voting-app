import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";  // Ensure to create and import a CSS file for styling
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [party, setParty] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dvp.onrender.com/dashboard", {
        params: { name, party }
      });
      const sortedData = response.data.sort((a, b) => b.votes - a.votes);
      setData(sortedData);
    } catch (error) {
      // console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [name, party]);

  return (
    <>
      <div className="search-fields">
      <ToastContainer />
        <label>
          Name:
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Party:
          <input
            type="text"
            className="input"
            value={party}
            onChange={(e) => setParty(e.target.value)}
          />
        </label>
        <button className="search-button" onClick={fetchData}>Search</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Party</th>
            <th>Votes Received</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.party}</td>
              <td>{item.votes !== undefined ? item.votes : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
