import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiRequest } from "../utils/api";
import "./forgotpassword.css";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!token || !email) {
      setError("This password reset link is incomplete.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const data = await apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, token, password }),
      });
      setMessage(data.message);
      setPassword("");
      setConfirmPassword("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-icon-container">🔒</div>
        <h1>Choose a new password</h1>
        <p className="forgot-subtitle">Your reset link is valid for 30 minutes.</p>
        <form onSubmit={handleSubmit}>
          <div className="forgot-input-group">
            <label htmlFor="new-password">New password</label>
            <div className="forgot-input-box">
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="forgot-input-group">
            <label htmlFor="confirm-password">Confirm password</label>
            <div className="forgot-input-box">
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="forgot-error" role="alert">{error}</p>}
          {message && <p className="forgot-success" role="status">{message}</p>}
          <button className="forgot-button" type="submit" disabled={submitting}>
            <span>{submitting ? "Updating..." : "Update Password"}</span>
          </button>
        </form>
        <p className="back-login"><Link to="/login">Back to login</Link></p>
      </div>
    </div>
  );
}