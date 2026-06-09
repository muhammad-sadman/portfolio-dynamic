// src/components/Contact.jsx
import React, { useState, useRef, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [focused, setFocused] = useState('');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('SENDING');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/portfolio/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('ERROR');
      }
    } catch {
      setStatus('ERROR');
    }
  };

  const inputClass = (field) => `w-full bg-surface border rounded-xl p-3 text-sm outline-none text-textCustom placeholder-text3 transition-all duration-200 ${
    focused === field ? 'border-accent/60 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]' : 'border-white/5 hover:border-white/10'
  }`;

  const socialLinks = [
    { icon: '📧', label: 'Email', value: 'your@email.com', href: 'mailto:your@email.com' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/yourname', href: '#' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/yourname', href: '#' },
    { icon: '🐦', label: 'Twitter', value: '@yourhandle', href: '#' },
  ];

  return (
    <section ref={sectionRef} id="contact" className="px-[6vw] py-28 bg-bg2 relative overflow-hidden">
      {/* Bg decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-line inline-block" />
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">// get in touch</div>
          <h2 className="font-head text-4xl font-extrabold mb-3">
            Let's Work{' '}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-text2 font-light max-w-[400px] mx-auto">
            Have a project in mind? Let's talk and create something amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Contact info */}
          <div className={`lg:col-span-2 space-y-4 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="font-head font-bold text-xl text-textCustom mb-6">Contact Info</h3>
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={`flex items-center gap-4 p-4 bg-bg3 border border-white/5 rounded-xl hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 group transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${250 + i * 80}ms` }}
              >
                <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                  {link.icon}
                </div>
                <div>
                  <div className="text-xs font-mono text-text3 uppercase tracking-wide">{link.label}</div>
                  <div className="text-sm text-text2 group-hover:text-textCustom transition-colors">{link.value}</div>
                </div>
              </a>
            ))}

            {/* Availability card */}
            <div className={`p-4 bg-greenCustom/5 border border-greenCustom/15 rounded-xl mt-6 transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="ping-custom absolute inline-flex h-full w-full rounded-full bg-greenCustom opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-greenCustom" />
                </span>
                <span className="text-xs font-mono text-greenCustom font-semibold">Available for work</span>
              </div>
              <p className="text-xs text-text2">Currently accepting freelance projects & full-time opportunities.</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <form onSubmit={handleSubmit} className="bg-bg3 border border-white/5 rounded-2xl p-8 shadow-2xl space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-text2 font-mono">Name *</label>
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    className={inputClass('name')}
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-text2 font-mono">Email *</label>
                  <input
                    type="email" required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    className={inputClass('email')}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-text2 font-mono">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused('')}
                  className={inputClass('subject')}
                  placeholder="What's it about?"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-text2 font-mono">Message *</label>
                <textarea
                  rows="5" required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  className={`${inputClass('message')} resize-none`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'SENDING'}
                className="w-full bg-accent hover:bg-accent2 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-full text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 flex items-center justify-center gap-2"
              >
                {status === 'SENDING' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>Send Message →</>
                )}
              </button>

              {status === 'SUCCESS' && (
                <div className="flex items-center gap-2 text-greenCustom text-sm text-center justify-center font-mono bg-greenCustom/10 rounded-xl py-3">
                  ✅ Message sent successfully!
                </div>
              )}
              {status === 'ERROR' && (
                <div className="flex items-center gap-2 text-red-400 text-sm text-center justify-center font-mono bg-red-500/10 rounded-xl py-3">
                  ❌ Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
