import { useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../utils/api";

import "./forgotpassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setResetUrl("");

    if (!email.trim()) {
      setError("Email address is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setSubmitting(true);
    try {
      const data = await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setMessage(data.message);
      setResetUrl(data.resetUrl || "");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="forgot-page">

      {/* Background */}
      <div className="forgot-glow forgot-glow-one"></div>
      <div className="forgot-glow forgot-glow-two"></div>
      <div className="forgot-glow forgot-glow-three"></div>

      <div className="forgot-particle forgot-particle-one"></div>
      <div className="forgot-particle forgot-particle-two"></div>
      <div className="forgot-particle forgot-particle-three"></div>

      {/* Forgot Password Card */}
      <div className="forgot-card">

        <div className="forgot-icon-container">
          🔑
        </div>

        <h1>Forgot Password?</h1>

        <p className="forgot-subtitle">
          Don't worry! Enter your email address and we'll help you reset
          your password.
        </p>

        <form onSubmit={handleSubmit} autoComplete="off">

          {/* Email */}
          <div className="forgot-input-group">
            <label>Email Address</label>

            <div
              className={`forgot-input-box ${
                error ? "forgot-input-error" : ""
              }`}
            >
              <span className="forgot-input-icon">✉️</span>

              <input
                type="email"
                name="forgot-email"
                autoComplete="off"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setMessage("");
                }}
              />
            </div>

            {error && (
              <p className="forgot-error">
                * {error}
              </p>
            )}
          </div>

          {/* Success Message */}
          {message && (
            <p className="forgot-success">
              ✓ {message}
            </p>
          )}

          {resetUrl && (
            <p className="forgot-success">
              Development reset link: <a href={resetUrl}>Reset password</a>
            </p>
          )}

          {/* Reset Button */}
          <button
            type="submit"
            className="forgot-button"
            disabled={submitting}
          >
            <span>{submitting ? "Requesting..." : "Send Reset Link"}</span>
            <span className="forgot-arrow">→</span>
          </button>

        </form>

        {/* Back to Login */}
        <p className="back-login">
          Remember your password?
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>

        {/* Register */}
        <p className="create-account">
          Don't have an account?
          <Link to="/register" className="register-link">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;
