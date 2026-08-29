// src/components/Header.tsx
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-cyan-300 font-semibold border-b border-cyan-300 pb-0.5'
      : 'text-slate-300 hover:text-cyan-200 transition-colors duration-200';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(5, 25, 35, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 188, 212, 0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span
            className="text-2xl font-bold tracking-tight"
            style={{
              background: 'linear-gradient(90deg, #00e5ff, #69f0ae)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AquaArch
          </span>
          <span className="text-xs text-slate-400 font-light hidden sm:block mt-0.5">
            by algae
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/catalog" className={navClass}>Catalog</NavLink>
          <NavLink to="/pricing-demo" className={navClass}>Pricing</NavLink>
          <NavLink to="/progress-demo" className={navClass}>Progress Button</NavLink>
          <NavLink
            to="/capture"
            className="px-4 py-1.5 rounded-full text-sm font-semibold text-slate-900 transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(90deg, #00e5ff, #69f0ae)' }}
          >
            Try Fit Finder →
          </NavLink>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm font-medium"
          style={{ background: 'rgba(5, 25, 35, 0.95)' }}
        >
          <NavLink to="/" end className={navClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/catalog" className={navClass} onClick={() => setMenuOpen(false)}>Catalog</NavLink>
          <NavLink to="/pricing-demo" className={navClass} onClick={() => setMenuOpen(false)}>Pricing</NavLink>
          <NavLink to="/capture" className="text-cyan-300 font-semibold" onClick={() => setMenuOpen(false)}>Fit Finder →</NavLink>
        </div>
      )}
    </header>
  );
}
