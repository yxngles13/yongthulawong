
import { useState, useEffect, useRef } from "react";
import { suggestedQuestions } from "./yongbotData";
import "./YongBot.css";
import yongbotAvatar from "../../assets/logo.jpg";

export default function YongBot() {
  // Controls whether the chatbot is open
  const [isOpen, setIsOpen] = useState(false);

  // Stores what the visitor is typing
  const [input, setInput] = useState("");

  // Tracks whether Grok is generating a response
  const [loading, setLoading] = useState(false);

  // Stores the conversation history
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "hiii! i'm YongBot ♡ ask me about Yong!",
    },
  ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        });
    }
    }, [messages, loading, isOpen]);


  // Add a new message to the conversation
  const addMessage = (role, text) => {
    setMessages((prev) => [
      ...prev,
      { role, text },
    ]);
  };

  // Handle suggested questions
  const handleSuggestion = async(question) => {
    if (loading) return;

    // Display the selected question immediately
    addMessage("user", question.label);

    // Show the typing indicator
    setLoading(true);

    // Wait 1 second
    await new Promise((resolve) =>
        setTimeout(resolve, 1000)
    );

    // Display YongBot's answer
    addMessage("bot", question.answer);

    // Hide the typing indicator
    setLoading(false);
  };

  // Handle custom questions using Grok API
  const handleSubmit = async (event) => {
    event.preventDefault();

    const question = input.trim();

    // Prevent empty messages or duplicate requests
    if (!question || loading) return;

    const nextMessages = [
      ...messages,
      { role: "user", text: question },
    ];

    // Display the visitor's message immediately
    setMessages(nextMessages);
    setInput("");
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
      addMessage(
        "bot",
        data.reply || "sorry, i couldn't answer that ♡"
      );

    } catch (error) {
      console.error("YongBot error:", error);

      addMessage(
        "bot",
        "oops! my AI brain is taking a little break ♡"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="yongbot">

      {/* COLLAPSED: YongBot avatar */}
      {!isOpen ? (

        <div className="yongbot-bubble-wrapper">

          {/* Tooltip appears on hover */}
          <span className="yongbot-tooltip">
            curious about yong? ♡
          </span>

          {/* Clickable PNG avatar */}
          <button
            type="button"
            className="yongbot-bubble"
            onClick={() => setIsOpen(true)}
            aria-label="Open YongBot chat"
          >
            <img
              src={yongbotAvatar}
              alt=""
              className="yongbot-avatar"
            />
          </button>

        </div>

      ) : (

        /* EXPANDED: Chat interface */
        <section
          className="yongbot-panel"
          aria-label="YongBot chat"
        >

          {/* Chat header */}
          <header className="yongbot-header">

            <div>
              <h2>YongBot ♡</h2>
              <p>your little portfolio guide</p>
            </div>

            {/* Minimize button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close YongBot"
            >
              −
            </button>

          </header>

          {/* Conversation messages */}
          <div
            className="yongbot-messages"
            role="log"
            aria-live="polite"
          >
            {messages.map((message, index) => (
            <div
                key={index}
                className={`yongbot-message ${message.role}`}
                >
                {message.text}
                </div>
            ))}

            {loading && (
                <div className="yongbot-message bot">
                typing... ♡
                </div>
            )}

            {/* Invisible element at the bottom */}
            <div ref={messagesEndRef} />
            </div>

          {/* Suggested questions */}
          <div className="yongbot-suggestions">

            {suggestedQuestions.map((question) => (
              <button
                key={question.id}
                type="button"
                onClick={() => handleSuggestion(question)}
                disabled={loading}
              >
                {question.label}
              </button>
            ))}

          </div>

          {/* Message input */}
          <form
            className="yongbot-input"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="ask me anything..."
              aria-label="Message YongBot"
              disabled={loading}
              maxLength={1000}
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              ↑
            </button>

          </form>

        </section>
      )}

    </div>
  );
}
