import { Link, useLocation } from "react-router-dom";

function AdminLayout({ title, children }) {

    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.clear();
        window.location.href = "/login";

    };

    const menu = [
        {
            name: "Dashboard",
            icon: "bi bi-grid-fill",
            path: "/admin-dashboard"
        },
        {
            name: "Users",
            icon: "bi bi-people-fill",
            path: "/users"
        },
        {
            name: "Complaints",
            icon: "bi bi-card-checklist",
            path: "/complaints"
        },
        {
            name: "Agents",
            icon: "bi bi-person-workspace",
            path: "/agents"
        }
    ];

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
                                <small>Admin Panel</small>
                            </div>

                        </div>

                        <div className="menu mt-5">

                            {menu.map(item => (

                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={
                                        location.pathname === item.path
                                            ? "menu-link active"
                                            : "menu-link"
                                    }
                                >

                                    <i className={item.icon}></i>

                                    <span>{item.name}</span>

                                </Link>

                            ))}

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

export default AdminLayout;