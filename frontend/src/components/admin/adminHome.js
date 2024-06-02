import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './adminHome.css';
const Admin_home = () => {
    return (
        <div className="admin-homepage">
            {/* Header */}
            <header>
                <h1>Admin Panel</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

            {/* Navigation */}
            <nav>
                <Link to="/admin-voter">
                    <div className="nav-item">
                        <i className="fas fa-user"></i>
                        <span>Voter</span>
                    </div>
                </Link>
                <Link to="/admin-candidates">
                    <div className="nav-item">
                        <i className="fas fa-users"></i>
                        <span>Candidate</span>
                    </div>
                </Link>
                <Link to="/dashboard">
                    <div className="nav-item">
                        <i className="fas fa-chart-bar"></i>
                        <span>Dashboard</span>
                    </div>
                </Link>
            </nav>

            {/* Main Content Area */}
            <main>
                {/* Content for each section goes here */}
            </main>

            {/* Footer */}
            <footer>
                <ul>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                </ul>
                <p>&copy; 2024 Your Company Name</p>
            </footer>
        </div>
    );
}

// Placeholder function for logout functionality
const handleLogout = () => {
    // Implement logout logic here
}

export default Admin_home;
