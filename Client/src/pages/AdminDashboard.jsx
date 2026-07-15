import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import API from "../services/api";
import "../styles/dashboard.css";
import AdminLayout from "../components/AdminLayout";

function AdminDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
    totalCustomers: 0,
    totalAgents: 0,
    totalAdmins: 0,
    totalComplaints: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    recentComplaints: []
});

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/admin/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStats(res.data);

        } catch (error) {

    alert(error.response?.data?.message || "Something went wrong");

}

    };

    return (

        <AdminLayout title="Admin Dashboard">

            {/* Welcome Banner */}

            <div
                className="rounded-4 p-4 mb-5"
                style={{
                    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
                    color: "white"
                }}
            >

                <h2 className="fw-bold">
                    Welcome Back, Admin 👋
                </h2>

                <p className="mb-0">
                    Manage users, complaints and monitor the customer support system.
                </p>

            </div>

            {/* Dashboard Cards */}

           <div className="row g-4">

    <div className="col-lg-2 col-md-6">
        <DashboardCard
            title="Customers"
            value={stats.totalCustomers}
            icon="bi bi-people-fill"
            color="linear-gradient(135deg,#2563EB,#3B82F6)"
        />
    </div>

    <div className="col-lg-2 col-md-6">
        <DashboardCard
            title="Agents"
            value={stats.totalAgents}
            icon="bi bi-person-workspace"
            color="linear-gradient(135deg,#059669,#10B981)"
        />
    </div>

    <div className="col-lg-2 col-md-6">
        <DashboardCard
            title="Admins"
            value={stats.totalAdmins}
            icon="bi bi-person-badge-fill"
            color="linear-gradient(135deg,#DC2626,#EF4444)"
        />
    </div>

    <div className="col-lg-2 col-md-6">
        <DashboardCard
            title="Complaints"
            value={stats.totalComplaints}
            icon="bi bi-card-checklist"
            color="linear-gradient(135deg,#7C3AED,#A855F7)"
        />
    </div>

    <div className="col-lg-2 col-md-6">
        <DashboardCard
            title="Pending"
            value={stats.pending}
            icon="bi bi-hourglass-split"
            color="linear-gradient(135deg,#F59E0B,#FBBF24)"
        />
    </div>

    <div className="col-lg-2 col-md-6">
        <DashboardCard
            title="Resolved"
            value={stats.resolved}
            icon="bi bi-check-circle-fill"
            color="linear-gradient(135deg,#10B981,#34D399)"
        />
    </div>

</div>

            {/* Quick Actions */}

            <h3 className="fw-bold mt-5 mb-4">

                Quick Actions

            </h3>

            <div className="row g-4">

                <div className="col-lg-4">

                    <div className="quick-card">

                        <div className="quick-icon bg-primary">

                            <i className="bi bi-people-fill"></i>

                        </div>

                        <h5>Manage Users</h5>

                        <p>

                            View and manage all registered users.

                        </p>

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/users")}
                        >

                            Open

                        </button>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="quick-card">

                        <div className="quick-icon bg-success">

                            <i className="bi bi-card-checklist"></i>

                        </div>

                        <h5>Complaints</h5>

                        <p>

                            View and monitor customer complaints.

                        </p>

                        <button
                            className="btn btn-success"
                            onClick={() => navigate("/complaints")}
                        >

                            View

                        </button>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="quick-card">

                        <div className="quick-icon bg-warning">

                            <i className="bi bi-person-workspace"></i>

                        </div>

                        <h5>Assign Agents</h5>

                        <p>

                            Assign complaints to available support agents.

                        </p>

                        <button
                            className="btn btn-warning text-white"
                            onClick={() => navigate("/agents")}
                        >

                            Assign

                        </button>

                    </div>

                </div>

            </div>

            {/* Recent Complaints */}

            <div className="card border-0 shadow rounded-4 mt-5">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h4 className="fw-bold">

                            Recent Complaints

                        </h4>

                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => navigate("/complaints")}
                        >

                            View All

                        </button>

                    </div>

                    <table className="table table-hover align-middle">

                        <thead>

                            <tr>

                                <th>Complaint</th>
                                <th>Category</th>
                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>
                    {
                        stats.recentComplaints?.length > 0 ? (

                            stats.recentComplaints.map((item) => (

                                <tr key={item._id}>

                                    <td>{item.title}</td>

                                    <td>{item.category}</td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                item.status === "Pending"
                                                    ? "bg-warning text-dark"
                                                    : item.status === "Resolved"
                                                    ? "bg-success"
                                                    : "bg-primary"
                                            }`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="3" className="text-center">

                                    No complaints found

                                </td>

                            </tr>

                        )
                    }

                    </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default AdminDashboard;