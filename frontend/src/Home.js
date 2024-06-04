import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import Dashboard from './components/dashboard';

const Home = () => {
    const navigate = useNavigate();

    const handleVoterRegistration = () => {
        navigate('/voter-reg');
    };

    const handleCandidateRegistration = () => {
        navigate('/candidate-reg');
    };

    const handleAdminLogin = () => {
        navigate('/admin-login');
    };

    return (
        <>
        <div className="main">
            <div className="content">
                <h1>Welcome to Your Voting Platform</h1>
                <p>Empowering you to make your voice heard. Register as a voter, candidate, or log in as an admin to manage the elections.</p>
                <div className="button-group">
                    <button className="voter-btn" onClick={handleVoterRegistration}>Voter Registration</button>
                    <button className="candidate-btn" onClick={handleCandidateRegistration}>Candidate Registration</button>
                    <button className="admin-btn" onClick={handleAdminLogin}>Admin Login</button>
                </div>
            </div>
        </div>
        <Dashboard/>
        </>
    );
}

export default Home;
