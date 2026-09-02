export default function Contact({ profile }) {
  return (
    <footer className="contact" id="contact">
      <div className="contact-flower" aria-hidden="true">✿</div>
      <div className="section-label">05 · say hello</div>
      <h2>Let’s Connect</h2>
      <p>I’m always happy to talk about software, machine learning, and the next interesting thing to build.</p>
      <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
      <div className="contact-links">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href={profile.resume} download>Download résumé ↓</a>
      </div>
      <div className="footer-line">
        <span>Designed with care by {profile.shortName}</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  )
}
