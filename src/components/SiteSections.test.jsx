import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('portfolio page', () => {
  it('renders the core story and all major sections', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: /yong’s portfolio/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /experiences/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /selected work/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /let’s connect/i })).toBeInTheDocument()
  })

  it('renders truthful experience and project content', () => {
    render(<App />)

    expect(screen.getByText('California State University, Chancellor’s Office')).toBeInTheDocument()
    expect(screen.getByText('Cadence Design Systems')).toBeInTheDocument()
    expect(screen.getByText('Eye Tracking Analysis')).toBeInTheDocument()
    expect(screen.getByText('BrainHive')).toBeInTheDocument()
  })

  it('provides external profile links and a downloadable résumé', () => {
    render(<App />)

    expect(screen.getAllByRole('link', { name: /github/i })[0]).toHaveAttribute('href', 'https://github.com/yxngles13')
    expect(screen.getAllByRole('link', { name: /linkedin/i })[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/yong-thu-la-wong')
    const resumeLinks = screen.getAllByRole('link', { name: /résumé/i })
    expect(resumeLinks.length).toBeGreaterThanOrEqual(3)
    resumeLinks.forEach((link) => expect(link).toHaveAttribute('download'))
  })

  it('opens and closes the mobile navigation accessibly', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button', { name: /open navigation/i })

    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    await user.click(screen.getByRole('link', { name: 'about' }))
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})
