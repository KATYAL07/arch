// src/pages/Landing.tsx
import { useInView } from '../hooks/useInView';
import { useNavigate } from 'react-router-dom';
import HeroScrollVideoReveal from '../components/ui/hero-scroll-video-pin-reveal';
import { OriginButton } from '../components/ui/origin-button';

const STATS = [
  { value: '94%', label: 'Less plastic waste' },
  { value: '60 days', label: 'Full biodegradation' },
  { value: '3 tiers', label: 'For every athlete' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Ocean Algae Harvest',
    desc: 'We sustainably harvest macroalgae, removing CO₂ and returning ocean health.',
  },
  {
    step: '02',
    title: 'Biopolymer Conversion',
    desc: 'Algae biomass is converted into PLA, PHB or PHA — 100% petroleum-free.',
  },
  {
    step: '03',
    title: 'Personalised Fit',
    desc: 'AI analyses your foot shape and recommends your perfect tier.',
  },
  {
    step: '04',
    title: 'Wear & Compost',
    desc: 'When worn out, they compost in 60 days. Zero landfill, zero guilt.',
  },
];

function Section({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`fade-section ${className}`} style={style}>
      {children}
    </div>
  );
}

function InteractiveText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={char === ' ' ? 'hover-letter space' : 'hover-letter'}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function Landing() {
  const homeTags = [
    { text: 'Ocean-Grown Algae', className: 'bg-stone-200 text-black' },
    { text: '60-Day Compostable', className: 'bg-cyan-300 text-black' },
    { text: 'Zero Microplastics', className: 'bg-teal-300 text-black' },
    { text: 'Custom Arch Support', className: 'bg-amber-100 text-black' },
  ];
  const navigate = useNavigate();

  return (
    <div style={{ background: '#000000', color: '#ffffff', fontFamily: "'JetBrains Mono', monospace" }}>

      {/* ── HERO SCROLL VIDEO REVEAL ── */}
      <HeroScrollVideoReveal
        topText={
          <div className="text-center">
            <div className="block font-heading" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)', lineHeight: 1.1 }}>
              <InteractiveText text="Step into the comfort," />
            </div>
            <div className="block font-heading mt-2" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)', lineHeight: 1.1 }}>
              <InteractiveText text="where sustainability meets comfort." />
            </div>
          </div>
        }
        headingText={
          <>
            100% Petroleum-Free.
            <br />
            Zero Landfill. Zero Guilt.
          </>
        }
        tags={homeTags}
        subText="Biodegradable shoe insoles grown from marine algae. Personalised to your foot. No plastic. No landfill."
        videoSrc="https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4"
        bottomText={
          <>
            Where every step feels
            <br />
            intentional.
          </>
        }
      />

      {/* Hero CTA strip */}
      <div className="flex justify-center items-center gap-4 py-8 -mt-20 relative z-30">
        <OriginButton
          onClick={() => navigate('/pricing')}
        >
          Shop Insoles
        </OriginButton>
        <OriginButton
          onClick={() => navigate('/capture')}
        >
          Try Fit Finder ✦
        </OriginButton>
      </div>

      {/* Stats strip */}
      <section
        className="relative z-30 py-16 px-6"
        style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-5xl font-heading text-accent">{s.value}</p>
              <p className="text-xs text-white/40 mt-2 font-mono uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section id="story" className="py-32 px-6 max-w-6xl mx-auto">
        <Section className="text-center mb-20">
          <p className="text-xs font-mono tracking-widest text-accent/70 mb-3 uppercase">Our Story</p>
          <h2 className="text-5xl sm:text-6xl font-heading mb-8" style={{ lineHeight: 1.1 }}>
            Born from the ocean.
            <br />
            <em>Back to the ocean.</em>
          </h2>
          <p className="max-w-2xl mx-auto text-white/50 text-sm leading-relaxed font-mono">
            Millions of shoe insoles end up in landfills every year. We set out to
            change that — by turning harmful algal blooms into next-generation
            biomaterials that perform like premium foam and disappear like leaves.
          </p>
        </Section>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '〇', title: 'Algae Sourced', body: 'Harvested from controlled marine farms. Removing CO₂ and excess nutrients from coastal waters.' },
            { icon: '△', title: 'Biopolymer Tech', body: 'PLA, PHB and PHA — FDA-recognised safe bioplastics derived entirely from biological sources.' },
            { icon: '□', title: 'Fully Circular', body: "Designed for home composting. When you're done, they break down in 60 days — no microplastics." },
          ].map((f) => (
            <Section
              key={f.title}
              className="p-8 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' } as React.CSSProperties}
            >
              <div className="text-3xl font-mono mb-4 text-accent">{f.icon}</div>
              <h3 className="text-xl font-heading text-white mb-3">{f.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed font-mono">{f.body}</p>
            </Section>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-32 px-6" style={{ borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-5xl mx-auto">
          <Section className="text-center mb-20">
            <p className="text-xs font-mono tracking-widest text-accent/70 mb-3 uppercase">Process</p>
            <h2 className="text-5xl sm:text-6xl font-heading">How it works</h2>
          </Section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <Section
                key={step.step}
                className="flex gap-6 p-8 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' } as React.CSSProperties}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                  style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}
                >
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-heading text-white mb-2">{step.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed font-mono">{step.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIT FINDER CTA ── */}
      <section className="py-24 px-6" style={{ borderTop: '1px solid #1a1a1a' }}>
        <Section className="max-w-3xl mx-auto text-center">
          <div
            className="p-12 rounded-3xl"
            style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <p className="text-xs font-mono tracking-widest text-accent/70 mb-4 uppercase">Fit Finder</p>
            <h2 className="text-4xl sm:text-5xl font-heading text-white mb-6">
              Find your perfect fit.
            </h2>
            <p className="text-white/50 mb-10 font-mono text-sm">
              Our AI-assisted Fit Finder analyses your foot and recommends the right tier for you.
            </p>
            <OriginButton
              onClick={() => navigate('/capture')}
            >
              Start Fit Finder →
            </OriginButton>
          </div>
        </Section>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-10 px-6 text-center font-mono text-xs text-white/30"
        style={{ borderTop: '1px solid #1a1a1a' }}
      >
        <p className="mb-1 text-white/60 font-heading text-base">AquaArch</p>
        <p>© 2024 AquaArch. Sustainable Footwear. Prototype for demonstration purposes only.</p>
      </footer>
    </div>
  );
}
