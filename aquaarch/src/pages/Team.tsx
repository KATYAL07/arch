// src/pages/Team.tsx
import { useInView } from '../hooks/useInView';

const ACCENT = '#10B981';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`fade-section ${className}`}>
      {children}
    </div>
  );
}

import SocialFlipButton from '@/components/ui/social-flip-button';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const SOCIALS = [
  { letter: 'L', icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/arnavkatyal' },
  { letter: 'G', icon: <FaGithub />, label: 'GitHub', href: 'https://github.com/KATYAL07' },
  { letter: 'T', icon: <FaTwitter />, label: 'Twitter / X', href: 'https://twitter.com/' },
  { letter: 'E', icon: <FaEnvelope />, label: 'Email', href: 'mailto:arnav@aquaarch.co' },
];

export default function Team() {
  return (
    <div
      style={{ background: '#000000', color: '#ffffff', minHeight: '100vh', paddingTop: '80px' }}
    >
      {/* Page header */}
      <div className="py-24 px-6 text-center" style={{ borderBottom: '1px solid #1a1a1a' }}>
        <p className="text-xs font-mono tracking-widest mb-3 uppercase" style={{ color: ACCENT }}>
          The Team
        </p>
        <h1 className="text-6xl sm:text-8xl font-heading text-white" style={{ lineHeight: 1 }}>
          Behind<br /><em>AquaArch.</em>
        </h1>
      </div>

      {/* Founder's Note */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Section>
          <div className="mb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '2rem' }}>
            <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: `${ACCENT}99` }}>
              // Founder's Note
            </p>
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-heading text-xl text-black flex-shrink-0"
                style={{ background: ACCENT }}
              >
                AK
              </div>
              <div>
                <p className="font-heading text-2xl text-white">Arnav Katyal</p>
                <p className="font-mono text-xs text-white/50 uppercase tracking-widest mt-1">
                  Founder · Full-Stack Developer
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 font-mono text-sm text-white/70 leading-relaxed">
            <p>
              I didn't set out to build a footwear company. I'm a developer — I build things with code,
              not foam and biopolymers. But this problem wouldn't leave me alone.
            </p>
            <p>
              It started when I was reading about the scale of microplastic contamination in the Indian Ocean.
              I kept drilling down into the sources — synthetic textiles, packaging, tyres — and buried in one
              report was a footnote about shoe insoles. Billions of units per year. Almost none of them recycled.
              Every single one destined for a landfill, shedding microplastics for centuries.
            </p>
            <p>
              I started looking for alternatives and found almost nothing commercially available.
              The science existed — algae-derived biopolymers had been in research papers for years.
              PLA, PHB, PHA — materials that could perform comparably to petrochemical foams and
              fully biodegrade in months. But nobody had brought it to a consumer product.
            </p>
            <p>
              So I figured I'd build the prototype. Use my full-stack background to handle the product,
              the Fit Finder tool, the whole digital layer. Partner with material scientists for the
              manufacturing side. Start small, validate the concept, and see if people actually care.
            </p>
            <p>
              AquaArch is that prototype. It's not perfect yet — we're still learning. But the core
              thesis is simple: the performance gap between petroleum-based and bio-based materials
              is closing fast. And the environmental case is already won. All we have to do is build
              something people actually want to buy.
            </p>
            <p className="text-white/30 text-xs pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              — Arnav Katyal, Aug 2024
            </p>
          </div>
        </Section>

        {/* Social Links */}
        <Section className="mt-24 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-8">Connect</p>
          <div className="flex justify-center">
            <SocialFlipButton items={SOCIALS} />
          </div>
        </Section>

        {/* Divider */}
        <div className="my-24" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

        {/* Team structure */}
        <Section>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-8">Team Structure</p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {[
              { role: 'Product & Engineering', name: 'Arnav Katyal', note: 'Full-stack development, product strategy' },
              { role: 'Material Science', name: 'Research Partners', note: 'Biopolymer formulation & testing (TBC)' },
              { role: 'Sustainability Advisory', name: 'Open Position', note: 'Lifecycle assessment & certification' },
            ].map((m, i, arr) => (
              <div
                key={m.role}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-2"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              >
                <div>
                  <p className="font-heading text-white text-lg">{m.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-0.5">{m.role}</p>
                </div>
                <p className="font-mono text-xs text-white/30 sm:text-right">{m.note}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Footer */}
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
