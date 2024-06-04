import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./displayCandidate.css"; // Ensure to create and import a CSS file for styling

const DisplayCandidate = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [votedCandidates, setVotedCandidates] = useState(new Set());
  const [showNoCandidatesDialog, setShowNoCandidatesDialog] = useState(false);
  const voterPlace = localStorage.getItem('place'); // Get the voter's place from localStorage
  const navigate = useNavigate();
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/display-candidate", {
        params: {
          name,
          party,
          constituency: voterPlace // Include the voter's place in the request parameters
        }
      });
      console.log(response.data);
      setData(response.data);
      setShowNoCandidatesDialog(response.data.length === 0); // Show dialog if no candidates
      setTimeout(() => {
        navigate('/dashboard'); // Navigate to the dashboard page after a short delay
      }, 4000); // Delay to allow the toast to be seen before navigation
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
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
        toast.success("Vote registered successfully");
        setVotedCandidates(prev => new Set(prev).add(candidateName));
        fetchData(); // Refresh data to update vote counts
      }
    } catch (error) {
      console.error("Error registering vote:", error);
      toast.error("Error registering vote");
    }
  };

  const handleCloseDialog = () => setShowNoCandidatesDialog(false);

  return (
    <>
      <ToastContainer />
      <div className="search-container">
        <h2>Candidates in {voterPlace}</h2>
        <label>
          Name:
          <input type="text" className="input" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Party:
          <input type="text" className="input" value={party} onChange={handlePartyChange} />
        </label>
        <button className="search-button" onClick={fetchData}>Search</button>
      </div>
      {showNoCandidatesDialog && (
        <div className="dialog">
          <p>No candidates found in your constituency.</p>
          <h3>Grab the opportunity to be the first one!</h3>
          <button className="dialog-button">Candidate Registration</button>
          <button className="dialog-button" onClick={handleCloseDialog}>Close</button>
        </div>
      )}
      <table className="data-table">
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Party</th>
            <th>Party Symbol</th>
            <th>Vote or Not</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.party}</td>
              <td>
                {item.partySymbol && (
                  <img
                    src={`data:image/png;base64,${item.partySymbol}`}
                    alt="Party Symbol"
                    className="party-symbol"
                  />
                )}
              </td>
              <td>
                {votedCandidates.has(item.name) ? (
                  <button className="vote-button" disabled>Voted</button>
                ) : (
                  <button className="vote-button" onClick={() => handleVote(item.name)}>Vote</button>
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
