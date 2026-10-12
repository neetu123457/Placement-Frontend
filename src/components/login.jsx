import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Should be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

 const navigate = useNavigate();

const handleLogin = (e) => {
  e.preventDefault();

  // First validate the fields
  if (!validate()) {
    return;
  }

  // Check login credentials
  if (email === "kle@gmail.com" && password === "12345678") {
    navigate("/dashboard");
  } else {
    alert("Invalid email or password");
  }
};

  return (
    <>
      <div className="login-page">

        {/* ================= LEFT LOGIN SECTION ================= */}
        <div className="login-section">

          <div className="login-card">

            

            <h1>Login</h1>

            <p className="login-description">
              Enter your account details
            </p>

           <form onSubmit={handleLogin} autoComplete="off">

              {/* EMAIL */}
              <div className="input-group">

                <label>Email Address</label>

                <div
                  className={`input-box ${
                    errors.email ? "input-error" : ""
                  }`}
                >
                  <span className="input-icon">✉️</span>

                  <input
            
  type="email"
  name="email"
  autoComplete="off"
  placeholder="you@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
                  
                </div>

                {errors.email && (
                  <p className="error">
                    {errors.email}
                  </p>
                )}

              </div>

              {/* PASSWORD */}
              <div className="input-group">

                <label>Password</label>

                <div
                  className={`input-box ${
                    errors.password ? "input-error" : ""
                  }`}
                >

                  <span className="input-icon">🔒</span>
<input
  type={showPassword ? "text" : "password"}
  name="password"
  autoComplete="new-password"
  placeholder="••••••••"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
                  <span
                    className="password-eye"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>

                </div>

                {errors.password && (
                  <p className="error">
                    {errors.password}
                  </p>
                )}

              </div>

              {/* OPTIONS */}
              <div className="options">

                <label className="remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

              <Link to="/forgot-password" className="forgot-password-link">
  Forgot Password?
</Link>

              </div>

              {/* LOGIN BUTTON */}
              <button type="submit" className="login-button">
                Login
              </button>

            </form>

            {/* REGISTER */}
            <div className="register-area">

              <span>Don't have an account?</span>

              <Link to="/register" className="register">
                Register
              </Link>

            </div>

          </div>
        </div>


        {/* ================= RIGHT WELCOME SECTION ================= */}

        <div className="welcome-section">

          {/* Decorative shapes */}
          <div className="shape shape-one"></div>
          <div className="shape shape-two"></div>
          <div className="shape shape-three"></div>
          <div className="shape shape-four"></div>

          <div className="welcome-content">

            <p className="small-title">
              STUDENT PLACEMENT PORTAL
            </p>

            <h2>
              Welcome to
              <br />
              <span>Student Portal</span>
            </h2>

            <p className="welcome-description">
              Login to access your account
            </p>


            {/* Simple professional illustration */}
            <div className="illustration">

              {/* Laptop */}
              <div className="laptop">

                <div className="laptop-screen">

                  <div className="screen-header"></div>

                  <div className="screen-line line-one"></div>
                  <div className="screen-line line-two"></div>
                  <div className="screen-line line-three"></div>

                  <div className="screen-circle"></div>

                </div>

                <div className="laptop-base"></div>

              </div>


              {/* Person 1 */}
              <div className="person person-one">

                <div className="head"></div>

                <div className="body"></div>

                <div className="arm arm-left"></div>
                <div className="arm arm-right"></div>

                <div className="leg leg-left"></div>
                <div className="leg leg-right"></div>

              </div>


              {/* Person 2 */}
              <div className="person person-two">

                <div className="head"></div>

                <div className="body"></div>

                <div className="arm arm-left"></div>
                <div className="arm arm-right"></div>

                <div className="leg leg-left"></div>
                <div className="leg leg-right"></div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================= CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #111318;
        }


        /* =====================================
           MAIN PAGE
        ===================================== */

        .login-page {
          width: 100%;
          min-height: 100vh;

          display: flex;

          background: #181a1f;

          overflow: hidden;
        }


        /* =====================================
           LEFT LOGIN SECTION
        ===================================== */

        .login-section {
          width: 50%;

          min-height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;

          background:
            linear-gradient(
              135deg,
              #111318 0%,
              #17191f 50%,
              #211b32 100%
            );

          position: relative;
        }


        /* Subtle background light */

        .login-section::before {
          content: "";

          position: absolute;

          width: 350px;
          height: 350px;

          border-radius: 50%;

          background: rgba(139, 92, 246, 0.08);

          filter: blur(100px);

          top: -150px;
          left: -150px;
        }


        /* =====================================
           LOGIN CARD
        ===================================== */

        .login-card {
          width: 430px;

          padding: 48px 55px;

          position: relative;
          z-index: 2;

          background: #1c1e23;

          border: 1px solid rgba(255,255,255,0.04);

          border-radius: 12px;

          box-shadow:
            0 20px 50px rgba(0,0,0,0.35);

          animation: loginAppear 0.7s ease forwards;
        }


        @keyframes loginAppear {

          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }


        /* =====================================
           LOGO
        ===================================== */

        .logo-container {
          width: 42px;
          height: 42px;

          margin-bottom: 24px;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo-image {
          width: 42px;
          height: 42px;

          object-fit: contain;

          border-radius: 8px;
        }


        /* =====================================
           TITLE
        ===================================== */

        .login-card h1 {
          margin: 0;

          color: #ffffff;

          font-size: 28px;

          font-weight: 600;

          letter-spacing: -0.5px;
        }

        .login-description {
          margin: 8px 0 30px;

          color: #8e929a;

          font-size: 12px;
        }


        /* =====================================
           INPUT
        ===================================== */

        .input-group {
          margin-bottom: 22px;
        }

        .input-group label {
          display: block;

          margin-bottom: 9px;

          color: #8e929a;

          font-size: 11px;

          font-weight: 400;
        }

        .input-box {
          height: 42px;

          display: flex;
          align-items: center;

          border-bottom: 1px solid #3b3d42;

          transition: 0.3s ease;
        }

        .input-box:focus-within {
          border-bottom-color: #9b6de8;
        }

        .input-icon {
          color: #777b84;

          font-size: 13px;

          margin-right: 10px;
        }

        .input-box input {
          width: 100%;

          height: 100%;

          border: none;
          outline: none;

          background: transparent;

          color: #ffffff;

          font-size: 13px;
        }

        .input-box input::placeholder {
          color: #5f6269;
        }

        .input-error {
          border-bottom-color: #ef4444;
        }

        .password-eye {
          color: #777b84;

          font-size: 13px;

          cursor: pointer;

          transition: 0.2s;
        }

        .password-eye:hover {
          color: #ffffff;
        }


        /* =====================================
           ERROR
        ===================================== */

        .error {
          margin: 6px 0 0;

          color: #f87171;

          font-size: 10px;
        }


        /* =====================================
           OPTIONS
        ===================================== */

        .options {
          display: flex;

          justify-content: space-between;
          align-items: center;

          margin: 8px 0 24px;
        }

        .remember {
          display: flex;
          align-items: center;

          gap: 6px;

          color: #777b84;

          font-size: 10px;

          cursor: pointer;
        }

        .remember input {
          width: 11px;
          height: 11px;

          accent-color: #9865e5;
        }

        .forgot {
          color: #8d64d6;

          font-size: 10px;

          text-decoration: none;

          transition: 0.2s;
        }

        .forgot:hover {
          color: #b48cf0;
        }


        /* =====================================
           LOGIN BUTTON
        ===================================== */

        .login-button {
          width: 100%;

          height: 43px;

          border: none;

          border-radius: 7px;

          background: #0000FF;

          color: white;

          font-size: 12px;

          cursor: pointer;

          box-shadow:
            0 8px 20px rgba(149,100,223,0.2);

          transition: all 0.3s ease;
        }

        .login-button:hover {
          background: #a774ed;

          transform: translateY(-2px);

          box-shadow:
            0 12px 25px rgba(149,100,223,0.3);
        }

        .login-button:active {
          transform: scale(0.98);
        }


        /* =====================================
           REGISTER
        ===================================== */

        .register-area {
          margin-top: 70px;

          display: flex;

          justify-content: space-between;
          align-items: center;

          color: #73767d;

          font-size: 10px;
        }

        .register {
          padding: 7px 15px;

          border-radius: 5px;

          background: #303238;

          color: #ffffff;

          text-decoration: none;

          transition: 0.3s;
        }

        .register:hover {
          background: #9564df;
        }


        /* =====================================
           RIGHT WELCOME SECTION
        ===================================== */

        .welcome-section {
          width: 50%;

          min-height: 100vh;

          position: relative;

          overflow: hidden;

          background:
            linear-gradient(
              135deg,
              #9560df 0%,
              #8752d4 50%,
              #9a68e5 100%
            );

          display: flex;

          justify-content: center;
          align-items: center;
        }


        /* =====================================
           DECORATIVE SHAPES
        ===================================== */

        .shape {
          position: absolute;

          border-radius: 50%;

          border: 1px solid rgba(255,255,255,0.10);

          background: rgba(255,255,255,0.06);
        }

        .shape-one {
          width: 260px;
          height: 180px;

          top: -70px;
          right: -30px;

          transform: rotate(-15deg);
        }

        .shape-two {
          width: 250px;
          height: 180px;

          top: 25%;

          left: -130px;

          transform: rotate(20deg);
        }

        .shape-three {
          width: 300px;
          height: 200px;

          bottom: -80px;

          left: 5%;

          transform: rotate(-20deg);
        }

        .shape-four {
          width: 200px;
          height: 140px;

          right: -70px;

          bottom: 15%;

          transform: rotate(20deg);
        }


        /* =====================================
           WELCOME CONTENT
        ===================================== */

        .welcome-content {
          width: 80%;

          max-width: 580px;

          position: relative;

          z-index: 2;

          color: white;

          animation: welcomeAppear 1s ease forwards;
        }

        @keyframes welcomeAppear {

          from {
            opacity: 0;
            transform: translateX(30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }

        }

        .small-title {
          margin: 0 0 12px;

          color: rgba(255,255,255,0.75);

          font-size: 10px;

          letter-spacing: 2px;

          font-weight: 500;
        }

        .welcome-content h2 {
          margin: 0;

          font-size: 46px;

          line-height: 1.05;

          font-weight: 700;

          letter-spacing: -1px;
        }

        .welcome-content h2 span {
          font-weight: 300;
        }

        .welcome-description {
          margin-top: 12px;

          color: rgba(255,255,255,0.75);

          font-size: 11px;
        }


        /* =====================================
           SIMPLE ILLUSTRATION
        ===================================== */

        .illustration {
          height: 330px;

          margin-top: 25px;

          position: relative;
        }


        /* Laptop */

        .laptop {
          position: absolute;

          width: 300px;

          height: 190px;

          left: 50%;

          top: 70px;

          transform: translateX(-50%);
        }

        .laptop-screen {
          width: 230px;
          height: 155px;

          margin: auto;

          background: #f8f8f8;

          border: 5px solid #222;

          border-radius: 8px;

          position: relative;

          box-shadow:
            0 15px 20px rgba(0,0,0,0.15);
        }

        .laptop-base {
          width: 290px;
          height: 15px;

          background: #222;

          position: absolute;

          bottom: 15px;

          left: 5px;

          border-radius: 3px 3px 15px 15px;
        }

        .screen-header {
          width: 80px;
          height: 7px;

          background: #9564df;

          position: absolute;

          top: 20px;
          left: 20px;

          border-radius: 5px;
        }

        .screen-line {
          height: 5px;

          background: #d5d5d5;

          position: absolute;

          left: 20px;

          border-radius: 5px;
        }

        .line-one {
          width: 110px;
          top: 45px;
        }

        .line-two {
          width: 85px;
          top: 60px;
        }

        .line-three {
          width: 100px;
          top: 75px;
        }

        .screen-circle {
          width: 45px;
          height: 45px;

          border: 6px solid #9564df;

          border-radius: 50%;

          position: absolute;

          right: 25px;
          bottom: 20px;
        }


        /* =====================================
           PEOPLE
        ===================================== */

        .person {
          position: absolute;

          z-index: 4;
        }

        .person .head {
          width: 28px;
          height: 28px;

          border-radius: 50%;

          background: white;

          border: 2px solid #222;
        }

        .person .body {
          width: 40px;
          height: 75px;

          margin-left: -5px;

          background: white;

          border: 2px solid #222;

          border-radius: 20px 20px 8px 8px;
        }

        .person .arm {
          width: 45px;
          height: 8px;

          background: white;

          border: 2px solid #222;

          position: absolute;

          border-radius: 10px;
        }

        .person .leg {
          width: 9px;
          height: 65px;

          background: white;

          border: 2px solid #222;

          position: absolute;

          border-radius: 10px;
        }

        .person-one {
          left: 24%;

          top: 130px;

          transform: rotate(5deg);
        }

        .person-one .arm-left {
          top: 35px;
          left: -35px;

          transform: rotate(-35deg);
        }

        .person-one .arm-right {
          top: 38px;
          right: -35px;

          transform: rotate(30deg);
        }

        .person-one .leg-left {
          left: 4px;
          top: 70px;

          transform: rotate(8deg);
        }

        .person-one .leg-right {
          right: 2px;
          top: 70px;

          transform: rotate(-10deg);
        }


        .person-two {
          right: 20%;

          top: 85px;

          transform: rotate(-8deg);
        }

        .person-two .arm-left {
          top: 35px;
          left: -38px;

          transform: rotate(-30deg);
        }

        .person-two .arm-right {
          top: 35px;
          right: -35px;

          transform: rotate(40deg);
        }

        .person-two .leg-left {
          left: 2px;
          top: 70px;

          transform: rotate(25deg);
        }

        .person-two .leg-right {
          right: 0;
          top: 70px;

          transform: rotate(-25deg);
        }


        /* =====================================
           RESPONSIVE
        ===================================== */

        @media (max-width: 900px) {

          .login-page {
            flex-direction: column;
          }

          .login-section {
            width: 100%;
            min-height: 100vh;
          }

          .welcome-section {
            display: none;
          }

          .login-card {
            width: 90%;
            max-width: 430px;
          }

        }


        @media (max-width: 500px) {

          .login-card {
            padding: 35px 28px;
          }

          .register-area {
            margin-top: 45px;
          }

        }

      `}</style>
    </>
  );
}

export default Login;
