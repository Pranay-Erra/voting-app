import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./adminVoter.css"; // Import CSS file for styling

const AdminVoter = () => {
  const [groupedVoters, setGroupedVoters] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  const fetchVoters = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://dvp.onrender.com/admin-voter");
      console.log("Full API Response:", response.data); // Log the full API response
      setGroupedVoters(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching grouped candidates:", error);
      setError("Failed to fetch voters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  const handleRemove = async (VoterId) => {
    try {
      const response = await axios.delete(`https://dvp.onrender.com/remove-voter/${VoterId}`);
      if (response.status === 200) {
        toast.success('Voter removed successfully');
        fetchVoters(); // Refresh the list after removal
      } else {
        toast.error('Failed to remove voter');
      }
    } catch (error) {
      console.error("Error removing voter:", error);
      toast.error('Error removing voter');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!Array.isArray(groupedVoters)) {
    console.error("groupedVoters is not an array:", groupedVoters);
    return <div className="error">Error: Data format is incorrect.</div>;
  }

  return (
    <div className="admin-voter-container">
      <ToastContainer />
      <h1>Admin Voter</h1>
      {groupedVoters.length > 0 ? groupedVoters.map((group, index) => (
        <div key={index} className="voter-group">
          <h2>{group._id}</h2> {/* Use "constituency" as the key */}
          {/* Render candidates instead of voters */}
          <table>
            <thead>
              <tr>
                <th>Voter Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(group.candidates) && group.candidates.length > 0 ? (
                group.candidates.map((candidate, idx) => (
                  <tr key={candidate._id}>
                    <td>{candidate.name}</td>
                    <td>
                      <button onClick={() => handleRemove(candidate._id)}>Remove</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No voters available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )) : <div>No voters found.</div>}
    </div>
  );
};

export default AdminVoter;
