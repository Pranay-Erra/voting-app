import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayCandidate = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [votedCandidates, setVotedCandidates] = useState(new Set());
  const voterPlace = localStorage.getItem('place'); // Get the voter's place from localStorage
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/display-candidate", {
        params: {
          name,
          party,
          district: voterPlace // Include the voter's place in the request parameters
        }
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name, party]);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePartyChange = (e) => setParty(e.target.value);

  const handleVote = async (candidateName) => {
    try {
      const response = await axios.post("http://localhost:8000/vote", { name: candidateName });
      if (response.status === 200) {
        alert('Vote registered successfully');
        setVotedCandidates(prev => new Set(prev).add(candidateName));
        fetchData(); // Refresh data to update vote counts
      }
    } catch (error) {
      console.error("Error registering vote:", error);
      alert('Error registering vote');
    }
  };

  return (
    <>
      <div>
        <h2>Candidates in {voterPlace}</h2>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Party:
          <input type="text" value={party} onChange={handlePartyChange} />
        </label>
        <button onClick={fetchData}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Party</th>
            <th>Vote or Not</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.party}</td>
              <td>
                {votedCandidates.has(item.name) ? (
                  <button disabled>Voted</button>
                ) : (
                  <button onClick={() => handleVote(item.name)}>Vote</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DisplayCandidate;
