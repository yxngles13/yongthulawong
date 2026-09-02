import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Navigation from './components/Navigation'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { experiences, navigation, profile, projects, skillGroups } from './data/portfolio'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation items={navigation} />
      <Hero profile={profile} />
      <main id="main-content">
        <About profile={profile} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Skills groups={skillGroups} />
      </main>
      <Contact profile={profile} />
    </>
  )
}
