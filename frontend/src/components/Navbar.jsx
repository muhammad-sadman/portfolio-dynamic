// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);

      // Active section detection
      const sections = ['hero', 'about', 'experience', 'projects', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <div id="scroll-progress" style={{ width: `${progress}%` }} />
      <nav className={`fixed top-0 left-0 right-0 z-50 px-[6vw] py-4 border-b transition-all duration-300 ${
        scrolled ? 'navbar-scrolled bg-bg/95 backdrop-blur-xl border-white/8' : 'bg-transparent border-transparent'
      }`}>
        <div className="flex items-center justify-between">
          <a href="#hero" className="font-head font-extrabold text-xl text-textCustom tracking-tight group">
            <span className="group-hover:text-accent transition-colors">YN</span>
            <span className="text-accent">.</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-8 list-none items-center">
            {links.map(({ href, label }) => {
              const sectionId = href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`relative text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-textCustom' : 'text-text2 hover:text-textCustom'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:inline-flex bg-accent hover:bg-accent2 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20">
              Hire Me
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 group"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-textCustom transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-textCustom transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-textCustom transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu md:hidden ${menuOpen ? 'open' : ''}`}>
          <ul className="flex flex-col gap-0 pt-4 pb-2 list-none">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-sm text-text2 hover:text-textCustom border-b border-white/5 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block bg-accent text-white text-center py-2.5 rounded-full text-sm font-semibold">
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
