import { useEffect, useState } from "react";
import "../App.css";
import AptitudeCoding from "../pages/AptitudeCoding";
import Coding from "../pages/Coding";
import ProgressTracker from "../pages/ProgressTracker";
import generateAgentResponse, { loadChatHistory } from "../utils/agent";
import { useAuth } from "../context/useAuth";

const navigation = [
  { id: "dashboard", icon: "⌂", label: "Dashboard" },
  { id: "aptitude", icon: "🧠", label: "Aptitude Practice" },
  { id: "coding", icon: "💻", label: "Coding Practice" },
  { id: "mock-interview", icon: "🎤", label: "Mock Interview" },
  { id: "resume", icon: "📄", label: "Resume Analyzer" },
  { id: "roadmap", icon: "🗺", label: "Placement Roadmap" },
  { id: "progress", icon: "📊", label: "My Progress" },
];

const preparationModules = [
  {
    id: "aptitude",
    icon: "🧠",
    title: "Aptitude Practice",
    description:
      "Practice quantitative aptitude, logical reasoning and verbal ability.",
    button: "Start Practice",
  },
  {
    id: "coding",
    icon: "💻",
    title: "Coding Practice",
    description:
      "Prepare for coding rounds using problem-solving patterns and programming questions.",
    button: "Practice Coding",
  },
  {
    id: "mock-interview",
    icon: "🎤",
    title: "Mock Interview",
    description:
      "Practice technical and HR interviews in a realistic interview environment.",
    button: "Start Interview",
  },
  {
    id: "resume",
    icon: "📄",
    title: "Resume Analyzer",
    description:
      "Upload your resume and identify areas that can be improved for placement applications.",
    button: "Analyze Resume",
  },
  {
    id: "roadmap",
    icon: "🗺",
    title: "Placement Roadmap",
    description:
      "Follow a structured path from fundamentals to technical and HR interview preparation.",
    button: "View Roadmap",
  },
  {
    id: "progress",
    icon: "📊",
    title: "My Progress",
    description:
      "Review your completed aptitude practice and solved coding problems.",
    button: "View Progress",
  },
];

export function MainLayout() {
  const { user } = useAuth();
  const displayName = user?.name?.trim() || "Student";
  const displayInitial = displayName.charAt(0).toUpperCase() || "U";
  const [activePage, setActivePage] = useState("dashboard");
  const [agentOpen, setAgentOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "agent",
      text: "Hi! I'm your Placement Agent. I can guide you about the section you're currently viewing. Ask me a specific placement-related question.",
    },
  ]);
  const [agentInput, setAgentInput] = useState("");

  useEffect(() => {
    loadChatHistory()
      .then((history) => {
        if (history.length) {
          setMessages(history.map((message) => ({
            sender: message.role === "user" ? "user" : "agent",
            text: message.content,
          })));
        }
      })
      .catch((error) => console.error("Chat history error:", error));
  }, []);

  const currentPage =
    navigation.find((item) => item.id === activePage) || navigation[0];

  async function sendAgentMessage() {
    const question = agentInput.trim();
    if (!question) return;

    const chatHistory = messages.map((message) => ({
      role: message.sender === "user" ? "user" : "assistant",
      content: message.text,
    }));

    setMessages((previous) => [
      ...previous,
      { sender: "user", text: question },
      { sender: "agent", text: "..." },
    ]);

    setAgentInput("");

    const answer = await generateAgentResponse(
      question,
      chatHistory
    );

    setMessages((previous) => {
      const updated = [...previous];
      const lastIndex = updated.length - 1;

      if (
        lastIndex >= 0 &&
        updated[lastIndex].sender === "agent" &&
        updated[lastIndex].text === "..."
      ) {
        updated[lastIndex] = {
          sender: "agent",
          text: answer,
        };
      } else {
        updated.push({ sender: "agent", text: answer });
      }

      return updated;
    });
  }

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">P</div>
          <div>
            <h2>PlaceMate</h2>
            <span>Placement Preparation</span>
          </div>
        </div>

        <div className="navigation-title">PREPARATION</div>

        <nav className="navigation">
          {navigation.map((item) => (
            <button
              key={item.id}
              className={
                activePage === item.id ? "nav-item active" : "nav-item"
              }
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="roadmap-mini-card">
            <div className="mini-icon">🎯</div>
            <h3>Start Your Journey</h3>
            <p>
              Choose a preparation module and begin building your placement
              readiness.
            </p>
            <button onClick={() => setActivePage("roadmap")}>
              Explore Roadmap
            </button>
          </div>

          <div className="profile-mini">
            <div className="avatar">{displayInitial}</div>
            <div className="profile-details">
              <strong>{displayName}</strong>
              <span>Placement Candidate</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <header className="topbar">
          <div>
            <span className="breadcrumb">
              Placement Preparation / {currentPage.label}
            </span>

            <h1>
              {activePage === "dashboard"
                ? "Your Placement Dashboard"
                : currentPage.label}
            </h1>
          </div>

          <div className="topbar-actions">
            <button
              className="notification-button"
              aria-label="Notifications"
            >
              🔔
            </button>

            <div className="top-profile">
              <div className="avatar">{displayInitial}</div>
              <div>
                <strong>{displayName}</strong>
                <span>Placement Candidate</span>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        {activePage === "dashboard" ? (
          <Dashboard setActivePage={setActivePage} />
        ) : activePage === "aptitude" ? (
          <AptitudeCoding />
        ) : activePage === "coding" ? (
          <Coding />
        ) : activePage === "progress" ? (
          <ProgressTracker />
        ) : (
          <ModulePage activePage={activePage} />
        )}
      </main>

      {/* PLACEMENT AGENT TOGGLE BUTTON */}
      <button
        className={agentOpen ? "robot-button robot-active" : "robot-button"}
        onClick={() => setAgentOpen((previous) => !previous)}
        aria-label="Open Placement Agent"
      >
        🤖
      </button>

      {/* PLACEMENT AGENT WINDOW */}
      {agentOpen && (
        <div className="agent-window">
          <div className="agent-header">
            <div className="agent-profile">
              <div className="agent-avatar">🤖</div>
              <div>
                <strong>PlaceMate Agent</strong>
                <span>● Ready to help</span>
              </div>
            </div>

            <button
              onClick={() => setAgentOpen(false)}
              aria-label="Close Placement Agent"
            >
              ×
            </button>
          </div>

          <div className="agent-context">
            Current section: <strong>{currentPage.label}</strong>
          </div>

          <div className="agent-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user"
                    ? "agent-message user"
                    : "agent-message bot"
                }
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="agent-input">
            <input
              type="text"
              value={agentInput}
              placeholder="Ask your question..."
              onChange={(event) => setAgentInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendAgentMessage();
                }
              }}
            />

            <button
              onClick={sendAgentMessage}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({ setActivePage }) {
  return (
    <div className="dashboard">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">YOUR PLACEMENT JOURNEY</span>

          <h2>
            Build your skills.
            <br />
            Prepare with confidence.
          </h2>

          <p>
            Choose a preparation area below and start working towards your
            placement goals.
          </p>

          <button onClick={() => setActivePage("roadmap")}>
            Start Preparation <span>→</span>
          </button>
        </div>

        <div className="hero-visual">
          <div className="circle circle-one" />
          <div className="circle circle-two" />
          <div className="hero-emoji">🎯</div>
        </div>
      </section>

      <section className="status-section">
        <div className="section-heading">
          <div>
            <span>YOUR PREPARATION</span>
            <h2>Start where you need it most</h2>
          </div>
        </div>

        <div className="module-grid">
          {preparationModules.map((module) => (
            <div className="module-card" key={module.id}>
              <div className="module-icon">{module.icon}</div>

              <h3>{module.title}</h3>

              <p>{module.description}</p>

              <button onClick={() => setActivePage(module.id)}>
                {module.button} <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bottom-grid">
        <div className="information-card">
          <div className="information-icon">📌</div>

          <div>
            <span>NOT STARTED</span>
            <h3>Your preparation starts here</h3>
            <p>
              Your dashboard does not contain any completed activities yet.
            </p>
          </div>
        </div>

        <div className="information-card">
          <div className="information-icon">💡</div>

          <div>
            <span>RECOMMENDATION</span>
            <h3>Begin with the Placement Roadmap</h3>
            <p>
              The roadmap can help you understand which topics to prepare
              before moving on.
            </p>

            <button onClick={() => setActivePage("roadmap")}>
              View Roadmap →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ModulePage({ activePage }) {
  const moduleData = {
    "mock-interview": {
      icon: "🎤",
      label: "MOCK INTERVIEW",
      title: "Practice before the real interview.",
      description:
        "Simulate technical, HR and behavioral interviews.",
      action: "Start Mock Interview",
    },

    resume: {
      icon: "📄",
      label: "RESUME ANALYZER",
      title: "Build a stronger placement resume.",
      description:
        "Upload your resume to analyze structure and ATS compatibility.",
      action: "Upload Resume",
    },

    roadmap: {
      icon: "🗺",
      label: "PLACEMENT ROADMAP",
      title: "Follow a structured preparation path.",
      description:
        "Work through aptitude, DSA, concepts, and mock interviews.",
      action: "Start Roadmap",
    },

    progress: {
      icon: "📊",
      label: "MY PROGRESS",
      title: "Track your actual preparation.",
      description:
        "Your progress will be calculated from completed activities.",
      action: "View Progress",
    },
  };

  const data = moduleData[activePage] || moduleData.roadmap;

  return (
    <div className="module-page">
      <div className="module-hero">
        <div className="large-module-icon">{data.icon}</div>

        <span>{data.label}</span>

        <h2>{data.title}</h2>

        <p>{data.description}</p>

        <button>
          {data.action} <span>→</span>
        </button>
      </div>

      <div className="empty-module">
        <div className="empty-icon">✨</div>
        <h3>Nothing completed yet</h3>
        <p>
          This section will show your activity and progress after you begin.
        </p>
      </div>
    </div>
  );
}

export default MainLayout;