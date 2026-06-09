import React, { useState, useEffect, useRef } from 'react';

export default function Experience() {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/portfolio/experience/`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => { setExperienceData(Array.isArray(data) ? data : [data]); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isEducation = (role) => role?.toLowerCase().includes('b.sc') || role?.toLowerCase().includes('education') || role?.toLowerCase().includes('degree') || role?.toLowerCase().includes('university') || role?.toLowerCase().includes('college');

  return (
    <section ref={sectionRef} id="experience" className="px-[6vw] py-28 bg-bg2 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-cyanCustom/5 rounded-full blur-[60px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-line" />
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">// Journey</div>
          <h2 className="font-head text-4xl font-extrabold tracking-tight mb-3 text-textCustom">
            Experience &{' '}
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-text2 font-light">Where I've worked and studied.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-bg3 border border-white/5 rounded-2xl p-6 h-44 animate-pulse" />
            ))}
          </div>
        ) : experienceData.length === 0 ? (
          <p className="text-text3 text-sm font-mono">No records found.</p>
        ) : (
          <div className="relative">
            {/* Timeline line - visible on lg */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent -translate-x-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {experienceData.map((item, i) => (
                <div
                  key={item.id}
                  className={`exp-card bg-bg3 border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${150 + i * 100}ms` }}
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent to-cyanCustom rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-cyanCustom/0 group-hover:from-accent/4 group-hover:to-cyanCustom/4 transition-all duration-500 rounded-2xl" />

                  {/* Icon */}
                  <div className="absolute top-5 right-5 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
                    {isEducation(item.role) ? '🎓' : '💼'}
                  </div>

                  <div className="pl-3 relative">
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs text-accent bg-accent/10 rounded-full px-3 py-1 mb-3 font-semibold">
                      <span className="w-1 h-1 bg-accent rounded-full" />
                      {item.year_range}
                    </div>
                    <h3 className="text-xl font-bold text-textCustom mb-1 group-hover:text-white transition-colors">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 text-text2 text-sm mb-4">
                      <span className="font-mono text-accent/80">@</span>
                      <span className="font-medium text-text2">{item.company}</span>
                    </div>
                    <p className="text-text2 text-sm font-light leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
