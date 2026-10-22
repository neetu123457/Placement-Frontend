import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import MainLayout from "./pages/MainLayout";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<MainLayout />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;