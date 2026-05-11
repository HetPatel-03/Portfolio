import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroAboutScene } from './components/HeroAboutScene';
import { Universe } from './components/Universe';
import { Projects } from './components/Projects';
import { Marquee } from './components/Marquee';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { TechStack } from './components/TechStack';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const navigate = useNavigate();

  // Legacy hash links → real route (StudenzBit used to open via #studenzbit on /)
  useEffect(() => {
    if (window.location.hash !== '#studenzbit') return;
    navigate('/projects/studenzbit', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <HeroAboutScene />
      <Universe />
      <Projects />
      <Marquee />
      <Experience />
      <Education />
      <TechStack />
      <Contact />
      <Footer />
    </div>
  );
}
