import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin_candidate = () => {
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
        alert('Candidate removed successfully');
        fetchCandidates(); // Refresh the list after removal
      } else {
        alert('Failed to remove candidate');
      }
    } catch (error) {
      console.error("Error removing candidate:", error);
      alert('Error removing candidate');
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      {groupedCandidates.map((group, index) => (
        <div key={index}>
          <h2>{group._id}</h2> {/* Place name */}
          <table>
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Party</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {group.candidates.map((candidate, idx) => (
                <tr key={candidate._id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.party}</td>
                  <td>
                    <button onClick={() => handleRemove(candidate._id)}>Remove</button>
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

export default Admin_candidate;
