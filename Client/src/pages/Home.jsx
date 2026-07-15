import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import support from "../assets/support.svg";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
        <section className="hero">

        <div className="container">

            <div className="row align-items-center">

                <div className="col-lg-6">

                    <div className="hero-badge">

                        Trusted Customer Support Platform

                    </div>

                    <h1 className="hero-title">

                        Resolve Customer
                        <br />
                        Issues Faster.

                    </h1>

                    <p className="hero-text">

                        A smart complaint management system that helps
                        customers submit issues, track progress, and receive
                        timely support from dedicated service agents.

                    </p>

                    <div className="d-flex gap-3">

                        <Link
                            to="/register"
                            className="btn btn-primary hero-btn"
                        >
                            Get Started
                            <i className="bi bi-arrow-right ms-2"></i>
                        </Link>

                        <Link
                            to="/login"
                            className="btn btn-outline-primary hero-btn"
                        >
                            Login
                        </Link>

                    </div>

                </div>

                <div className="col-lg-6 text-center">

                    <img
                        src={support}
                        className="hero-image"
                        alt="Customer Support"
                    />

                </div>

            </div>

        </div>

    </section>

      {/* Features */}

        <section id="features" className="py-5">

        <div className="container">

            <div className="text-center mb-5">

            <h2 className="fw-bold display-6">
                Why Choose Customer Care Registry?
            </h2>

            <p className="text-muted">
                Everything you need to manage customer complaints in one secure platform.
            </p>

            </div>

            <div className="row g-4">

            <div className="col-lg-3 col-md-6">

                <div className="feature-card h-100">

                <div className="feature-icon">

                    <i className="bi bi-pencil-square"></i>

                </div>

                <h5>Easy Complaint Registration</h5>

                <p className="text-muted">

                    Customers can quickly register complaints through an intuitive and
                    user-friendly interface.

                </p>

                </div>

            </div>

            <div className="col-lg-3 col-md-6">

                <div className="feature-card h-100">

                <div className="feature-icon">

                    <i className="bi bi-clock-history"></i>

                </div>

                <h5>Real-Time Tracking</h5>

                <p className="text-muted">

                    Monitor complaint progress from submission to final resolution.

                </p>

                </div>

            </div>

            <div className="col-lg-3 col-md-6">

                <div className="feature-card h-100">

                <div className="feature-icon">

                    <i className="bi bi-headset"></i>

                </div>

                <h5>Dedicated Support</h5>

                <p className="text-muted">

                    Support agents efficiently handle customer issues and provide timely updates.

                </p>

                </div>

            </div>

            <div className="col-lg-3 col-md-6">

                <div className="feature-card h-100">

                <div className="feature-icon">

                    <i className="bi bi-shield-check"></i>

                </div>

                <h5>Secure Platform</h5>

                <p className="text-muted">

                    Authentication and protected APIs ensure customer information remains safe.

                </p>

                </div>

            </div>

            </div>

        </div>

        </section>

      {/* How It Works */}

        <section id="how" className="py-5 bg-light">

            <div className="container">

                <div className="text-center mb-5">

                    <h2 className="fw-bold display-6">

                        How It Works

                    </h2>

                    <p className="text-muted">

                        Follow these simple steps to resolve your issues efficiently.

                    </p>

                </div>

                <div className="row g-4">

                    <div className="col-md-3">

                        <div className="step-card">

                            <div className="step-number">

                                1

                            </div>

                            <i className="bi bi-person-plus fs-1 text-primary"></i>

                            <h5 className="mt-3">

                                Register

                            </h5>

                            <p>

                                Create your account and securely access the platform.

                            </p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="step-card">

                            <div className="step-number">

                                2

                            </div>

                            <i className="bi bi-pencil-square fs-1 text-primary"></i>

                            <h5 className="mt-3">

                                Raise Complaint

                            </h5>

                            <p>

                                Submit your issue with complete details.

                            </p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="step-card">

                            <div className="step-number">

                                3

                            </div>

                            <i className="bi bi-headset fs-1 text-primary"></i>

                            <h5 className="mt-3">

                                Agent Review

                            </h5>

                            <p>

                                A support agent reviews and processes your complaint.

                            </p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="step-card">

                            <div className="step-number">

                                4

                            </div>

                            <i className="bi bi-check-circle fs-1 text-primary"></i>

                            <h5 className="mt-3">

                                Resolution

                            </h5>

                            <p>

                                Track your complaint until it is successfully resolved.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
            

      <Footer />

    </>
  );
}

export default Home;