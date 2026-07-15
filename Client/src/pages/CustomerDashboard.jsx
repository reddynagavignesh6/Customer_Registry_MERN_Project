import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/CustomerDashboard.css";

function CustomerDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.clear();
        navigate("/login");

    };

    return (

        <>
            <Navbar />

            <div className="dashboard-page">

                {/* Welcome Banner */}

                <div className="welcome-banner">

                    <h1>
                        Welcome, {user?.name} 👋
                    </h1>

                    <p>
                        Manage your complaints and track their progress from one place.
                    </p>

                </div>

                {/* Action Cards */}

                <div className="dashboard-grid">

                    <div className="dashboard-box">

                        <div className="dashboard-icon">
                            <i className="bi bi-pencil-square"></i>
                        </div>

                        <h4>Raise Complaint</h4>

                        <p>
                            Submit a new complaint quickly and easily.
                        </p>

                        <Link
                            to="/complaint"
                            className="btn btn-primary"
                        >
                            Open
                        </Link>

                    </div>

                    <div className="dashboard-box">

                        <div className="dashboard-icon">
                            <i className="bi bi-card-checklist"></i>
                        </div>

                        <h4>My Complaints</h4>

                        <p>
                            View and track all your submitted complaints.
                        </p>

                        <Link
                            to="/my-complaints"
                            className="btn btn-primary"
                        >
                            View
                        </Link>

                    </div>

                    <div className="dashboard-box">

                        <div className="dashboard-icon">
                            <i className="bi bi-box-arrow-right"></i>
                        </div>

                        <h4>Logout</h4>

                        <p>
                            Securely sign out from your account.
                        </p>

                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

                {/* Quick Guide */}

                <div className="guide-card">

                    <h2>Quick Guide</h2>

                    <ul>

                        <li>Create a complaint.</li>

                        <li>Track complaint status.</li>

                        <li>Wait for agent assignment.</li>

                        <li>Receive resolution updates.</li>

                    </ul>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default CustomerDashboard;