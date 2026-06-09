import React, { useState, useEffect, useRef } from 'react';

const SKILL_ICONS = {
  'React': '⚛️', 'Django': '💚', 'Python': '🐍', 'JavaScript': '💛',
  'MySQL': '🐬', 'Tailwind': '🎨', 'Node.js': '🟢', 'CSS': '🎨',
  'HTML5': '🏗️', 'Git': '🔀', 'REST API': '🌐', 'TypeScript': '🔷', 'Next.js': '▲', 'Vercel': '🌩️', 'Railway': '🚂', 'Github': '🟣',
};

export default function About() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/portfolio/skills/`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => { setSkills(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="px-[6vw] py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: Avatar with animated border */}
        <div className={`flex justify-center transition-all duration-800 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="relative">
            {/* Rotating border ring */}
            <div className="absolute -inset-4 rounded-2xl border border-dashed border-accent/20 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute -inset-8 rounded-2xl border border-dashed border-accent/10 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

            <div className="w-72 h-72 bg-gradient-to-br from-surface to-bg3 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden shadow-2xl">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-cyanCustom/10" />
              <span className="text-9xl relative z-10 animate-bounce" style={{ animationDuration: '3s' }}>🧑‍💻</span>

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-accent/40 rounded-tl" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-accent/40 rounded-tr" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-accent/40 rounded-bl" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-accent/40 rounded-br" />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-3 -right-6 bg-bg3 border border-white/10 rounded-full px-3 py-1 text-xs font-mono text-accent flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 bg-greenCustom rounded-full" />
              Open to work
            </div>
            <div className="absolute -bottom-3 -left-4 bg-bg3 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-text2 shadow-lg">
              📍 Chattogram, BD
            </div>
          </div>
        </div>

        {/* Right: Bio & Skills */}
        <div className={`transition-all duration-800 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <div className="section-line" />
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">// About Me</div>
          <h2 className="font-head text-4xl font-extrabold tracking-tight mb-5 text-textCustom leading-tight">
            Passionate about building <br />
            <span className="gradient-text">for the web.</span>
          </h2>
          <p className="text-text2 font-light mb-8 leading-relaxed">
            I'm a web developer based in Chattogram, Bangladesh. I love turning complex problems
            into clean, intuitive digital products. With a focus on performance and accessibility,
            I build experiences that people enjoy using.
          </p>

          {/* Quick info list */}
          <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
            {[
              ['🎓', 'CS Graduate'],
              ['💻', 'Freelance Available'],
              ['🌐', 'Remote Friendly'],
              ['⚡', 'Fast Delivery'],
            ].map(([icon, text], i) => (
              <div key={i} className="flex items-center gap-2 text-text2">
                <span>{icon}</span>
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>

          <div className="section-line" />
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">// Tech Stack</div>

          {loading ? (
            <div className="flex gap-2 flex-wrap">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 w-28 bg-surface rounded-xl animate-pulse" />
              ))}
            </div>
          ) : skills.length === 0 ? (
            <p className="text-text3 text-sm font-mono">No skills found in database.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skills.map((skill, i) => (
                <div
                  key={skill.id}
                  className={`skill-card flex items-center gap-3 bg-bg3 border border-white/5 rounded-xl p-3 shadow-md transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${300 + i * 60}ms` }}
                >
                  <span className="text-xl">{SKILL_ICONS[skill.name] || '🛠️'}</span>
                  <span className="text-sm font-medium text-textCustom">{skill.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
