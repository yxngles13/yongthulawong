export default function Hero({ profile }) {
  return (
    <header className="hero" id="home">
      <div className="halftone halftone-top" aria-hidden="true" />
      <div className="halftone halftone-bottom" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true">✦</div>
      <div className="hero-orbit hero-orbit-two" aria-hidden="true">✿</div>
      <div className="hero-content">
        <p className="eyebrow">hello, i’m {profile.shortName.toLowerCase()}</p>
        <h1><span>Yong’s</span>{' '}<span>Portfolio</span></h1>
        <p className="hero-intro">{profile.introduction}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#about">Start Here</a>
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </div>
      <div className="hero-note" aria-hidden="true">
        <span>currently</span>
        <strong>building useful things with code + curiosity</strong>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
        <span aria-hidden="true">↓</span>
      </a>
    </header>
  )
}
