// frontend/src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-textCustom selection:bg-accent/30 overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <footer className="bg-bg2 border-t border-white/5 px-[6vw] py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-head font-extrabold text-xl text-textCustom tracking-tight">
            YN<span className="text-accent">.</span>
          </div>
          <p className="font-mono text-xs text-text3">
            © {new Date().getFullYear()} Sadman. Built with React & Django.
          </p>
          <div className="flex gap-5 text-xs text-text2">
            <a href="#about" className="hover:text-textCustom transition-colors">About</a>
            <a href="#projects" className="hover:text-textCustom transition-colors">Projects</a>
            <a href="#contact" className="hover:text-textCustom transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
