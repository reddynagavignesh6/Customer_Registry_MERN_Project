import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Complaint from "./pages/Complaint";
import MyComplaints from "./pages/MyComplaints";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Users from "./pages/Users";
import Complaints from "./pages/Complaints";
import Agents from "./pages/Agents";
import NotFound from "./pages/NotFound";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/complaint" element={<Complaint />} />

        <Route path="/my-complaints" element={<MyComplaints />} />

        <Route path="/agent-dashboard" element={<AgentDashboard />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/customer-dashboard" element={<CustomerDashboard />} />

        <Route path="/users" element={<Users />} />

        <Route path="/complaints" element={<Complaints />} />

        <Route path="/agents" element={<Agents />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;