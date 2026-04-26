import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Universe } from './components/Universe';
import { Projects } from './components/Projects';
import { Marquee } from './components/Marquee';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { TechStack } from './components/TechStack';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <div id="hero-about-scene" style={{ position: 'relative' }}>
        <Hero />
        <About />
      </div>
      <Universe />
      <Projects />
      <Marquee />
      <Experience />
      <Education />
      <TechStack />
      <Contact />
    </div>
  );
}
