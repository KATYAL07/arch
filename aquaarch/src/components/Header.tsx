// src/components/Header.tsx
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { OriginButton } from './ui/origin-button';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-accent font-mono text-xs uppercase tracking-widest transition-colors duration-150'
      : 'text-white/70 hover:text-white transition-colors duration-150 font-mono text-xs uppercase tracking-widest';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background"
      style={{ borderBottom: '1px solid #1a1a1a' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="text-xl font-heading text-white">AquaArch</span>
          <span className="text-[10px] text-accent font-mono hidden sm:block mt-0.5 uppercase tracking-widest">
            by algae
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/pricing" className={navClass}>Pricing</NavLink>
          <a
            href="/#story"
            className="text-white/70 hover:text-white transition-colors duration-150 font-mono text-xs uppercase tracking-widest"
          >
            About Us
          </a>
          <NavLink to="/team" className={navClass}>The Team</NavLink>
          <OriginButton onClick={() => navigate('/capture')}>
            Try Fit Finder →
          </OriginButton>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors duration-150"
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

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-5 bg-background"
          style={{ borderTop: '1px solid #1a1a1a' }}
        >
          <NavLink to="/" end className={navClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/pricing" className={navClass} onClick={() => setMenuOpen(false)}>Pricing</NavLink>
          <a
            href="/#story"
            className="text-white/70 hover:text-white transition-colors duration-150 font-mono text-xs uppercase tracking-widest"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </a>
          <NavLink to="/team" className={navClass} onClick={() => setMenuOpen(false)}>The Team</NavLink>
          <OriginButton 
            className="w-full"
            onClick={() => {
              setMenuOpen(false);
              navigate('/capture');
            }}
          >
            Try Fit Finder →
          </OriginButton>
        </div>
      )}
    </header>
  );
}
