import { useEffect, useRef, useState } from 'react'

function ExperienceCard({ item, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <div className="experience-card-backdrop" onClick={onClose}>
      <article
        className={`experience-card folder-${item.folder.color}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-card-title"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="experience-card-tab">{item.dates}</span>
        <button className="experience-card-close" type="button" aria-label="Close experience" autoFocus onClick={onClose}>
          ✕
        </button>
        <header className="experience-card-header">
          <h3 id="experience-card-title">{item.role}</h3>
          <p className="organization">{item.organization}</p>
          <p className="experience-card-location">{item.location}</p>
        </header>
        <ul className="experience-card-points">
          {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <ul className="tag-list" aria-label={`${item.role} technologies`}>
          {item.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </article>
    </div>
  )
}

export default function Experience({ experiences }) {
  const [openIndex, setOpenIndex] = useState(null)
  const folderRefs = useRef([])

  const close = () => {
    const index = openIndex
    setOpenIndex(null)
    folderRefs.current[index]?.focus()
  }

  return (
    <section className="section experience" id="experience" aria-labelledby="experience-heading">
      <div className="section-label">02 · where i’ve been</div>
      <h2 id="experience-heading">Experiences</h2>

      <ul className="folder-grid">
        {experiences.map((item, index) => (
          <li key={`${item.organization}-${item.role}`}>
            <button
              className={`folder folder-${item.folder.color}${openIndex === index ? ' is-open' : ''}`}
              type="button"
              ref={(node) => { folderRefs.current[index] = node }}
              aria-label={`${item.role} at ${item.organization}, ${item.dates}`}
              aria-haspopup="dialog"
              onClick={() => setOpenIndex(index)}
            >
              <span className="folder-back" aria-hidden="true" />
              <span className="folder-peek" aria-hidden="true">
                {item.folder.peek.map((peek) => (
                  <span className={`peek peek-${peek.type}`} key={peek.text}>{peek.text}</span>
                ))}
              </span>
              <span className="folder-front" aria-hidden="true" />
            </button>
            <p className="folder-label">{item.folder.label}</p>
            <p className="folder-dates">{item.dates}</p>
          </li>
        ))}
      </ul>

      {openIndex !== null && <ExperienceCard item={experiences[openIndex]} onClose={close} />}
    </section>
  )
}
