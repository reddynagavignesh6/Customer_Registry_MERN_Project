import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.clear();
        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-custom sticky-top">

            <div className="container">

                <Link
                    className="navbar-brand d-flex align-items-center"
                    to={token
                        ? role === "admin"
                            ? "/admin-dashboard"
                            : role === "agent"
                            ? "/agent-dashboard"
                            : "/customer-dashboard"
                        : "/"}
                >

                    <i className="bi bi-headset logo"></i>

                    <span className="brand-name">

                        Customer Care Registry

                    </span>

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navMenu"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navMenu"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        {/* Before Login */}

                        {!token ? (

                            <>

                                <li className="nav-item">

                                    <Link className="nav-link" to="/">
                                        Home
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <a className="nav-link" href="#features">
                                        Features
                                    </a>

                                </li>

                                <li className="nav-item">

                                    <a className="nav-link" href="#how">
                                        How It Works
                                    </a>

                                </li>

                                <li className="nav-item ms-3">

                                    <Link
                                        className="btn-login"
                                        to="/login"
                                    >

                                        Login

                                    </Link>

                                </li>

                                <li className="nav-item ms-2">

                                    <Link
                                        className="btn-start"
                                        to="/register"
                                    >

                                        Get Started

                                    </Link>

                                </li>

                            </>

                        ) : (

                            <>

                                {/* Customer */}

                                {role === "customer" && (

                                    <>

                                        <li className="nav-item">

                                            <Link
                                                className="nav-link"
                                                to="/customer-dashboard"
                                            >

                                                Dashboard

                                            </Link>

                                        </li>

                                        <li className="nav-item">

                                            <Link
                                                className="nav-link"
                                                to="/complaint"
                                            >

                                                Raise Complaint

                                            </Link>

                                        </li>

                                        <li className="nav-item">

                                            <Link
                                                className="nav-link"
                                                to="/my-complaints"
                                            >

                                                My Complaints

                                            </Link>

                                        </li>

                                    </>

                                )}

                                {/* Admin */}

                                {role === "admin" && (

                                    <li className="nav-item">

                                        <Link
                                            className="nav-link"
                                            to="/admin-dashboard"
                                        >

                                            Dashboard

                                        </Link>

                                    </li>

                                )}

                                {/* Agent */}

                                {role === "agent" && (

                                    <li className="nav-item">

                                        <Link
                                            className="nav-link"
                                            to="/agent-dashboard"
                                        >

                                            Dashboard

                                        </Link>

                                    </li>

                                )}

                                <li className="nav-item ms-3">

                                    <button
                                        className="btn btn-danger"
                                        onClick={handleLogout}
                                    >

                                        Logout

                                    </button>

                                </li>

                            </>

                        )}

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;