import { useEffect, useState } from 'react';
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
import StudenzBitDetail from './components/StudenzBitDetail';

export default function App() {
  const [isStudenzBitDetailOpen, setIsStudenzBitDetailOpen] = useState(() => window.location.hash === '#studenzbit');

  useEffect(() => {
    const onHashChange = () => setIsStudenzBitDetailOpen(window.location.hash === '#studenzbit');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openProjectDetail = (projectName: string) => {
    if (projectName === 'StudenzBit') {
      window.location.hash = 'studenzbit';
    }
  };

  if (isStudenzBitDetailOpen) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <StudenzBitDetail />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <HeroAboutScene />
      <Universe />
      <Projects onOpenProjectDetail={openProjectDetail} />
      <Marquee />
      <Experience />
      <Education />
      <TechStack />
      <Contact />
      <Footer />
    </div>
  );
}
