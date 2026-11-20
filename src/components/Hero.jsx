import { useEffect, useRef } from 'react'
import ChatThread from './YongBot/ChatThread'
import { useYongBot } from './YongBot/YongBotContext'

// Landing → About "tension": wheel travel builds up a pull before the page glides over.
const PULL_THRESHOLD = 140 // wheel travel (px) needed to leave or return to the landing page
const GLIDE_MS = 850 // length of the glide between the two
const SETTLE_MS = 450 // momentum scrolling is ignored this long after a glide lands

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Where the About section's content starts, just under the fixed nav (skips its top padding).
function aboutTarget() {
  const about = document.getElementById('about')
  if (!about) return window.innerHeight
  const nav = document.querySelector('.site-nav')
  const padding = parseFloat(getComputedStyle(about).paddingTop)
  return Math.round(about.getBoundingClientRect().top + window.scrollY + padding - (nav?.offsetHeight ?? 0) - 24)
}

// True when the wheel is over the landing chat's message list and that list can still scroll that way.
function chatCanScroll(target, delta) {
  const list = target instanceof Element ? target.closest('.yongbot-messages') : null
  if (!list) return false
  if (delta < 0) return list.scrollTop > 0
  return list.scrollTop + list.clientHeight < list.scrollHeight - 1
}

function glideTo(top, onDone) {
  const start = window.scrollY
  if (prefersReducedMotion()) {
    window.scrollTo({ top, behavior: 'instant' })
    onDone()
    return
  }
  const startedAt = performance.now()
  const step = (now) => {
    const t = Math.min((now - startedAt) / GLIDE_MS, 1)
    const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
    window.scrollTo({ top: start + (top - start) * eased, behavior: 'instant' })
    if (t < 1) requestAnimationFrame(step)
    else onDone()
  }
  requestAnimationFrame(step)
}

export default function Hero({ profile }) {
  const heroRef = useRef(null)
  const glideRef = useRef(() => {})
  const { messages } = useYongBot()
  const hasStarted = messages.some((message) => message.role === 'user')

  useEffect(() => {
    const hero = heroRef.current
    let pull = 0
    let gliding = false
    let settleUntil = 0
    let resetTimer = 0

    const setPull = (value) => {
      pull = value
      hero.style.setProperty('--pull', value)
    }
    const go = (top) => {
      gliding = true
      setPull(0)
      glideTo(top, () => {
        gliding = false
        settleUntil = performance.now() + SETTLE_MS
      })
    }
    glideRef.current = go

    const onWheel = (event) => {
      const target = aboutTarget()
      const y = window.scrollY
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : 1)

      // Scrolling through the conversation scrolls the chat, not the page, until it reaches the end.
      if (chatCanScroll(event.target, delta)) return

      // Deeper in the page: scroll normally, but stop hard at About's top instead of sliding into the landing page.
      if (y > target + 4) {
        if (delta < 0 && y + delta < target) {
          event.preventDefault()
          window.scrollTo({ top: target, behavior: 'instant' })
          settleUntil = performance.now() + SETTLE_MS
        }
        return
      }

      const atAboutTop = y >= target - 4
      if (atAboutTop && delta > 0) return

      event.preventDefault()
      if (gliding) return
      // Swallow leftover trackpad momentum: keep settling until the wheel goes quiet for a moment.
      if (performance.now() < settleUntil) {
        settleUntil = performance.now() + 200
        return
      }

      // Caught between the two pages: finish the move right away in the direction of the scroll.
      if (y > 4 && !atAboutTop) {
        go(delta > 0 ? target : 0)
        return
      }
      if (y <= 4 && delta < 0) return

      if (Math.sign(delta) !== Math.sign(pull)) setPull(0)
      setPull(Math.max(-PULL_THRESHOLD, Math.min(PULL_THRESHOLD, pull + delta)))

      clearTimeout(resetTimer)
      resetTimer = setTimeout(() => setPull(0), 220)

      if (pull >= PULL_THRESHOLD) go(target)
      else if (pull <= -PULL_THRESHOLD) go(0)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      clearTimeout(resetTimer)
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <header className={`hero${hasStarted ? ' has-started' : ''}`} id="home" ref={heroRef}>
      <div className="hero-id">
        <h1>{profile.name}</h1>
        {!hasStarted && <p className="hero-greeting">what would you like to know about me?</p>}
      </div>

      <div className="hero-chat">
        <ChatThread variant="landing" />
      </div>

      <a
        className="scroll-cue"
        href="#about"
        aria-label="Scroll to about section"
        onClick={(event) => {
          event.preventDefault()
          glideRef.current(aboutTarget())
        }}
      >
        <span aria-hidden="true">↓</span>
      </a>
    </header>
  )
}
