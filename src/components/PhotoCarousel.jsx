import { useEffect, useRef, useState } from 'react'

const AUTOPLAY_MS = 4500

export default function PhotoCarousel({ photos }) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    if (typeof window.matchMedia === 'function') {
      prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  }, [])

  useEffect(() => {
    if (isPaused || prefersReducedMotion.current || photos.length <= 1) return undefined
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % photos.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [isPaused, photos.length])

  const goTo = (next) => setIndex((next + photos.length) % photos.length)
  const photo = photos[index]

  return (
    <div
      className="photo-frame photo-frame-main carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos of Yong"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <img key={photo.src} className="carousel-photo" src={photo.src} alt={photo.alt} />
      <div className="carousel-overlay">
        <p className="carousel-caption">{photo.caption}</p>
        <div className="carousel-dots" role="tablist" aria-label="Choose photo">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show photo ${i + 1} of ${photos.length}`}
              className={`carousel-dot${i === index ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        className="carousel-arrow carousel-arrow-prev"
        aria-label="Previous photo"
        onClick={() => goTo(index - 1)}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        className="carousel-arrow carousel-arrow-next"
        aria-label="Next photo"
        onClick={() => goTo(index + 1)}
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  )
}
