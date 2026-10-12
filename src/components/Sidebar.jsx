import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";


const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Mock Interview", path: "/mock-interview" },
    { name: "Resume Analyzer", path: "/resume-analyzer" },
    { name: "Roadmaps", path: "/roadmaps" },
    { name: "Videos", path: "/videos" },
    { name: "Practice Questions", path: "/practice-questions" },
    
    
    { name: "Progress Tracker", path: "/progress-tracker" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">PrepDash</h2>
      <nav>
        {menuItems.map((item) => (
          <NavLink key={item.name} to={item.path} className="nav-link">
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
