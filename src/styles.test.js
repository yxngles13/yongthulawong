// @vitest-environment node
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8')

describe('responsive and accessible visual system', () => {
  it('defines the portfolio color tokens', () => {
    for (const token of ['--cream', '--paper', '--pink', '--pink-soft', '--taupe', '--ink']) {
      expect(css).toContain(token)
    }
  })

  it('includes mobile and reduced-motion behavior', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*720px\)/)
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
  })

  it('includes visible keyboard focus styling', () => {
    expect(css).toMatch(/:focus-visible/)
    expect(css).toMatch(/outline:/)
  })
})
