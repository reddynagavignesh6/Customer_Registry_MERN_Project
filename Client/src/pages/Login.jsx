import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import support from "../assets/support.svg";
import "../styles/Login.css";

function Login(){

const navigate=useNavigate();

const [formData,setFormData]=useState({

email:"",
password:""

});

const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value

});

};

const handleSubmit=async(e)=>{

e.preventDefault();

try{

const res=await API.post("/auth/login",formData);

localStorage.setItem("token",res.data.token);
localStorage.setItem("role",res.data.user.role);
localStorage.setItem("user",JSON.stringify(res.data.user));

if(res.data.user.role==="admin"){

navigate("/admin-dashboard");

}

else if(res.data.user.role==="agent"){

navigate("/agent-dashboard");

}

else{

navigate("/customer-dashboard");

}

}

catch(error){

alert(error.response?.data?.message||"Login Failed");

}

};

return(

<div className="login-page">

<div className="container">

<div className="row align-items-center">

<div className="col-lg-6 text-center">

<img
src={support}
className="login-image"
alt=""
/>

</div>

<div className="col-lg-6">

<div className="login-card">

<h2 className="login-title">

Welcome Back 👋

</h2>

<p className="login-subtitle">

Login to continue managing your complaints.

</p>

<form onSubmit={handleSubmit}>

<div className="input-group mb-3">

<span className="input-group-text">

<i className="bi bi-envelope"></i>

</span>

<input
type="email"
name="email"
className="form-control"
placeholder="Email"
value={formData.email}
onChange={handleChange}
/>

</div>

<div className="input-group mb-4">

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
/>

</div>

<button className="login-btn">

Login

</button>

</form>

<p className="text-center mt-4">

Don't have an account?

<Link to="/register">

 Register

</Link>

</p>

</div>

</div>

</div>

</div>

</div>

);

}

export default Login;