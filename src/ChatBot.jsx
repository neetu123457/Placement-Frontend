import React, { useState } from "react";

export default function Chat() {
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
}