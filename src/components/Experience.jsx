export default function Experience({ experiences }) {
  return (
    <section className="section experience" id="experience" aria-labelledby="experience-heading">
      <div className="section-label">03 · where i’ve been</div>
      <h2 id="experience-heading">Experiences</h2>
      <div className="experience-list">
        {experiences.map((item, index) => (
          <article className="experience-card" key={`${item.organization}-${item.role}`}>
            <div className="experience-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
            <div className="experience-body">
              <div className="experience-header">
                <div>
                  <h3>{item.role}</h3>
                  <p className="organization">{item.organization}</p>
                </div>
                <div className="experience-meta">
                  <strong>{item.dates}</strong>
                  <span>{item.location}</span>
                </div>
              </div>
              <p className="experience-summary">{item.summary}</p>
              <ul>
                {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
