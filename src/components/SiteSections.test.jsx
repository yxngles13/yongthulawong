import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('portfolio page', () => {
  it('renders the core story and all major sections', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: /yong thu la wong/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /experiences/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /selected work/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /let’s connect/i })).toBeInTheDocument()
  })

  it('renders truthful experience and project content', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: /software engineering intern at california state university/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /machine learning engineer intern at cadence design systems/i })).toBeInTheDocument()
    expect(screen.getByText('Eye Tracking Analysis')).toBeInTheDocument()
    expect(screen.getByText('Sloka')).toBeInTheDocument()
  })

  it('opens an experience card from its folder', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /machine learning engineer intern at cadence/i }))
    const card = screen.getByRole('dialog', { name: /machine learning engineer intern/i })
    expect(card).toHaveTextContent('87% accuracy')

    await user.click(screen.getByRole('button', { name: /close experience/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('asks YongBot a suggested question from the landing page', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    const landing = within(container.querySelector('#home'))

    await user.click(landing.getByRole('button', { name: /what's her major/i }))
    expect(await landing.findByText(/computer science with a minor/i, {}, { timeout: 2000 })).toBeInTheDocument()
  })

  it('provides external profile links and a downloadable résumé', () => {
    render(<App />)

    expect(screen.getAllByRole('link', { name: /github/i })[0]).toHaveAttribute('href', 'https://github.com/yxngles13')
    expect(screen.getAllByRole('link', { name: /linkedin/i })[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/yongthulawong/')
    expect(screen.getAllByRole('link', { name: /tiktok/i })[0]).toHaveAttribute('href', 'https://www.tiktok.com/@yxngles_13')


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
