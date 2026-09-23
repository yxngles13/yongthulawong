import { useState } from 'react'

export default function Navigation({ items, resumeHref }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="nav-shell">
        <a className="nav-mark" href="#home" aria-label="Yong’s portfolio home">Y.</a>
        <button
          className="nav-toggle"
          type="button"
          aria-controls="primary-nav-list"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span aria-hidden="true">{isOpen ? '×' : '☰'}</span>
        </button>
        <ul id="primary-nav-list" className="nav-list" data-open={isOpen}>
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>
            </li>
          ))}
          <li>
            <a className="nav-resume" href={resumeHref} download onClick={() => setIsOpen(false)}>Résumé ↓</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
