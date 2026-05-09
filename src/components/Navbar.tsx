import React, { useState, useEffect } from 'react';

const navItems = [
  { label: 'Home', href: '#', active: true },
  { label: 'Collection', href: '#collection', active: false },
  { label: 'About', href: '#about', active: false },
  { label: 'Lookbook', href: '#lookbook', active: false },
  { label: 'Contact', href: '#contact', active: false },
];

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down and past the top margin
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-6 w-full">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-4xl tracking-tight"
          style={{
            color: '#FFFFFF',
            fontFamily: "'Instrument Serif', serif",
            textShadow: '0 1px 10px rgba(0,0,0,0.3)',
          }}
        >
          MeowHug<sup className="text-base align-super">®</sup>
        </a>

        {/* Menu Items */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm transition-colors duration-200 hover:text-white font-body"
                style={{
                  color: item.active ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                  fontFamily: "'Inter', sans-serif",
                  textShadow: '0 1px 6px rgba(0,0,0,0.2)',
                  letterSpacing: '0.02em',
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#shop"
          className="hidden md:inline-flex items-center rounded-full px-8 py-3 text-sm transition-all duration-200 hover:scale-105 font-body"
          style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '3px 4px',
            color: '#FFFFFF',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Shop Now
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
