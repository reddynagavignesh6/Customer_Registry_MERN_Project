import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import API from "../services/api";
import "../styles/Users.css";

function Users() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsers(res.data);

        } catch (error) {

    alert(error.response?.data?.message || "Something went wrong");

}

    };

    const editUser = async (user) => {

    const name = prompt("Enter Name", user.name);

    if (name === null) return;

    const phone = prompt("Enter Phone", user.phone);

    if (phone === null) return;

    try {

        const token = localStorage.getItem("token");

        await API.put(
            `/users/${user._id}`,
            {
                name,
                phone
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("User Updated Successfully");

        fetchUsers();

    } catch (error) {

        alert(error.response?.data?.message || "Update Failed");

    }

};

    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?")) return;

        try {

            const token = localStorage.getItem("token");

            await API.delete(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("User Deleted Successfully");

            fetchUsers();

        } catch (error) {

            alert(error.response?.data?.message || "Delete Failed");

        }

    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <AdminLayout title="Users Management">

            <div className="users-card">

                <div className="mb-4">

                    <input
                        type="text"
                        className="form-control search-box"
                        placeholder="Search Users..."
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
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredUsers.map((user) => (

                                <tr key={user._id}>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>{user.phone}</td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                user.role === "admin"
                                                    ? "bg-danger"
                                                    : user.role === "agent"
                                                    ? "bg-success"
                                                    : "bg-primary"
                                            }`}
                                        >

                                            {user.role}

                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => editUser(user)}
                                        >

                                            <i className="bi bi-pencil"></i>

                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteUser(user._id)}
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

        </AdminLayout>

    );

}

export default Users;