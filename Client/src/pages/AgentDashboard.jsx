import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/AgentDashboard.css";
import AgentLayout from "../components/AgentLayout";

function AgentDashboard() {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/complaints/assigned", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setComplaints(res.data);

        } catch (error) {

    alert(error.response?.data?.message || "Something went wrong");

}

    };

    const updateStatus = async (id, status) => {

    alert("Button Clicked");

    console.log("ID:", id);
    console.log("STATUS:", status);

    try {

        const token = localStorage.getItem("token");

        const res = await API.put(
            `/complaints/${id}`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(res.data);

        alert("Updated Successfully");

        fetchComplaints();

    } catch (error) {

    alert(error.response?.data?.message || "Something went wrong");

}

};
    return (

        <AgentLayout title="Agent Dashboard">

            <div className="agent-card">

                <h3 className="mb-4">

                    Assigned Complaints

                </h3>

                <table className="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th>Title</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            complaints.map((item) => (

                                <tr key={item._id}>

                                    <td>{item.title}</td>

                                    <td>{item.customer?.name}</td>

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

                                        {

                                            item.status !== "Resolved" && (

                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() =>
                                                        updateStatus(
                                                            item._id,
                                                            item.status === "Pending"
                                                                ? "In Progress"
                                                                : "Resolved"
                                                        )
                                                    }
                                                >

                                                    {

                                                        item.status === "Pending"

                                                            ? "Start"

                                                            : "Resolve"

                                                    }

                                                </button>

                                            )

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </AgentLayout>

    );

}

export default AgentDashboard;