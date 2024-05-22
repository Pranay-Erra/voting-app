import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [party, setParty] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/dashboard", {
        params: { name, party }
      });
      const sortedData = response.data.sort((a, b) => b.votes - a.votes);
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name, party]);

  return (
    <>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Party:
          <input type="text" value={party} onChange={(e) => setParty(e.target.value)} />
        </label>
        <button onClick={fetchData}>Search</button>
      </div>
      <table>
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
