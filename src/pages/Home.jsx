import { Link } from "react-router-dom";
import {
  Target,
  FileText,
  Map,
  Code,
  TrendingUp,
  MessageCircle
} from "lucide-react";

function Home() {
  return (
    <div className="home-page">

      {/* =========================
          HERO SECTION
      ========================== */}

      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-tag">
            🚀 Placement Preparation Platform
          </p>

          <h1>
            Prepare Smarter.
            <br />
            Get Interview Ready.
          </h1>

          <p className="hero-description">
            Practice interviews, analyze your resume,
            follow career roadmaps and track your
            placement preparation progress in one place.
          </p>

          <div className="hero-buttons">

            <Link
              to="/dashboard"
              className="hero-primary-button"
            >
              Go to Dashboard
            </Link>

            <Link
              to="/register"
              className="hero-secondary-button"
            >
              Get Started
            </Link>

          </div>

        </div>


        {/* Hero Right Side */}

        <div className="hero-dashboard">

          <div className="mini-dashboard">

            <div className="mini-dashboard-header">
              <span>My Progress</span>
              <strong>68%</strong>
            </div>

            <div className="home-progress-container">

              <div
                className="home-progress-bar"
                style={{ width: "68%" }}
              ></div>

            </div>


            <div className="mini-stats">

              <div>
                <strong>85</strong>
                <span>Questions</span>
              </div>

              <div>
                <strong>12</strong>
                <span>Interviews</span>
              </div>

              <div>
                <strong>82</strong>
                <span>Resume Score</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURES
      ========================== */}

      <section className="features-section">

        <div className="section-heading">

          <h2>
            Everything You Need for Placement Preparation
          </h2>

          <p>
            Build your skills and prepare confidently
            for technical and HR interviews.
          </p>

        </div>


        <div className="features-grid">


          {/* Mock Interview */}

          <div className="feature-card">

            <div className="feature-icon">
              <Target size={30} />
            </div>

            <h3>
              Mock Interviews
            </h3>

            <p>
              Practice technical and HR interviews
              with timed questions and feedback.
            </p>

            <Link to="/dashboard">
              Practice Now →
            </Link>

          </div>


          {/* Resume Analyzer */}

          <div className="feature-card">

            <div className="feature-icon">
              <FileText size={30} />
            </div>

            <h3>
              Resume Analyzer
            </h3>

            <p>
              Analyze your resume and get suggestions
              to improve your placement chances.
            </p>

            <Link to="/resume-analyzer">
              Analyze Resume →
            </Link>

          </div>


          {/* Roadmaps */}

          <div className="feature-card">

            <div className="feature-icon">
              <Map size={30} />
            </div>

            <h3>
              Career Roadmaps
            </h3>

            <p>
              Follow structured learning paths for
              Frontend, Backend, Full Stack and more.
            </p>

            <Link to="/dashboard">
              View Roadmaps →
            </Link>

          </div>


          {/* Practice Questions */}

          <div className="feature-card">

            <div className="feature-icon">
              <Code size={30} />
            </div>

            <h3>
              Practice Questions
            </h3>

            <p>
              Solve aptitude, coding, DSA and
              interview questions.
            </p>

            <Link to="/dashboard">
              Start Practice →
            </Link>

          </div>


          {/* Progress Tracker */}

          <div className="feature-card">

            <div className="feature-icon">
              <TrendingUp size={30} />
            </div>

            <h3>
              Progress Tracker
            </h3>

            <p>
              Track your preparation progress and
              identify areas that need improvement.
            </p>

            <Link to="/dashboard">
              View Progress →
            </Link>

          </div>


          {/* AI Assistant */}

          <div className="feature-card">

            <div className="feature-icon">
              <MessageCircle size={30} />
            </div>

            <h3>
              Interview Assistant
            </h3>

            <p>
              Get guidance about interviews, resumes,
              roadmaps and preparation.
            </p>

            <Link to="/dashboard">
              Ask Assistant →
            </Link>

          </div>

        </div>

      </section>


      {/* =========================
          CALL TO ACTION
      ========================== */}

      <section className="home-cta">

        <h2>
          Ready to Start Your Placement Preparation?
        </h2>

        <p>
          Start practicing today and improve your
          interview skills step by step.
        </p>

        <Link
          to="/register"
          className="hero-primary-button"
        >
          Start Preparing
        </Link>

      </section>


      {/* =========================
          FOOTER
      ========================== */}

      <footer className="home-footer">

        <p>
          © 2026 Placement Prep. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;