// src/components/Projects.jsx
import React, { useState, useEffect, useRef } from 'react';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web App' },
  { key: 'ml', label: 'ML / AI' },
  { key: 'api', label: 'API' },
];

const CATEGORY_ICONS = { ml: '🤖', api: '📡', web: '🛒' };

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/portfolio/projects/')
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => { setProjects(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category?.toLowerCase() === filter);

  return (
    <section ref={sectionRef} id="projects" className="px-[6vw] py-28 bg-bg relative overflow-hidden">
      {/* Bg decoration */}
      <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-line" />
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">// featured work</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-head text-4xl font-extrabold tracking-tight mb-2">
                Things I've{' '}
                <span className="gradient-text">Built</span>
              </h2>
              <p className="text-text2 font-light max-w-[460px]">A selection of projects across web apps, APIs, and experiments.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  className={`px-4 py-1.5 rounded-full border text-xs transition-all font-medium uppercase ${
                    filter === cat.key
                      ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                      : 'border-white/10 text-text2 hover:text-textCustom hover:border-white/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-bg3 border border-white/5 rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-surface" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-surface rounded w-3/4" />
                  <div className="h-3 bg-surface rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text3 text-sm font-mono">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className={`project-card bg-bg3 border border-white/5 rounded-xl overflow-hidden group transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Thumbnail */}
                <div className="w-full aspect-video bg-surface flex items-center justify-center text-5xl relative border-b border-white/5 overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-bg3">
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        {CATEGORY_ICONS[project.category] || '💻'}
                      </span>
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-accent/10 transition-opacity duration-300 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`} />

                  {/* Category badge */}
                  {project.category && (
                    <div className="absolute top-3 right-3 bg-bg/80 backdrop-blur-sm border border-white/10 rounded-full px-2 py-0.5 text-[10px] font-mono text-text2 uppercase">
                      {project.category}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tag_list?.map((tag, ti) => (
                      <span key={ti} className="tag font-mono text-[0.68rem] px-2 py-0.5 rounded-full bg-surface2 text-text2 border border-white/5 cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-head font-bold text-lg mb-2 text-textCustom group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text2 text-sm font-light mb-5 line-clamp-2 leading-relaxed">{project.description}</p>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-accent hover:text-textCustom font-medium transition-colors">
                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                          <path d="M7 3H3v10h10V9M9 3h4v4M13 3L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-accent hover:text-textCustom font-medium transition-colors">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {!project.live_link && !project.github_link && (
                      <span className="text-xs text-text3 font-mono">No links available</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
  }
