export default function Skills({ groups }) {
  return (
    <section className="section skills" aria-labelledby="skills-heading">
      <div className="section-heading-row">
        <div>
          <div className="section-label">04 · the toolkit</div>
          <h2 id="skills-heading">Skills</h2>
        </div>
        <p>Technologies I use to move from an idea to a dependable product.</p>
      </div>
      <div className="skills-grid">
        {groups.map((group) => (
          <article className="skill-group" key={group.label}>
            <h3>{group.label}</h3>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
