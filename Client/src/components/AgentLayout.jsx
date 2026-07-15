import { Link } from "react-router-dom";

function AgentLayout({ title, children }) {

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.clear();
        window.location.href = "/login";

    };

    return (

        <div className="container-fluid">

            <div className="row">

                <div className="col-lg-2 sidebar">

                    <div>

                        <div className="logo-box">

                            <div className="logo-circle">

                                <i className="bi bi-headset"></i>

                            </div>

                            <div>

                                <h4>Customer Care</h4>

                                <small>Agent Panel</small>

                            </div>

                        </div>

                        <div className="menu mt-5">

                            <Link
                                to="/agent-dashboard"
                                className="menu-link active"
                            >

                                <i className="bi bi-grid-fill"></i>

                                <span>Dashboard</span>

                            </Link>

                        </div>

                    </div>

                    <div className="admin-section">

                        <div className="admin-profile">

                            <div className="admin-avatar">

                                {user?.name?.charAt(0).toUpperCase()}

                            </div>

                            <div>

                                <h6>{user?.name}</h6>

                                <small>Online</small>

                            </div>

                        </div>

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >

                            <i className="bi bi-box-arrow-right"></i>

                            Logout

                        </button>

                    </div>

                </div>

                <div className="col-lg-10 p-4">

                    <h2 className="fw-bold mb-4">
                        {title}
                    </h2>

                    {children}

                </div>

            </div>

        </div>

    );

}

export default AgentLayout;