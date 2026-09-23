export default function Projects({ projects }) {
  return (
    <section className="section projects" id="work" aria-labelledby="projects-heading">
      <div className="section-heading-row">
        <div>
          <div className="section-label">03 · things i’ve made</div>
          <h2 id="projects-heading">Selected Work</h2>
        </div>
        <p>Projects at the intersection of full-stack engineering, data, and thoughtful product design.</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.name}>
            <div className="project-number" aria-hidden="true">0{index + 1}</div>
            <p className="project-date">{project.dates}</p>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <ul className="tag-list" aria-label={`${project.name} technologies`}>
              {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
            {project.href && (
              <a className="text-link" href={project.href} target="_blank" rel="noreferrer">View project ↗</a>
            )}
            <span className="card-sparkle" aria-hidden="true">✦</span>
          </article>
        ))}
      </div>
    </section>
  )
}
