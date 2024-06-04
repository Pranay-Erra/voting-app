import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./adminCandidate.css"; // Ensure to create and import a CSS file for styling

const AdminCandidate = () => {
  const [groupedCandidates, setGroupedCandidates] = useState([]);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin-candidates");
      setGroupedCandidates(response.data);
    } catch (error) {
      console.error("Error fetching grouped candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleRemove = async (candidateId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/remove-candidate/${candidateId}`);
      if (response.status === 200) {
        toast.success('Candidate removed successfully');
        fetchCandidates(); // Refresh the list after removal
      } else {
        toast.error('Failed to remove candidate');
      }
    } catch (error) {
      console.error("Error removing candidate:", error);
      toast.error('Error removing candidate');
    }
  };

  return (
    <div className="admin-page">
      <ToastContainer />
      <h1>Admin Page</h1>
      {groupedCandidates.map((group, index) => (
        <div key={index} className="candidate-group">
          <h2>{group._id}</h2> {/* Place name */}
          <table className="candidate-table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Party</th>
                <th>Party Symbol</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {group.candidates.map((candidate, idx) => (
                <tr key={candidate._id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.party}</td>
                  <td>
                    {candidate.partySymbol && (
                      <img src={`data:image/jpeg;base64,${candidate.partySymbol.toString('base64')}`} alt="Party Symbol" className="party-symbol" />
                    )}
                  </td>
                  <td>
                    <button className="remove-button" onClick={() => handleRemove(candidate._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminCandidate;
