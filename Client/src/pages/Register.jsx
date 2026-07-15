import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import support from "../assets/support.svg";
import "../styles/Register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "customer"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/auth/register", formData);

            alert(res.data.message);

            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                role: "customer"
            });

            navigate("/login");

        } catch (error) {

            alert(error.response?.data?.message || "Registration Failed");

        }

    };

    return (

        <div className="register-page">

            <div className="container">

                <div className="row align-items-center">

                    {/* Left Image */}

                    <div className="col-lg-6 text-center">

                        <img
                            src={support}
                            alt="Customer Support"
                            className="register-image"
                        />

                    </div>

                    {/* Register Form */}

                    <div className="col-lg-6">

                        <div className="register-card">

                            <h2 className="register-title">

                                Create Account 🚀

                            </h2>

                            <p className="register-subtitle">

                                Register to start managing your complaints.

                            </p>

                            <form onSubmit={handleSubmit}>

                                {/* Name */}

                                <div className="input-group mb-3">

                                    <span className="input-group-text">

                                        <i className="bi bi-person"></i>

                                    </span>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Email */}

                                <div className="input-group mb-3">

                                    <span className="input-group-text">

                                        <i className="bi bi-envelope"></i>

                                    </span>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Phone */}

                                <div className="input-group mb-3">

                                    <span className="input-group-text">

                                        <i className="bi bi-telephone"></i>

                                    </span>

                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Password */}

                                <div className="input-group mb-3">

                                    <span className="input-group-text">

                                        <i className="bi bi-lock"></i>

                                    </span>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Role */}

                                <div className="input-group mb-4">

                                    <span className="input-group-text">

                                        <i className="bi bi-person-badge"></i>

                                    </span>

                                    <select
                                        name="role"
                                        className="form-select"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >

                                        <option value="customer">

                                            Customer

                                        </option>

                                        <option value="agent">

                                            Agent

                                        </option>

                                        <option value="admin">

                                            Admin

                                        </option>

                                    </select>

                                </div>

                                <button className="register-btn">

                                    Create Account

                                </button>

                            </form>

                            <p className="text-center mt-4">

                                Already have an account?

                                <Link to="/login">

                                    {" "}Login

                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;