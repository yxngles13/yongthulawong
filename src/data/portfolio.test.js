import { describe, expect, it } from 'vitest'
import { experiences, navigation, profile, projects, skillGroups } from './portfolio'

describe('portfolio data', () => {
  it('contains Yong’s professional identity and deployable contact links', () => {
    expect(profile.name).toBe('Yong Thu La Wong')
    expect(profile.email).toBe('yongthulaw@cpp.edu')
    expect(profile.github).toMatch(/^https:\/\/github\.com\//)
    expect(profile.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//)
    expect(profile.resume).toBe('/Yong_Thu_La_Wong_Software_Engineering_Intern_Resume__Summer_2027_.pdf')
  })

  it('provides a navigation target for every major section', () => {
    expect(navigation.map((item) => item.href)).toEqual([
      '#work', '#about', '#experience', '#contact',
    ])
  })

  it('includes every résumé experience and featured project', () => {
    expect(experiences.map((item) => item.organization)).toEqual([
      'California State University, Chancellor’s Office',
      'Cadence Design Systems',
      'Deep-Hipo Research',
    ])
    expect(projects.map((item) => item.name)).toEqual([
      'Eye Tracking Analysis', 'Project Sloka', 'BrainHive',
    ])
  })

  it('does not expose empty optional links or empty skill groups', () => {
    expect(projects.every((item) => !('href' in item) || /^https:\/\//.test(item.href))).toBe(true)
    expect(skillGroups.every((group) => group.items.length > 0)).toBe(true)
  })
})
