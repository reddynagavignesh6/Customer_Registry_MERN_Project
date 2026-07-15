import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../services/api";
import "../styles/Complaints.css";

function Complaints() {

    const [complaints, setComplaints] = useState([]);
    const [agents, setAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState({});
    const [search, setSearch] = useState("");

    // Modal
    const [showModal, setShowModal] = useState(false);

    const [editData, setEditData] = useState({
        _id: "",
        title: "",
        category: "",
        description: "",
        status: ""
    });

    useEffect(() => {
        fetchComplaints();
        fetchAgents();
    }, []);

    const fetchComplaints = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/complaints", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setComplaints(res.data);

        } catch (error) {

    alert(error.response?.data?.message || "Something went wrong");

}

    };

    const fetchAgents = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/users/agents", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAgents(res.data);

        } catch (error) {

    alert(error.response?.data?.message || "Something went wrong");

}

    };
        const assignAgent = async (complaintId) => {

        if (!selectedAgent[complaintId]) {

            alert("Please select an agent");

            return;

        }

        try {

            const token = localStorage.getItem("token");

            await API.put(
                `/complaints/assign/${complaintId}`,
                {
                    agentId: selectedAgent[complaintId]
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Agent Assigned Successfully");

            fetchComplaints();

        } catch (error) {

            alert(error.response?.data?.message || "Assignment Failed");

        }

    };

    const editComplaint = (item) => {

        setEditData({
            _id: item._id,
            title: item.title,
            category: item.category,
            description: item.description,
            status: item.status
        });

        setShowModal(true);

    };

    const saveComplaint = async () => {

        try {

            const token = localStorage.getItem("token");

            await API.put(
                `/complaints/edit/${editData._id}`,
                editData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Complaint Updated Successfully");

            setShowModal(false);

            fetchComplaints();

        } catch (error) {

            alert(error.response?.data?.message || "Update Failed");

        }

    };

    const deleteComplaint = async (id) => {

        if (!window.confirm("Delete this complaint?")) {

            return;

        }

        try {

            const token = localStorage.getItem("token");

            await API.delete(`/complaints/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Complaint Deleted Successfully");

            fetchComplaints();

        } catch (error) {

            alert(error.response?.data?.message || "Delete Failed");

        }

    };

    const filtered = complaints.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.customer?.name.toLowerCase().includes(search.toLowerCase())
    );
        return (

        <AdminLayout title="Complaints Management">

            <div className="complaints-card">

                <div className="mb-4">

                    <input
                        type="text"
                        className="form-control search-box"
                        placeholder="Search complaints..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <table className="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th>Title</th>
                            <th>Category</th>
                            <th>Customer</th>
                            <th>Agent</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.map((item) => (

                                <tr key={item._id}>

                                    <td>{item.title}</td>

                                    <td>{item.category}</td>

                                    <td>{item.customer?.name}</td>

                                    <td>

                                        {

                                            item.agent ? (

                                                <span className="badge bg-success">

                                                    {item.agent.name}

                                                </span>

                                            ) : (

                                                <div>

                                                    <select
                                                        className="form-select form-select-sm mb-2"
                                                        value={selectedAgent[item._id] || ""}
                                                        onChange={(e) =>
                                                            setSelectedAgent({
                                                                ...selectedAgent,
                                                                [item._id]: e.target.value
                                                            })
                                                        }
                                                    >

                                                        <option value="">
                                                            Select Agent
                                                        </option>

                                                        {

                                                            agents.map((agent) => (

                                                                <option
                                                                    key={agent._id}
                                                                    value={agent._id}
                                                                >

                                                                    {agent.name}

                                                                </option>

                                                            ))

                                                        }

                                                    </select>

                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => assignAgent(item._id)}
                                                    >

                                                        Assign

                                                    </button>

                                                </div>

                                            )

                                        }

                                    </td>

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

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => editComplaint(item)}
                                        >

                                            <i className="bi bi-pencil"></i>

                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteComplaint(item._id)}
                                        >

                                            <i className="bi bi-trash"></i>

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>
            {/* Edit Complaint Modal */}

            {

                showModal && (

                    <div
                        className="modal d-block"
                        tabIndex="-1"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                    >

                        <div className="modal-dialog modal-lg">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5 className="modal-title">

                                        Edit Complaint

                                    </h5>

                                    <button
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>

                                </div>

                                <div className="modal-body">

                                    <div className="mb-3">

                                        <label>Title</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editData.title}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    title: e.target.value
                                                })
                                            }
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Category</label>

                                        <select
                                            className="form-select"
                                            value={editData.category}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    category: e.target.value
                                                })
                                            }
                                        >

                                            <option>Network</option>
                                            <option>Software</option>
                                            <option>Hardware</option>
                                            <option>Account</option>
                                            <option>Other</option>

                                        </select>

                                    </div>

                                    <div className="mb-3">

                                        <label>Description</label>

                                        <textarea
                                            rows="4"
                                            className="form-control"
                                            value={editData.description}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    description: e.target.value
                                                })
                                            }
                                        ></textarea>

                                    </div>

                                    <div className="mb-3">

                                        <label>Status</label>

                                        <select
                                            className="form-select"
                                            value={editData.status}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    status: e.target.value
                                                })
                                            }
                                        >

                                            <option>Pending</option>
                                            <option>In Progress</option>
                                            <option>Resolved</option>

                                        </select>

                                    </div>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >

                                        Cancel

                                    </button>

                                    <button
                                        className="btn btn-primary"
                                        onClick={saveComplaint}
                                    >

                                        Save Changes

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )

            }

        </AdminLayout>

    );

}

export default Complaints;