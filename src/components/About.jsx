import PhotoCarousel from './PhotoCarousel'

export default function About({ profile, photos }) {
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <div className="section-label">01 · a little intro</div>
      <div className="about-grid">
        <div className="photo-collage">
          <PhotoCarousel photos={photos} />
          <div className="photo-tape" aria-hidden="true" />
        </div>
        <div className="about-copy">
          <h2 id="about-heading">About Me</h2>
          {profile.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="education-card">
            <span className="education-icon" aria-hidden="true">✦</span>
            <div>
              <strong>Cal Poly Pomona</strong>
              <p>B.S. Computer Science · Minor in Artificial Intelligence</p>
              <small>GPA 3.67 · Expected December 2027</small>
            </div>
          </div>
          <p className="location">Based in {profile.location}</p>
        </div>
      </div>
    </section>
  )
}
