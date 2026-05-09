import React, { useRef, useEffect, useState } from 'react';

interface ScrollSection {
  headline: string;
  headlineAccent?: string;
  description?: string;
  cta?: { label: string; href: string };
}

const SECTIONS: ScrollSection[] = [
  {
    headline: 'We are',
    headlineAccent: 'MEOWHUG.',
    description:
      'Born from love, worn with pride. Premium cat apparel designed for the felines who deserve nothing less than extraordinary.',
    cta: { label: 'Explore Collection', href: '#collection' },
  },
  {
    headline: 'Crafted for',
    headlineAccent: 'comfort.',
    description:
      'Every stitch, every thread — engineered for cats who move with grace. Soft fabrics that feel like a second fur.',
  },
  {
    headline: 'Designed with',
    headlineAccent: 'soul.',
    description:
      "Each piece tells a story. From the streets of Saigon to your cat's wardrobe — local craftsmanship meets feline elegance.",
  },
  {
    headline: 'Wear the',
    headlineAccent: 'revolution.',
    description:
      'MEOWHUG isn\'t just a brand — it\'s a movement. Dress your cat in confidence, style, and unapologetic personality.',
    cta: { label: 'Shop Now', href: '#shop' },
  },
];

// Each section occupies 1/N of the total scroll height
const SECTION_COUNT = SECTIONS.length;

const ScrollTextOverlay: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      // Only track within the hero section (first 500vh)
      const heroHeight = window.innerHeight * 5;
      const maxScroll = heroHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      targetProgress.current = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    };

    const renderLoop = () => {
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.06;
      setScrollProgress(currentProgress.current);
      rafRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {SECTIONS.map((section, index) => {
        const sectionStart = index / SECTION_COUNT;
        const sectionEnd = (index + 1) / SECTION_COUNT;


        // Fade in during first half, fade out during second half
        const fadeInStart = sectionStart;
        const fadeInEnd = sectionStart + (sectionEnd - sectionStart) * 0.3;
        const fadeOutStart = sectionStart + (sectionEnd - sectionStart) * 0.7;
        const fadeOutEnd = sectionEnd;

        let opacity = 0;
        let translateY = 40;

        if (scrollProgress >= fadeInStart && scrollProgress <= fadeInEnd) {
          // Fading in
          const t = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
          opacity = t;
          translateY = 40 * (1 - t);
        } else if (scrollProgress > fadeInEnd && scrollProgress < fadeOutStart) {
          // Fully visible
          opacity = 1;
          translateY = 0;
        } else if (scrollProgress >= fadeOutStart && scrollProgress <= fadeOutEnd) {
          // Fading out
          const t = (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
          opacity = 1 - t;
          translateY = -40 * t;
        }

        // First section should start visible
        if (index === 0 && scrollProgress < fadeInEnd) {
          const t = Math.min(1, scrollProgress / Math.max(0.001, fadeInEnd));
          opacity = Math.max(0.6, t);
          translateY = 0;
        }

        return (
          <div
            key={index}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{
              opacity: Math.max(0, Math.min(1, opacity)),
              transform: `translateY(${translateY}px)`,
              willChange: 'opacity, transform',
              transition: 'none',
              pointerEvents: opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            {/* Headline */}
            <h2
              className="max-w-5xl font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
              style={{
                fontFamily: "'Instrument Serif', serif",
                lineHeight: 0.95,
                letterSpacing: '-2.46px',
                color: '#FFFFFF',
                textShadow: '0 2px 40px rgba(0,0,0,0.3)',
              }}
            >
              {section.headline}{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {section.headlineAccent}
              </em>
            </h2>

            {/* Description */}
            {section.description && (
              <p
                className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: "'Inter', sans-serif",
                  textShadow: '0 1px 20px rgba(0,0,0,0.2)',
                }}
              >
                {section.description}
              </p>
            )}

            {/* CTA */}
            {section.cta && (
              <a
                href={section.cta.href}
                className="inline-flex items-center justify-center rounded-full px-14 py-5 text-base mt-12 transition-transform duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif",
                  pointerEvents: 'auto',
                }}
              >
                {section.cta.label}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ScrollTextOverlay;
