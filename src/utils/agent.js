// src/utils/agent.js
import { API_URL } from "./api";
import { apiRequest } from "./api";

const CONVERSATION_KEY = "placy-conversation-id";
const LEGACY_PAGE_CONTEXT = /^\[Context: User is on [^\]]+ page\]\s*/;

function createConversationId() {
  return globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getConversationId() {
  let conversationId = localStorage.getItem(CONVERSATION_KEY);
  if (!conversationId) {
    conversationId = createConversationId();
    localStorage.setItem(CONVERSATION_KEY, conversationId);
  }
  return conversationId;
}

export function startNewConversation() {
  const conversationId = createConversationId();
  localStorage.setItem(CONVERSATION_KEY, conversationId);
  return conversationId;
}

export function clearConversationId() {
  localStorage.removeItem(CONVERSATION_KEY);
}

export async function loadChatHistory() {
  let session;
  try {
    session = await apiRequest(`/chat/history/${encodeURIComponent(getConversationId())}`);
  } catch (error) {
    if (error.message === "Conversation not found.") return [];
    throw error;
  }
  return session.messages.map(({ role, content }) => ({
    role,
    content: role === "user" ? content.replace(LEGACY_PAGE_CONTEXT, "") : content,
  }));
}

export default async function generateAgentResponse(
  question,
  chatHistory = [],
  onChunk
) {
  const messages = [...chatHistory, { role: "user", content: question }];

  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      body: JSON.stringify({ messages, conversationId: getConversationId() }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to generate response.");
    }

    // Stream response chunks
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullResponse += chunk;

      // Update UI progressively
      if (onChunk) {
        onChunk(chunk, fullResponse);
      }
    }

    return fullResponse;
  } catch (error) {
    console.error("Agent error:", error);
    if (error instanceof TypeError) {
      return "Placy couldn't reach the backend. Check that the backend server is running and try again.";
    }
    return `Placy couldn't generate a response: ${error.message}`;
  }
}
