import PhotoCarousel from './PhotoCarousel'

// The About section is styled as an old travel license: photo on the left, fill-in-the-blank fields on the right.
export default function About({ profile, photos }) {
  const fields = [
    ['Issued to', profile.name],
    ['Studying', 'B.S. Computer Science · Minor in AI'],
    ['Place of issue', 'Cal Poly Pomona'],
    ['Based in', profile.location],
    ['Graduating', 'December 2027'],
  ]

  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <div className="section-label">01 · a little intro</div>
      <article className="license">
        <div className="license-photo">
          <PhotoCarousel photos={photos} />
          <p className="license-caption">Photograph of authorized developer</p>
        </div>

        <div className="license-body">
          <p className="license-kicker">Permanent license of</p>
          <h2 id="about-heading">About Me</h2>
          <p className="license-number">No. CPP-CS-2027</p>

          <dl className="license-fields">
            {fields.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="license-subhead">Statement</h3>
          {profile.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          <span className="license-stamp" aria-hidden="true">certified<br />developer</span>

          <div className="license-signature">
            <span aria-hidden="true">{profile.name}</span>
            <small>Signature of authorized developer</small>
          </div>
        </div>
      </article>
    </section>
  )
}
