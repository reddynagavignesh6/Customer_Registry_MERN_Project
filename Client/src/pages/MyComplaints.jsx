import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "../styles/MyComplaints.css";

function MyComplaints() {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    
    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/complaints/my", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setComplaints(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteComplaint = async (id) => {

        if (!window.confirm("Delete this complaint?")) return;

        try {

            const token = localStorage.getItem("token");

            await API.delete(`/complaints/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchComplaints();

        } catch (error) {

            alert(error.response?.data?.message || "Delete Failed");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container py-5">

    <button
        className="back-btn"
        onClick={() => navigate("/customer-dashboard")}
    >
        <i className="bi bi-arrow-left"></i> Back
    </button>

    <h2 className="fw-bold text-primary mb-4">

        My Complaints

    </h2>

                <div className="row">

                    {

                        complaints.map((item)=>(

                            <div
                                className="col-lg-6 mb-4"
                                key={item._id}
                            >

                                <div className="complaint-box">

                                    <div className="d-flex justify-content-between">

                                        <h5>

                                            {item.title}

                                        </h5>

                                        <span
                                            className={`badge ${
                                                item.status==="Pending"
                                                ?"bg-warning text-dark"
                                                :item.status==="Resolved"
                                                ?"bg-success"
                                                :"bg-primary"
                                            }`}
                                        >

                                            {item.status}

                                        </span>

                                    </div>

                                    <p className="text-muted mt-3">

                                        {item.description}

                                    </p>

                                    <div className="mb-3">

                                        <strong>Category :</strong>

                                        {" "}

                                        {item.category}

                                    </div>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={()=>deleteComplaint(item._id)}
                                    >

                                        Delete

                                    </button>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

            <Footer />

        </>

    );

}

export default MyComplaints;