import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">{children}</div>
        <ChatBot /> {/* Floating AI assistant */}
      </div>
    </div>
  );
};

export default DashboardLayout;
