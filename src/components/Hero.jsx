export default function Hero({ profile }) {
  return (
    <header className="hero" id="home">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true">✦</div>
      <div className="hero-orbit hero-orbit-two" aria-hidden="true">✿</div>
      <div className="hero-content">
        <p className="eyebrow">hello, i’m {profile.shortName.toLowerCase()}</p>
        <h1><span>Yong’s </span>{'    '}<span>Portfolio</span></h1>
        <br></br>
        <p className="hero-intro">{profile.introduction}</p>
        <div className="hero-actions">
          <a className="button button-secondary" href={profile.resume} download>Download Résumé ↓</a>
          <br></br>
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a className="text-link" href={profile.tiktok} target="_blank" rel="noreferrer">TikTok ↗</a>
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
        <span aria-hidden="true">↓</span>
      </a>
    </header>
  )
}
