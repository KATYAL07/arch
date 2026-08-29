import { ProgressIndicatorDemo } from '@/components/ui/demo';

export default function ProgressDemoPage() {
  return (
    <div
      className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center px-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(0,121,107,0.2) 0%, rgba(0,96,100,0.1) 40%, transparent 70%), #030f14',
      }}
    >
      <div className="text-center max-w-xl mb-12">
        <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-2">
          Component Showcase
        </p>
        <h1
          className="text-4xl font-bold text-white mb-4"
          style={{ fontFamily: 'Syne, Inter, sans-serif' }}
        >
          Progress Indicator Component
        </h1>
        <p className="text-slate-400 text-sm">
          Interactive multi-step progress indicator with smooth spring animations powered by Framer Motion & Lucide icons.
        </p>
      </div>

      <div
        className="p-12 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-center"
        style={{ background: 'rgba(255, 255, 255, 0.03)' }}
      >
        <ProgressIndicatorDemo />
      </div>
    </div>
  );
}
