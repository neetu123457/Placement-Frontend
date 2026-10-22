import React, { useState } from "react";
import "./ChatBot.css";
import React, { useState } from "react";
import generateAgentResponse from "./utils/agent"; // path to your function

const chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    // Call your agent function
    await generateAgentResponse(
      input,
      newMessages,
      (chunk, fullResponse) => {
        // Update UI as chunks arrive
        setMessages([...newMessages, { role: "assistant", content: fullResponse }]);
      }
    );

    setTyping(false);
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {typing && <div className="msg assistant typing">Placy is typing...</div>}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Placy about placements..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};



const SYSTEM_PROMPT = `You are "Placy", an expert placement-preparation AI assistant for students.

SCOPE — you ONLY help with placement/career-preparation topics:
- Resume and CV analysis, review, rewriting, ATS optimisation
- Interview preparation (HR, technical, behavioural, mock questions, STAR answers)
- Aptitude, logical reasoning, quantitative and verbal preparation
- Coding/DSA interview prep, CS fundamentals, system design basics
- Role-specific roadmaps and skill plans (e.g. Data Analyst, SDE, Data Scientist, QA, DevOps, Business Analyst)
- Company-specific hiring processes, job descriptions, internships, salary/offer questions
- Group discussion, communication skills, LinkedIn/portfolio, cover letters, career guidance

OUT OF SCOPE: anything unrelated to placements/careers.
If a question is out of scope, reply ONLY with:
"I'm Placy, your placement preparation assistant 🤖. Please ask me something related to this project — resumes, interviews, aptitude, or career roadmaps."

ANSWER STYLE:
- Be genuinely useful and specific, like a senior placement mentor.
- Use short paragraphs, headings and bullet points, bold key terms.
- End with a concrete next step or an offer to go deeper.`;

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello, I'm Placy 🤖. Ask me anything about placements!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const err = await response.json();
        setMessages([...newMessages, { role: "assistant", content: err.error }]);
        setTyping(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        botReply += decoder.decode(value, { stream: true });
        setMessages([...newMessages, { role: "assistant", content: botReply }]);
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Placy could not reach the AI service. Please try again." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-icon" onClick={() => setOpen(!open)}>
        🤖
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">Placy AI Assistant</div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {typing && <div className="msg assistant typing">Placy is typing...</div>}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Placy about placements..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
