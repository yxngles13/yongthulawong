import { useEffect, useRef, useState } from "react";
import { suggestedQuestions } from "./yongbotData";
import { useYongBot } from "./YongBotContext";

// Messages, suggested questions, and the input box. Used by the corner panel and the landing page.
// The landing variant hides the message list until the visitor asks something.
export default function ChatThread({ variant = "panel" }) {
  const { messages, loading, ask, askSuggestion } = useYongBot();

  // Stores what the visitor is typing
  const [input, setInput] = useState("");

  const listRef = useRef(null);
  const hasStarted = messages.some((message) => message.role === "user");
  const showMessages = variant === "panel" || hasStarted;

  // Keep the newest message in view (scrolls the list itself so the page doesn't jump)
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, loading, showMessages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim() || loading) return;
    ask(input);
    setInput("");
  };

  return (
    <div className={`yongbot-thread yongbot-thread-${variant}${hasStarted ? " has-started" : ""}`}>
      {/* Conversation messages */}
      {showMessages && (
        <div className="yongbot-messages" ref={listRef} role="log" aria-live="polite">
          {messages.map((message, index) => (
            <div key={index} className={`yongbot-message ${message.role}`}>
              {message.text}
            </div>
          ))}

          {loading && <div className="yongbot-message bot">typing... ♡</div>}
        </div>
      )}

      {/* Suggested questions */}
      <div className="yongbot-suggestions">
        {suggestedQuestions.map((question) => (
          <button
            key={question.id}
            type="button"
            onClick={() => askSuggestion(question)}
            disabled={loading}
          >
            {question.label}
          </button>
        ))}
      </div>

      {/* Message input */}
      <form className="yongbot-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={variant === "landing" ? "ask me anything about yong..." : "ask me anything..."}
          aria-label="Message YongBot"
          disabled={loading}
          maxLength={1000}
        />

        {/* Send button */}
        <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
          ↑
        </button>
      </form>
    </div>
  );
}
