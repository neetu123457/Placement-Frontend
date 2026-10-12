import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./register.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

 const handleRegister = (e) => {
  e.preventDefault();

  if (!validate()) {
    return;
  }

  navigate("/dashboard");
};

  return (
    <div className="register-page">

      {/* Background */}
      <div className="register-glow register-glow-one"></div>
      <div className="register-glow register-glow-two"></div>
      <div className="register-glow register-glow-three"></div>

      <div className="register-particle register-particle-one"></div>
      <div className="register-particle register-particle-two"></div>
      <div className="register-particle register-particle-three"></div>

      {/* Register Card */}
      <div className="register-card">

       

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Join Placement Portal and start your journey
        </p>

        <form onSubmit={handleRegister} autoComplete="off">

          {/* Full Name */}
          <div className="register-input-group">
            <label>Full Name</label>

            <div
              className={`register-input-box ${
                errors.name ? "register-input-error" : ""
              }`}
            >
              <span className="register-icon">👤</span>

              <input
  type="text"
  name="fullname"
  autoComplete="off"
  placeholder="Enter your full name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
            </div>

            {errors.name && (
              <p className="register-error">
                * {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="register-input-group">
            <label>Email Address</label>

            <div
              className={`register-input-box ${
                errors.email ? "register-input-error" : ""
              }`}
            >
              <span className="register-icon">✉️</span>

             <input
  type="email"
  name="register-email"
  autoComplete="off"
  placeholder="you@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
            </div>

            {errors.email && (
              <p className="register-error">
                * {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="register-input-group">
            <label>Password</label>

            <div
              className={`register-input-box ${
                errors.password ? "register-input-error" : ""
              }`}
            >
              <span className="register-icon">🔒</span>

              <input
  type={showPassword ? "text" : "password"}
  name="register-password"
  autoComplete="new-password"
  placeholder="Create a password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

              <span
                className="register-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {errors.password && (
              <p className="register-error">
                * {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="register-input-group">
            <label>Confirm Password</label>

            <div
              className={`register-input-box ${
                errors.confirmPassword
                  ? "register-input-error"
                  : ""
              }`}
            >
              <span className="register-icon">🔐</span>

             <input
  type={showConfirmPassword ? "text" : "password"}
  name="confirm-password"
  autoComplete="new-password"
  placeholder="Confirm your password"
  value={confirmPassword}
  onChange={(e) =>
    setConfirmPassword(e.target.value)
  }
/>

              <span
                className="register-eye"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {errors.confirmPassword && (
              <p className="register-error">
                * {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms */}
          <label className="terms">
            <input type="checkbox" required />
            <span>
              I agree to the Terms & Conditions
            </span>
          </label>

          {/* Register Button */}
          <button
            type="submit"
            className="register-button"
          >
            <span>Create Account</span>
            <span className="register-arrow">→</span>
          </button>

        </form>

        {/* Login */}
        <p className="already-account">
          Already have an account?
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;