import { useState, useEffect } from "react";
import ChatThread from "./ChatThread";
import "./YongBot.css";
import yongbotAvatar from "../../assets/logo.jpg";

// True while the landing page (#home) is on screen, where the big chat already lives.
function useLandingVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const home = document.getElementById("home");
    if (!home || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(home);
    return () => observer.disconnect();
  }, []);

  return visible;
}

export default function YongBot() {
  // Controls whether the chatbot is open
  const [isOpen, setIsOpen] = useState(false);

  const landingVisible = useLandingVisible();

  // The landing page already shows the chat, so the corner YongBot waits until visitors scroll past it
  if (landingVisible) return null;

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

          <ChatThread variant="panel" />

        </section>
      )}

    </div>
  );
}
