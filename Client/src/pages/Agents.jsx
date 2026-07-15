import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../services/api";
import "../styles/Agents.css";

function Agents() {

    const [agents, setAgents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchAgents();
    }, []);

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

            console.log(error);

        }

    };

    const filteredAgents = agents.filter((agent) =>
        agent.name.toLowerCase().includes(search.toLowerCase()) ||
        agent.email.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <AdminLayout title="Agents Management">

            <div className="agents-card">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <input
                        type="text"
                        className="form-control search-box"
                        placeholder="Search Agent..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <table className="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredAgents.length > 0 ? (

                                filteredAgents.map((agent) => (

                                    <tr key={agent._id}>

                                        <td>{agent.name}</td>

                                        <td>{agent.email}</td>

                                        <td>{agent.phone}</td>

                                        <td>

                                            <span className="badge bg-primary">

                                                {agent.role}

                                            </span>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center text-muted"
                                    >

                                        No Agents Found

                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}

export default Agents;