// src/pages/Catalog.tsx
import { useInView } from '../hooks/useInView';
import { Link } from 'react-router-dom';

const PRODUCTS = [
  {
    id: 'eco-support',
    name: 'EcoSupport',
    tier: 'PLA',
    tag: 'Entry',
    priceInr: 799,
    material: 'Polylactic Acid (PLA)',
    desc: 'Lightweight, compostable, and perfect for daily sneaker wear. Harvested from marine algae sugars.',
    details: ['Arch support: Medium', 'Cushion level: Light', 'Lifespan: ~8 months', 'Compost: 60 days'],
    color: 'from-teal-500 to-cyan-400',
    glow: '#00bcd4',
  },
  {
    id: 'eco-domes',
    name: 'EcoDomes',
    tier: 'PHB',
    tag: 'Pro',
    priceInr: 1199,
    material: 'Polyhydroxybutyrate (PHB)',
    desc: 'Enhanced durability biopolymer for long-distance runners and trail enthusiasts who need to go further.',
    details: ['Arch support: High', 'Cushion level: Medium', 'Lifespan: ~14 months', 'Compost: 90 days'],
    color: 'from-emerald-500 to-teal-400',
    glow: '#26a69a',
  },
  {
    id: 'eco-strides',
    name: 'EcoStrides',
    tier: 'PHA',
    tag: 'Elite',
    priceInr: 2099,
    material: 'Polyhydroxyalkanoate (PHA)',
    desc: 'Peak-performance biopolymer for athletes who demand energy return, precision, and sustainability.',
    details: ['Arch support: Max', 'Cushion level: Performance', 'Lifespan: ~18 months', 'Compost: 120 days'],
    color: 'from-green-500 to-emerald-400',
    glow: '#66bb6a',
  },
];

function ProductCard({ p, index }: { p: typeof PRODUCTS[0]; index: number }) {
  const ref = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="fade-section rounded-2xl overflow-hidden flex flex-col"
      style={{
        transitionDelay: `${index * 0.1}s`,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: `0 0 40px -10px ${p.glow}33`,
      }}
    >
      {/* Gradient top */}
      <div className={`h-40 bg-gradient-to-br ${p.color} flex flex-col justify-between p-6`} style={{ opacity: 0.85 }}>
        <span
          className="self-start text-xs font-bold uppercase tracking-widest text-white px-2 py-1 rounded-full"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          {p.tag} · {p.tier}
        </span>
        <span className="text-white text-xs opacity-75">{p.material}</span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-white mb-2">{p.name}</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">{p.desc}</p>

        <ul className="space-y-1 mb-6">
          {p.details.map((d) => (
            <li key={d} className="flex items-center gap-2 text-xs text-slate-500">
              <span style={{ color: p.glow }}>✓</span>
              {d}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold" style={{ color: p.glow }}>
            ₹{p.priceInr.toLocaleString('en-IN')}
          </span>
          <Link
            to="/capture"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-all hover:scale-105"
            style={{ background: `${p.glow}22`, border: `1px solid ${p.glow}44`, color: p.glow }}
          >
            Find my fit →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Catalog() {
  const headingRef = useInView<HTMLDivElement>();

  return (
    <div style={{ background: '#030f14', color: '#e0f7fa', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Page header */}
      <div
        className="py-24 px-6 text-center"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,96,100,0.25) 0%, transparent 60%)',
        }}
      >
        <div ref={headingRef} className="fade-section">
          <p className="text-xs font-semibold tracking-widest text-cyan-400 mb-3 uppercase">The Collection</p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ fontFamily: 'Syne, Inter, sans-serif' }}
          >
            Our Insoles
          </h1>
          <p className="max-w-lg mx-auto text-slate-400 text-lg">
            Three algae-grown tiers, one perfect fit. All fully compostable.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} p={p} index={i} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="max-w-2xl mx-auto px-6 pb-20 text-center text-slate-600 text-xs">
        This is an AI-assisted estimate to guide product choice, not a 3D scan or a medical/orthotic assessment.
      </div>
    </div>
  );
}
