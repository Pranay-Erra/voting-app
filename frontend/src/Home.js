import React from "react";
import './Home.css';

const Home = () => {
    return (
        <div className="main">
            <div className="content">
                <h1>Welcome to Your Voting Platform</h1>
                <p>Empowering you to make your voice heard. Register as a voter, candidate, or log in as an admin to manage the elections.</p>
                <div className="button-group">
                    <button className="voter-btn" >Voter Registration</button>
                    <button className="candidate-btn">Candidate Registration</button>
                    <button className="admin-btn">Admin Login</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
