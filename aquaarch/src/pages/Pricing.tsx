// src/pages/Pricing.tsx
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import NumberFlow from '@number-flow/react';
import confetti from 'canvas-confetti';
import ProgressIndicator from '@/components/ui/progress-indicator';
import { useNavigate } from 'react-router-dom';

const ACCENT = '#10B981';

const PLANS = [
  {
    name: 'EcoSupport',
    tier: 'PLA',
    tag: 'Entry',
    price: 799,
    yearlyPrice: 639,
    material: 'Polylactic Acid (PLA)',
    desc: 'Perfect for everyday wear, casual sneakers, and standard daily comfort.',
    features: [
      '100% biodegradable PLA biopolymer',
      'Designed for daily sneaker wear',
      'Lightweight & breathable structure',
      'Standard footbed cushioning',
      'Carbon-neutral shipping',
      'Arch support: Medium',
      'Lifespan: ~8 months',
    ],
    isPopular: false,
    buttonText: 'Start EcoSupport',
    href: '/capture',
  },
  {
    name: 'EcoDomes',
    tier: 'PHB',
    tag: 'Pro',
    price: 1199,
    yearlyPrice: 959,
    material: 'Polyhydroxybutyrate (PHB)',
    desc: 'Ideal for long-distance runners, active athletes, and frequent outdoor use.',
    features: [
      'High-durability PHB biopolymer',
      'Optimized for runners & active sports',
      'Advanced shock absorption layer',
      'Customizable arch inserts included',
      'Free biodegradable return pouch',
      'Priority shipping',
      'Arch support: High',
    ],
    isPopular: true,
    buttonText: 'Start EcoDomes',
    href: '/capture',
  },
  {
    name: 'EcoStrides',
    tier: 'PHA',
    tag: 'Elite',
    price: 2099,
    yearlyPrice: 1679,
    material: 'Polyhydroxyalkanoate (PHA)',
    desc: 'Engineered for competitive athletes who demand maximum responsiveness.',
    features: [
      'Elite-grade PHA elastomer',
      'Maximum energy return & performance',
      'Dual-density custom orthotic zone',
      'Anti-microbial algae coating',
      '1-on-1 orthotic fit consultation',
      'Free lifetime recycling program',
      'Arch support: Max',
    ],
    isPopular: false,
    buttonText: 'Start EcoStrides',
    href: '/capture',
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: [ACCENT, '#ffffff', '#000000'],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['circle'],
      });
    }
  };

  return (
    <div style={{ background: '#000000', color: '#ffffff', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Page header */}
      <div className="py-24 px-6 text-center" style={{ borderBottom: '1px solid #1a1a1a' }}>
        <p className="text-xs font-mono tracking-widest mb-3 uppercase" style={{ color: ACCENT }}>
          The Collection
        </p>
        <h1 className="text-6xl sm:text-7xl font-heading text-white mb-6" style={{ lineHeight: 1 }}>
          Three tiers.<br /><em>One planet.</em>
        </h1>
        <p className="max-w-lg mx-auto text-white/50 text-sm font-mono">
          Step into circular sustainability with fresh insoles delivered to your door.
          Swap and recycle your old insoles when they wear down.
        </p>

        {/* Toggle */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <span className="text-white/50 text-sm font-mono">Monthly</span>
          <Label>
            <Switch
              ref={switchRef as React.RefObject<HTMLButtonElement>}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-white/20"
            />
          </Label>
          <span className="text-sm font-mono text-white">
            Annual{' '}
            <span style={{ color: ACCENT }}>(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 py-20">
        {PLANS.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ y: 50, opacity: 0 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : { opacity: 1, y: 0 }
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: 'spring',
              stiffness: 100,
              damping: 30,
              delay: index * 0.1 + 0.2,
            }}
            className="flex flex-col relative rounded-2xl overflow-hidden"
            style={{
              background: plan.isPopular
                ? 'rgba(16,185,129,0.06)'
                : 'rgba(255,255,255,0.03)',
              border: plan.isPopular
                ? `1.5px solid ${ACCENT}`
                : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Popular badge */}
            {plan.isPopular && (
              <div
                className="absolute top-0 right-0 flex items-center gap-1 px-3 py-1 rounded-bl-xl"
                style={{ background: ACCENT }}
              >
                <Star className="h-3 w-3 fill-current text-black" />
                <span className="text-xs font-mono font-bold text-black">Popular</span>
              </div>
            )}

            <div className="flex-1 flex flex-col p-6">
              {/* Tier name */}
              <p className="text-xs font-mono font-bold tracking-widest uppercase mb-1" style={{ color: ACCENT }}>
                {plan.name}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-5">
                {plan.tag} · {plan.tier} · {plan.material}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-heading text-white">
                  <NumberFlow
                    value={isMonthly ? plan.price : plan.yearlyPrice}
                    format={{
                      style: 'currency',
                      currency: 'INR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{ duration: 500, easing: 'ease-out' }}
                    willChange
                  />
                </span>
                <span className="text-white/40 text-sm pb-1 font-mono">/ month</span>
              </div>
              <p className="text-xs text-white/30 mb-6 font-mono">
                {isMonthly ? 'billed monthly' : 'billed annually'}
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                    <span className="text-white/70 text-xs font-mono">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="mb-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

              {/* CTA — animated 3-step ProgressIndicator */}
              <div className="w-full flex justify-center py-2">
                <ProgressIndicator
                  stepLabels={[
                    plan.buttonText,
                    'Confirm ' + plan.name,
                    'Checkout & Subscribe',
                  ]}
                  onComplete={() => {
                    confetti({
                      particleCount: 100,
                      spread: 80,
                      origin: { y: 0.6 },
                      colors: [ACCENT, '#ffffff'],
                    });
                    navigate(plan.href);
                  }}
                />
              </div>

              <p className="mt-4 text-xs text-white/30 text-center font-mono">{plan.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <div
        className="max-w-2xl mx-auto px-6 pb-20 text-center text-white/20 text-xs font-mono"
        style={{ borderTop: '1px solid #1a1a1a' }}
      >
        <p className="py-10">
          Each subscription includes a prepaid bio-recycling mailer.
          When your new insoles arrive, send your old ones back to be composted into agricultural nutrients.
        </p>
      </div>
    </div>
  );
}
