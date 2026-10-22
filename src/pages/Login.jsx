import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../context/useAuth";

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      login(response.data.user);

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p>
          Login to continue your preparation.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter email"
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            required
          />

          <button className="primary-button">
            Login
          </button>

        </form>

        <p className="auth-link">
          Don't have an account?

          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;