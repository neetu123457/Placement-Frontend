import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { clearConversationId } from "../utils/agent";

const API_URL = "http://localhost:5000/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);
  const [agentQuestion, setAgentQuestion] = useState("");
  const [agentReply, setAgentReply] = useState("");
  const [agentLoading, setAgentLoading] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to fetch dashboard");
      }

      const data = await response.json();

      setUser(data.user);
      setDashboard(data.dashboard);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const askAgent = async () => {
    if (!agentQuestion.trim()) return;

    setAgentLoading(true);
    setAgentReply("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/agent/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: agentQuestion,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAgentReply(data.reply);
      } else {
        setAgentReply("Unable to get a response right now.");
      }
    } catch (error) {
      console.error(error);
      setAgentReply("Unable to connect to the placement agent.");
    } finally {
      setAgentLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    clearConversationId();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}

      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>

        <div className="brand">
          <div className="brand-logo">P</div>
          <div>
            <h2>PlacePrep</h2>
            <span>Career Preparation</span>
          </div>
        </div>

        <nav className="sidebar-navigation">

          <p className="menu-label">MAIN</p>

          <a href="/dashboard" className="nav-item active">
            <span>⌂</span>
            Dashboard
          </a>

          <a href="/progress" className="nav-item">
            <span>◔</span>
            My Progress
          </a>

          <p className="menu-label">PREPARATION</p>

          <a href="/aptitude" className="nav-item">
            <span>🧠</span>
            Aptitude
          </a>

          <a href="/coding" className="nav-item">
            <span>💻</span>
            Coding Practice
          </a>

          <a href="/mock-interview" className="nav-item">
            <span>🎤</span>
            Mock Interview
          </a>

          <a href="/interview-questions" className="nav-item">
            <span>❓</span>
            Interview Questions
          </a>

          <p className="menu-label">CAREER</p>

          <a href="/resume-analyzer" className="nav-item">
            <span>📄</span>
            Resume Analyzer
          </a>

          <a href="/roadmaps" className="nav-item">
            <span>🗺️</span>
            Roadmaps
          </a>

          <a href="/companies" className="nav-item">
            <span>🏢</span>
            Companies
          </a>

          <a href="/analytics" className="nav-item">
            <span>📊</span>
            Analytics
          </a>

        </nav>

        <div className="sidebar-bottom">

          <a href="/settings" className="nav-item">
            <span>⚙️</span>
            Settings
          </a>

          <button className="logout-button" onClick={logout}>
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}

      <main className="dashboard-main">

        {/* TOP NAVBAR */}

        <header className="dashboard-header">

          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <div className="header-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search preparation topics..."
            />
          </div>

          <div className="header-actions">

            <button className="notification-button">
              🔔
            </button>

            <div className="user-profile">

              <div className="user-avatar">
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div className="user-details">
                <strong>{user?.name || "User"}</strong>
                <span>{user?.email || ""}</span>
              </div>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <section className="dashboard-content">

          {/* WELCOME */}

          <div className="welcome-section">

            <div>
              <p className="welcome-small">Welcome back 👋</p>

              <h1>
                {user?.name || "Student"}
              </h1>

              <p>
                Continue your placement preparation from where you left off.
              </p>
            </div>

            <button
              className="continue-button"
              onClick={() => {
                window.location.href = "/roadmaps";
              }}
            >
              Continue Preparation →
            </button>

          </div>

          {/* REAL STATS */}

          <div className="stats-grid">

            <StatCard
              title="Mock Interviews"
              value={dashboard?.stats?.mockInterviews}
              icon="🎤"
              link="/mock-interview"
            />

            <StatCard
              title="Coding Problems"
              value={dashboard?.stats?.codingProblems}
              icon="💻"
              link="/coding"
            />

            <StatCard
              title="Aptitude Tests"
              value={dashboard?.stats?.aptitudeTests}
              icon=" 🧠"
              link="/aptitude"
            />

            <StatCard
              title="Resume Analyses"
              value={dashboard?.stats?.resumeAnalyses}
              icon="📄"
              link="/resume-analyzer"
            />

          </div>

          {/* PREPARATION AREA */}

          <div className="dashboard-grid">

            {/* CURRENT ROADMAP */}

            <section className="dashboard-card roadmap-card">

              <div className="card-header">

                <div>
                  <h2>Current Roadmap</h2>
                  <p>Your active preparation roadmap</p>
                </div>

                <a href="/roadmaps">View all</a>

              </div>

              {dashboard?.roadmap ? (

                <div className="roadmap-content">

                  <div className="roadmap-title">
                    <div className="roadmap-icon">
                      🗺️
                    </div>

                    <div>
                      <h3>{dashboard.roadmap.title}</h3>

                      <p>
                        {dashboard.roadmap.description}
                      </p>
                    </div>
                  </div>

                  <div className="progress-section">

                    <div className="progress-label">
                      <span>Progress</span>

                      <strong>
                        {dashboard.roadmap.progress || 0}%
                      </strong>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-value"
                        style={{
                          width: `${dashboard.roadmap.progress || 0}%`,
                        }}
                      />
                    </div>

                  </div>

                  <button
                    className="roadmap-button"
                    onClick={() =>
                      window.location.href =
                        `/roadmaps/${dashboard.roadmap._id}`
                    }
                  >
                    Continue Roadmap
                  </button>

                </div>

              ) : (

                <EmptyState
                  icon="🗺️"
                  title="No roadmap selected"
                  description="Choose a roadmap to start structured placement preparation."
                  button="Explore Roadmaps"
                  link="/roadmaps"
                />

              )}

            </section>

            {/* PREPARATION SUMMARY */}

            <section className="dashboard-card">

              <div className="card-header">

                <div>
                  <h2>Preparation Summary</h2>
                  <p>Your actual activity</p>
                </div>

                <a href="/analytics">Analytics</a>

              </div>

              {dashboard?.summary ? (

                <div className="summary-list">

                  <SummaryItem
                    title="Aptitude"
                    completed={dashboard.summary.aptitude}
                  />

                  <SummaryItem
                    title="Coding"
                    completed={dashboard.summary.coding}
                  />

                  <SummaryItem
                    title="Technical Interviews"
                    completed={dashboard.summary.technical}
                  />

                  <SummaryItem
                    title="HR Preparation"
                    completed={dashboard.summary.hr}
                  />

                </div>

              ) : (

                <EmptyState
                  icon="📊"
                  title="No preparation data yet"
                  description="Complete activities to see your preparation summary."
                />

              )}

            </section>

          </div>

          {/* TWO COLUMN */}

          <div className="dashboard-grid">

            {/* RECENT ACTIVITY */}

            <section className="dashboard-card">

              <div className="card-header">

                <div>
                  <h2>Recent Activity</h2>
                  <p>Your latest preparation activity</p>
                </div>

                <a href="/progress">View progress</a>

              </div>

              {dashboard?.recentActivity?.length > 0 ? (

                <div className="activity-list">

                  {dashboard.recentActivity.map((activity) => (

                    <div
                      className="activity-item"
                      key={activity._id}
                    >

                      <div className="activity-icon">
                        {activity.icon || "•"}
                      </div>

                      <div className="activity-info">

                        <strong>
                          {activity.title}
                        </strong>

                        <span>
                          {activity.description}
                        </span>

                      </div>

                      <time>
                        {new Date(
                          activity.createdAt
                        ).toLocaleDateString()}
                      </time>

                    </div>

                  ))}

                </div>

              ) : (

                <EmptyState
                  icon="📝"
                  title="No recent activity"
                  description="Your completed preparation activities will appear here."
                />

              )}

            </section>

            {/* COMPANY PREPARATION */}

            <section className="dashboard-card">

              <div className="card-header">

                <div>
                  <h2>Company Preparation</h2>
                  <p>Your selected companies</p>
                </div>

                <a href="/companies">Explore</a>

              </div>

              {dashboard?.companies?.length > 0 ? (

                <div className="company-list">

                  {dashboard.companies.map((company) => (

                    <div
                      className="company-item"
                      key={company._id}
                    >

                      <div className="company-logo">
                        {company.name?.charAt(0)}
                      </div>

                      <div>
                        <strong>{company.name}</strong>
                        <span>
                          {company.type || "Company preparation"}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          window.location.href =
                            `/companies/${company._id}`
                        }
                      >
                        →
                      </button>

                    </div>

                  ))}

                </div>

              ) : (

                <EmptyState
                  icon="🏢"
                  title="No companies selected"
                  description="Select companies to prepare specifically for their recruitment process."
                  button="Choose Companies"
                  link="/companies"
                />

              )}

            </section>

          </div>

          {/* QUICK ACCESS */}

          <section className="quick-access">

            <div className="quick-header">
              <h2>Preparation Tools</h2>
              <p>Choose what you want to work on</p>
            </div>

            <div className="quick-grid">

              <QuickCard
                icon="🧠"
                title="Aptitude"
                description="Practice quantitative, logical and verbal aptitude."
                link="/aptitude"
              />

              <QuickCard
                icon="💻"
                title="Coding"
                description="Practice programming and technical problems."
                link="/coding"
              />

              <QuickCard
                icon="🎤"
                title="Mock Interview"
                description="Practice interview questions and improve your answers."
                link="/mock-interview"
              />

              <QuickCard
                icon="📄"
                title="Resume Analyzer"
                description="Analyze your resume and identify improvement areas."
                link="/resume-analyzer"
              />

              <QuickCard
                icon="🗺️"
                title="Roadmaps"
                description="Follow a structured preparation roadmap."
                link="/roadmaps"
              />

              <QuickCard
                icon="🏢"
                title="Company Preparation"
                description="Prepare according to company-specific recruitment rounds."
                link="/companies"
              />

            </div>

          </section>

        </section>

      </main>

      {/* AI AGENT */}

      <button
        className={`agent-button ${agentOpen ? "agent-active" : ""}`}
        onClick={() => setAgentOpen(!agentOpen)}
        aria-label="Open Placement Agent"
      >
        🤖
      </button>

      {agentOpen && (

        <div className="agent-panel">

          <div className="agent-header">

            <div className="agent-title">

              <div className="agent-avatar">
                🤖
              </div>

              <div>
                <strong>Placement Agent</strong>
                <span>Ask about your preparation</span>
              </div>

            </div>

            <button
              onClick={() => setAgentOpen(false)}
            >
              ×
            </button>

          </div>

          <div className="agent-body">

            {agentReply ? (

              <div className="agent-message">
                {agentReply}
              </div>

            ) : (

              <div className="agent-welcome">
                <div>👋</div>

                <strong>
                  How can I help you?
                </strong>

                <p>
                  Ask me something related to your placement preparation.
                </p>

              </div>

            )}

            {agentLoading && (
              <div className="agent-loading">
                Thinking...
              </div>
            )}

          </div>

          <div className="agent-input">

            <input
              type="text"
              value={agentQuestion}
              onChange={(e) =>
                setAgentQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAgent();
                }
              }}
              placeholder="Ask your placement question..."
            />

            <button
              onClick={askAgent}
              disabled={agentLoading}
            >
              ↑
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================
   STAT CARD
========================= */

function StatCard({
  title,
  value,
  icon,
  link,
}) {
  return (
    <div className="stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          {icon}
        </div>

        <a href={link}>View →</a>

      </div>

      <div className="stat-value">
        {typeof value === "number" ? value : "—"}
      </div>

      <div className="stat-title">
        {title}
      </div>

    </div>
  );
}


/* =========================
   EMPTY STATE
========================= */

function EmptyState({
  icon,
  title,
  description,
  button,
  link,
}) {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      {button && link && (
        <a
          href={link}
          className="empty-button"
        >
          {button}
        </a>
      )}

    </div>
  );
}


/* =========================
   SUMMARY ITEM
========================= */

function SummaryItem({
  title,
  completed,
}) {
  return (
    <div className="summary-item">

      <div className="summary-item-header">

        <span>{title}</span>

        <strong>
          {completed || 0}
        </strong>

      </div>

      <div className="summary-progress">

        <div
          style={{
            width:
              completed > 0
                ? `${Math.min(completed, 100)}%`
                : "0%",
          }}
        />

      </div>

    </div>
  );
}


/* =========================
   ACTIVITY CARD
========================= */

function QuickCard({
  icon,
  title,
  description,
  link,
}) {
  return (
    <a
      href={link}
      className="quick-card"
    >

      <div className="quick-icon">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <span className="quick-arrow">
        →
      </span>

    </a>
  );
}

export default Dashboard;