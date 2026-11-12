import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const scribblePath = 'M10 120 C 80 10, 140 180, 200 60 S 320 170, 360 40 S 470 190, 520 70 S 600 150, 590 30 M 20 30 C 120 160, 220 -20, 300 120 S 450 10, 560 160 M 40 170 C 150 60, 250 200, 330 90 S 500 -10, 600 110 M 0 80 C 90 200, 180 0, 280 150 S 430 30, 600 180'

// Degrees between neighbouring cards on the wheel. Large enough that the chord
// between cards (2 · radius · sin(step / 2)) exceeds the card height, so they never touch.
const ANGLE_STEP = 38

// Scroll "tension" knobs.
const SCROLL_PER_CARD_VH = 90 // how far you scroll to move one card
const HOLD = 0.22 // share of each card's scroll range at either end where the wheel stays put
const FOLLOW = 0.1 // how quickly the wheel catches up to the scroll (lower = heavier)

const smootherstep = (t) => t * t * t * (t * (t * 6 - 15) + 10)

// Keeps the wheel resting on each card for a moment before easing to the next one.
function withDwell(raw) {
  const base = Math.floor(raw)
  const t = Math.min(Math.max((raw - base - HOLD) / (1 - 2 * HOLD), 0), 1)
  return base + smootherstep(t)
}

function ArtWord({ text }) {
  return <span className="art-word" data-text={text} />
}

function ProjectArt({ art = {} }) {
  if (art.image) {
    return <img className="art-image" src={art.image} alt="" />
  }

  switch (art.style) {
    case 'placeholder':
      return (
        <div className="art art-placeholder">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <rect x="5" y="9" width="38" height="30" rx="3" />
            <circle cx="17" cy="20" r="3.5" />
            <path d="M5 34 L17 25 L26 31 L33 26 L43 33" />
          </svg>
          <span>image coming soon</span>
        </div>
      )
    case 'waves':
      return (
        <div className="art art-waves">
          <svg viewBox="0 0 600 190" preserveAspectRatio="none">
            <path d="M-40 30 C 60 170, 160 -60, 260 70 S 420 200, 520 40 S 640 120, 660 110" />
            <path d="M-40 170 C 80 60, 200 260, 330 150 S 520 40, 660 190" />
          </svg>
        </div>
      )
    case 'scribble':
      return (
        <div className="art art-scribble">
          <svg viewBox="0 0 600 190" preserveAspectRatio="none">
            <path d={scribblePath} vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      )
    case 'stamp':
      return (
        <div className="art art-stamp">
          {Array.from({ length: 36 }, (_, index) => <ArtWord key={index} text={art.text} />)}
        </div>
      )
    case 'bubble':
      return <div className="art art-bubble"><ArtWord text={art.text} /></div>
    case 'heatmap':
      return <div className="art art-heatmap"><ArtWord text={art.text} /></div>
    case 'type':
    default:
      return <div className="art art-type"><ArtWord text={art.text} /></div>
  }
}

function ProjectViewer({ project, origin, onClose }) {
  const windowRef = useRef(null)

  // Grow the viewer out of the clicked card: start at the card's box, then animate to full size.
  useLayoutEffect(() => {
    const node = windowRef.current
    if (!origin || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const target = node.getBoundingClientRect()
    node.style.transformOrigin = 'top left'
    node.style.transform = `translate(${origin.left - target.left}px, ${origin.top - target.top}px) scale(${origin.width / target.width}, ${origin.height / target.height})`
    node.getBoundingClientRect()
    node.style.transition = 'transform 480ms cubic-bezier(0.2, 0.8, 0.2, 1)'
    node.style.transform = ''
  }, [origin])

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
    <div className="project-viewer-backdrop" onClick={onClose}>
      <div
        className="project-viewer"
        ref={windowRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-viewer-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="window-bar">
          <button className="window-close" type="button" aria-label="Close project" autoFocus onClick={onClose}>
            ✕
          </button>
          <h3 id="project-viewer-title">{project.name}</h3>
        </div>
        <div className="project-viewer-body">
          <div className="project-viewer-demo">
            {project.demo ? (
              <video src={project.demo} autoPlay muted loop playsInline controls />
            ) : (
              <div className="demo-placeholder">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="24" cy="24" r="20" />
                  <path d="M20 16 L32 24 L20 32 Z" />
                </svg>
                <span>demo coming soon</span>
              </div>
            )}
          </div>
          <aside className="project-viewer-info">
            <p className="project-date">{project.dates}</p>
            <p>{project.summary}</p>
            {project.technologies.length > 0 && (
              <ul className="tag-list" aria-label={`${project.name} technologies`}>
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            )}
            {project.href && (
              <a className="text-link" href={project.href} target="_blank" rel="noreferrer">View project ↗</a>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

export default function Projects({ projects }) {
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const bubbleRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [bubbleVisible, setBubbleVisible] = useState(false)
  const [viewer, setViewer] = useState(null)
  const activeIndex = Math.round(progress)
  const current = projects[activeIndex]

  useEffect(() => {
    const follow = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 1 : FOLLOW
    let frame = 0
    let target = 0
    let shown = 0

    const readTarget = () => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const ratio = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0
      target = withDwell(ratio * (projects.length - 1))
    }
    const tick = () => {
      shown += (target - shown) * follow
      if (Math.abs(target - shown) < 0.001) shown = target
      setProgress(shown)
      frame = shown === target ? 0 : requestAnimationFrame(tick)
    }
    const onScroll = () => {
      readTarget()
      if (!frame) frame = requestAnimationFrame(tick)
    }

    readTarget()
    shown = target
    setProgress(shown)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [projects.length])

  const closeViewer = useCallback(() => setViewer(null), [])

  const scrollToProject = (index) => {
    const track = trackRef.current
    const scrollable = track.offsetHeight - window.innerHeight
    const top = track.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (scrollable * index) / (projects.length - 1), behavior: 'smooth' })
  }

  const moveBubble = (event) => {
    const stage = stageRef.current.getBoundingClientRect()
    bubbleRef.current.style.transform = `translate(${event.clientX - stage.left}px, ${event.clientY - stage.top}px)`
  }

  return (
    <section className="section projects" id="work" aria-labelledby="projects-heading">
      <div className="section-heading-row">
        <div>
          <div className="section-label">03 · things i’ve made</div>
          <h2 id="projects-heading">Selected Work</h2>
        </div>
        <p>Projects at the intersection of full-stack engineering, data, and thoughtful product design.</p>
      </div>

      <div className="wheel-track" ref={trackRef} style={{ height: `${projects.length * SCROLL_PER_CARD_VH + 100}vh` }}>
        <div className="wheel-stage" ref={stageRef} onPointerMove={moveBubble}>
          <div className="wheel-meta wheel-meta-left" aria-hidden="true">
            <span className="wheel-meta-small" data-text={current.dates} />
            <span className="wheel-meta-name" data-text={current.name} />
          </div>
          <div className="wheel-meta wheel-meta-right" aria-hidden="true">
            <span className="wheel-meta-small">{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            <span className="wheel-meta-name">{projects.length} projects</span>
          </div>

          <div className="wheel">
            {projects.map((project, index) => {
              const offset = index - progress
              const distance = Math.abs(offset)
              const isActive = index === activeIndex
              return (
                <article
                  className={`project-window${isActive ? ' is-active' : ''}`}
                  key={project.name}
                  style={{
                    transform: `rotateX(${-offset * ANGLE_STEP}deg) translateZ(var(--wheel-radius))`,
                    opacity: Math.max(0, 1 - Math.max(0, distance - 1.2)),
                    zIndex: 100 - Math.round(distance * 10),
                  }}
                >
                  <div className="window-bar">
                    <span className="window-close" aria-hidden="true">✕</span>
                    <h3>{project.name}</h3>
                  </div>
                  <button
                    className="window-art"
                    type="button"
                    aria-label={`View details for ${project.name}`}
                    onClick={(event) => {
                      if (!isActive) return scrollToProject(index)
                      setBubbleVisible(false)
                      setViewer({ project, origin: event.currentTarget.closest('.project-window').getBoundingClientRect() })
                    }}
                    onPointerEnter={() => setBubbleVisible(isActive)}
                    onPointerLeave={() => setBubbleVisible(false)}
                  >
                    <ProjectArt art={project.art} />
                    <span className="window-label">{project.dates}</span>
                  </button>
                </article>
              )
            })}
          </div>

          <div className={`view-bubble${bubbleVisible ? ' is-visible' : ''}`} ref={bubbleRef} aria-hidden="true">
            <span>view<br />project</span>
          </div>
        </div>
      </div>

      {viewer && <ProjectViewer project={viewer.project} origin={viewer.origin} onClose={closeViewer} />}
    </section>
  )
}
