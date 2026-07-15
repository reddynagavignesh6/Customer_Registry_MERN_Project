import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Complaint.css";

function Complaint() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        priority: "Medium",
        description: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            await API.post(
                "/complaints",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Complaint Submitted Successfully ✅");

            navigate("/my-complaints");

        } catch (error) {

            alert(error.response?.data?.message || "Failed to submit complaint");

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Navbar />

            <div className="complaint-page">

                <div className="complaint-card">
                    <button
                            className="back-btn"
                            onClick={() => navigate(-1)}
                        >
                            <i className="bi bi-arrow-left"></i>
                            <span>Back</span>
                        </button>
                    <h2>Raise a Complaint</h2>

                    <p className="subtitle">
                        Fill in the details below and our support team will assist you.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Complaint Title</label>

                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>Category</label>

                                <select
                                    className="form-select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">Select Category</option>
                                    <option>Network</option>
                                    <option>Software</option>
                                    <option>Hardware</option>
                                    <option>Account</option>
                                    <option>Other</option>

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Priority</label>

                                <select
                                    className="form-select"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >

                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>

                                </select>

                            </div>

                        </div>

                        <div className="mb-4">

                            <label>Description</label>

                            <textarea
                                rows="5"
                                className="form-control"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>

                        </div>

                        <button
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >

                            {
                                loading
                                    ? "Submitting..."
                                    : "Submit Complaint"
                            }

                        </button>

                    </form>

                </div>

            </div>

            <Footer />
        </>

    );

}

export default Complaint;