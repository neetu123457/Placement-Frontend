// src/utils/agent.js
export default async function generateAgentResponse(
  question,
  activePage,
  chatHistory = [],
  onChunk
) {
  // Add page context if available
  const currentMessage = activePage
    ? `[Context: User is on ${activePage} page] ${question}`
    : question;

  const messages = [...chatHistory, { role: "user", content: currentMessage }];

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
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
    return "I'm Placy, your placement preparation assistant 🤖. I couldn't reach the backend server right now. Please try again.";
  }
}
