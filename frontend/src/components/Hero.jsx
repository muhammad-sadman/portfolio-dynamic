// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';

const TYPED_STRINGS = ['Web Developer.', 'UI/UX Designer.', 'Problem Solver.', 'Full Stack Dev.'];

function TypedText() {
  const [displayed, setDisplayed] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    const current = TYPED_STRINGS[stringIndex];
    if (!deleting) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, 60 + Math.random() * 40);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, 35);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setStringIndex(i => (i + 1) % TYPED_STRINGS.length);
      }
    }
  }, [charIndex, deleting, paused, stringIndex]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="typed-cursor" />
    </span>
  );
}

// Floating particles
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.35,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.id % 3 === 0 ? '#6366f1' : p.id % 3 === 1 ? '#06b6d4' : '#22c55e',
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '15+', label: 'Projects Done' },
    { value: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-[6vw] pt-28 pb-16 relative overflow-hidden">
      {/* Background orbs */}
      <div className="mesh-orb absolute w-[700px] h-[700px] bg-accent rounded-full blur-[120px] opacity-[0.15] -top-40 -right-32 pointer-events-none" style={{ animationDuration: '12s' }} />
      <div className="mesh-orb absolute w-[500px] h-[500px] bg-cyanCustom rounded-full blur-[100px] opacity-[0.08] bottom-0 -left-32 pointer-events-none" style={{ animationDuration: '16s', animationDelay: '4s' }} />
      <div className="absolute w-[300px] h-[300px] bg-accent rounded-full blur-[80px] opacity-[0.06] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <Particles />

      {/* Grid lines bg decoration */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className={`max-w-[900px] z-10 font-body transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Badge */}
        <div className={`inline-flex items-center gap-2.5 bg-surface border border-white/10 rounded-full px-4 py-1.5 text-[0.78rem] font-mono text-accent tracking-widest mb-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="relative flex h-[7px] w-[7px]">
            <span className="ping-custom absolute inline-flex h-full w-full rounded-full bg-greenCustom opacity-75" />
            <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-greenCustom" />
          </span>
          AVAILABLE FOR WORK
        </div>

        {/* Heading */}
        <h1 className={`font-head font-extrabold text-5xl md:text-[5.5rem] tracking-tight leading-[1.05] mb-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Hi, I'm{' '}
          <span className="relative inline-block">
            <span className="text-textCustom">Sadman</span>
            <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-cyanCustom rounded-full opacity-70" />
          </span>
          <br />
          <TypedText />
        </h1>

        {/* Subtitle */}
        <p className={`text-xl text-text2 max-w-[560px] font-light mb-10 leading-relaxed transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          I craft fast, beautiful, and user-focused web experiences —{' '}
          <span className="text-textCustom/80">from clean frontends to scalable backends.</span>
        </p>

        {/* CTA buttons */}
        <div className={`flex gap-4 flex-wrap mb-16 transition-all duration-700 delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="#projects" className="glow-btn bg-accent hover:bg-accent2 shadow-lg hover:shadow-accent/30 text-white px-7 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all hover:-translate-y-0.5">
            View My Work
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 transition-transform group-hover:translate-x-1">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#" className="border border-white/10 text-textCustom hover:border-accent/50 hover:bg-accent/5 px-7 py-3.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all hover:-translate-y-0.5">
            Download CV
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M8 3v8M4 8l4 4 4-4M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className={`flex gap-8 flex-wrap transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {stats.map((s, i) => (
            <div key={i} className={`transition-all duration-500 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="font-head font-extrabold text-3xl text-textCustom mb-0.5 stat-number">{s.value}</div>
              <div className="text-xs text-text2 font-mono tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[10px] font-mono text-text3 tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </div>
    </section>
  );
}
