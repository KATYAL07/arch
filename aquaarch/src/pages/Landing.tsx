// src/pages/Landing.tsx
import { useInView } from '../hooks/useInView';
import { Link } from 'react-router-dom';
import HeroScrollVideoReveal from '../components/ui/hero-scroll-video-pin-reveal';

const STATS = [
  { value: '94%', label: 'Less plastic waste' },
  { value: '60 days', label: 'Full biodegradation' },
  { value: '3 tiers', label: 'For every athlete' },
];

const PRODUCTS = [
  {
    name: 'EcoSupport',
    tier: 'PLA',
    price: '₹799',
    tag: 'Entry',
    desc: 'Daily sneaker wear. Lightweight PLA derived from algae sugars — perfect for everyday comfort.',
    color: 'from-teal-500 to-cyan-400',
    glow: '#00bcd4',
  },
  {
    name: 'EcoDomes',
    tier: 'PHB',
    price: '₹1,199',
    tag: 'Pro',
    desc: 'Enhanced durability PHB biopolymer. Designed for long-haul runners and trail enthusiasts.',
    color: 'from-emerald-500 to-teal-400',
    glow: '#26a69a',
  },
  {
    name: 'EcoStrides',
    tier: 'PHA',
    price: '₹2,099',
    tag: 'Elite',
    desc: 'Peak-performance PHA compound. Engineered for athletes who demand every edge.',
    color: 'from-green-500 to-emerald-400',
    glow: '#66bb6a',
  },
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

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`fade-section ${className}`}>
      {children}
    </div>
  );
}

export default function Landing() {
  const homeTags = [
    { text: 'Ocean-Grown Algae', background: '#00bcd4', color: '#030f14' },
    { text: '60-Day Compostable', background: '#69f0ae', color: '#030f14' },
    { text: 'Zero Microplastics', background: '#00e5ff', color: '#030f14' },
    { text: 'Custom Arch Support', background: '#b2ebf2', color: '#030f14' },
  ];

  return (
    <div style={{ background: '#030f14', color: '#e0f7fa', fontFamily: 'Inter, sans-serif' }}>

      {/* ── HERO SCROLL VIDEO REVEAL ── */}
      <HeroScrollVideoReveal
        topText={
          <>
            Step into the comfort,
            <br />
            where sustainability meets comfort.
          </>
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

      {/* Hero CTA strip overlay */}
      <div className="flex justify-center items-center gap-4 py-8 -mt-20 relative z-30">
        <Link
          to="/catalog"
          className="px-8 py-3.5 rounded-full font-semibold text-slate-900 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          style={{ background: 'linear-gradient(90deg, #00e5ff, #69f0ae)', boxShadow: '0 0 24px rgba(0,229,255,0.3)' }}
        >
          Shop Insoles
        </Link>
        <Link
          to="/capture"
          className="px-8 py-3.5 rounded-full font-semibold transition-all duration-200 hover:scale-105"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(0,229,255,0.3)',
            color: '#e0f7fa',
          }}
        >
          Try Fit Finder ✦
        </Link>
      </div>

      {/* Stats strip */}
      <section className="relative z-30 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-4xl font-bold"
                style={{ color: '#00e5ff' }}
              >
                {s.value}
              </p>
              <p className="text-sm text-slate-400 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <Section className="text-center mb-20">
          <p className="text-xs font-semibold tracking-widest text-cyan-400 mb-3 uppercase">Our Story</p>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ fontFamily: 'Syne, Inter, sans-serif' }}
          >
            Born from the ocean.
            <br />
            <span style={{ color: '#69f0ae' }}>Back to the ocean.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
            Millions of shoe insoles end up in landfills every year. We set out to
            change that — by turning harmful algal blooms into next-generation
            biomaterials that perform like premium foam and disappear like leaves.
          </p>
        </Section>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🌊', title: 'Algae Sourced', body: 'Harvested from controlled marine farms. Removing CO₂ and excess nutrients from coastal waters.' },
            { icon: '🧬', title: 'Biopolymer Tech', body: 'PLA, PHB and PHA — FDA-recognised safe bioplastics derived entirely from biological sources.' },
            { icon: '♻️', title: 'Fully Circular', body: 'Designed for home composting. When you\'re done, they break down in 60 days — no microplastics.' },
          ].map((f) => (
            <Section key={f.title} className="glass-card rounded-2xl p-8">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.body}</p>
            </Section>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="py-32 px-6" style={{ background: 'rgba(0,96,100,0.05)' }}>
        <div className="max-w-6xl mx-auto">
          <Section className="text-center mb-20">
            <p className="text-xs font-semibold tracking-widest text-cyan-400 mb-3 uppercase">The Collection</p>
            <h2
              className="text-4xl sm:text-5xl font-bold"
              style={{ fontFamily: 'Syne, Inter, sans-serif' }}
            >
              Three tiers. One planet.
            </h2>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((p) => (
              <Section key={p.name}>
                <div
                  className="rounded-2xl overflow-hidden h-full flex flex-col"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: `0 0 40px -10px ${p.glow}33`,
                  }}
                >
                  {/* Gradient header */}
                  <div
                    className={`h-32 bg-gradient-to-br ${p.color} flex items-end p-6`}
                    style={{ opacity: 0.85 }}
                  >
                    <span
                      className="text-xs font-bold uppercase tracking-widest text-white px-2 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.25)' }}
                    >
                      {p.tag} · {p.tier}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-2">{p.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-grow">{p.desc}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <span
                        className="text-3xl font-bold"
                        style={{ color: p.glow }}
                      >
                        {p.price}
                      </span>
                      <Link
                        to="/catalog"
                        className="text-sm font-semibold text-white px-4 py-2 rounded-full transition-all hover:scale-105"
                        style={{ background: `${p.glow}22`, border: `1px solid ${p.glow}44`, color: p.glow }}
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <Section className="text-center mb-20">
          <p className="text-xs font-semibold tracking-widest text-cyan-400 mb-3 uppercase">Process</p>
          <h2
            className="text-4xl sm:text-5xl font-bold"
            style={{ fontFamily: 'Syne, Inter, sans-serif' }}
          >
            How it works
          </h2>
        </Section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {HOW_IT_WORKS.map((step) => (
            <Section key={step.step} className="flex gap-6">
              <div
                className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: 'rgba(0,188,212,0.1)',
                  border: '1px solid rgba(0,188,212,0.25)',
                  color: '#00e5ff',
                }}
              >
                {step.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* ── FIT FINDER CTA ── */}
      <section className="py-24 px-6">
        <Section className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-3xl p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(0,121,107,0.3), rgba(0,96,100,0.2))',
              border: '1px solid rgba(0,229,255,0.15)',
            }}
          >
            <h2
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'Syne, Inter, sans-serif' }}
            >
              Find your perfect fit.
            </h2>
            <p className="text-slate-400 mb-8">
              Our AI-assisted Fit Finder analyses your foot and recommends the right tier for you.
            </p>
            <Link
              to="/capture"
              className="inline-block px-10 py-4 rounded-full font-bold text-slate-900 transition-all duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(90deg, #00e5ff, #69f0ae)',
                boxShadow: '0 0 40px rgba(0,229,255,0.3)',
              }}
            >
              Start Fit Finder →
            </Link>
          </div>
        </Section>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-12 px-6 text-center text-slate-600 text-sm"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <p className="mb-1">
          <span
            className="font-bold"
            style={{
              background: 'linear-gradient(90deg, #00e5ff, #69f0ae)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AquaArch
          </span>{' '}
          — Sustainable Footwear
        </p>
        <p>© 2024 AquaArch. A prototype for demonstration purposes only.</p>
      </footer>
    </div>
  );
}
