import { createContext, useContext, useRef, useState } from "react";

// One conversation shared by the landing-page chat and the corner YongBot panel.
const YongBotContext = createContext(null);

export function YongBotProvider({ children }) {
  // Stores the conversation history
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "hiii! i'm YongBot ♡ ask me about Yong!",
    },
  ]);

  // Tracks whether Grok is generating a response
  const [loading, setLoading] = useState(false);

  // Mirrors `messages` so ask() always sends the latest history
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Add a new message to the conversation
  const addMessage = (role, text) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  // Handle suggested questions
  const askSuggestion = async (question) => {
    if (loading) return;

    // Display the selected question immediately
    addMessage("user", question.label);

    // Show the typing indicator, wait 1 second, then display YongBot's answer
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    addMessage("bot", question.answer);
    setLoading(false);
  };

  // Handle custom questions using Grok API
  const ask = async (text) => {
    const question = text.trim();

    // Prevent empty messages or duplicate requests
    if (!question || loading) return;

    const nextMessages = [...messagesRef.current, { role: "user", text: question }];

    // Display the visitor's message immediately
    setMessages(nextMessages);
    setLoading(true);

    try {
      // Send the conversation to our backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.slice(-10),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Display Grok's response
      addMessage("bot", data.reply || "sorry, i couldn't answer that ♡");
    } catch (error) {
      console.error("YongBot error:", error);
      addMessage("bot", "oops! my AI brain is taking a little break ♡");
    } finally {
      setLoading(false);
    }
  };

  return (
    <YongBotContext.Provider value={{ messages, loading, ask, askSuggestion }}>
      {children}
    </YongBotContext.Provider>
  );
}

export function useYongBot() {
  return useContext(YongBotContext);
}
