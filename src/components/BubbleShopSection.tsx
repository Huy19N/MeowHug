import React, { useRef, useEffect, useState } from 'react';
import catCenter from '../assets/cat_center.png';
import productHoodie from '../assets/product_hoodie.png';
import productNecklace from '../assets/product_necklace.png';
import productJacket from '../assets/product_jacket.png';
import productSunglasses from '../assets/product_sunglasses.png';

/* ------------------------------------------------------------------ */
/*  Bubble data                                                        */
/* ------------------------------------------------------------------ */

interface BubbleData {
  id: string;
  image: string;
  label: string;
  href: string;
  /** Relative position (% of container) */
  x: number;
  y: number;
  /** Diameter in px */
  size: number;
  /** Is the primary / largest bubble? */
  primary?: boolean;
  /** Float animation delay */
  delay: number;
  /** Float animation duration */
  duration: number;
}

const BUBBLES: BubbleData[] = [
  {
    id: 'outfit',
    image: productHoodie,
    label: 'Shop this Outfit',
    href: '#shop-hoodie',
    x: 72,
    y: 8,
    size: 220,
    primary: true,
    delay: 0,
    duration: 6,
  },
  {
    id: 'jacket',
    image: productJacket,
    label: 'Pastel Jacket',
    href: '#shop-jacket',
    x: 5,
    y: 10,
    size: 140,
    delay: 1.2,
    duration: 7,
  },
  {
    id: 'necklace',
    image: productNecklace,
    label: 'Paw Necklace',
    href: '#shop-necklace',
    x: 8,
    y: 58,
    size: 130,
    delay: 2.4,
    duration: 5.5,
  },
  {
    id: 'sunglasses',
    image: productSunglasses,
    label: 'Round Shades',
    href: '#shop-sunglasses',
    x: 78,
    y: 62,
    size: 120,
    delay: 0.8,
    duration: 6.5,
  },
];

/* Small decorative (empty) bubbles scattered around */
interface DecorBubble {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const DECOR_BUBBLES: DecorBubble[] = [
  { x: 25, y: 15, size: 28, delay: 0.5, duration: 5 },
  { x: 35, y: 8, size: 18, delay: 1.8, duration: 6.2 },
  { x: 60, y: 75, size: 22, delay: 3.0, duration: 5.8 },
  { x: 18, y: 40, size: 16, delay: 0.2, duration: 7.0 },
  { x: 88, y: 35, size: 20, delay: 2.2, duration: 6.0 },
  { x: 55, y: 22, size: 14, delay: 1.0, duration: 5.5 },
  { x: 42, y: 68, size: 24, delay: 3.5, duration: 6.8 },
  { x: 68, y: 48, size: 12, delay: 0.7, duration: 7.2 },
  { x: 15, y: 75, size: 18, delay: 2.8, duration: 5.2 },
  { x: 82, y: 82, size: 15, delay: 1.5, duration: 6.5 },
  { x: 30, y: 50, size: 10, delay: 4.0, duration: 5.0 },
  { x: 92, y: 18, size: 16, delay: 2.0, duration: 7.5 },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const BubbleShopSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  /* Intersection Observer — animate in when section enters viewport */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bubble-shop"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #000000 0%, #0a1a18 10%, #c8e6df 35%, #e8f5f0 50%, #c8e6df 65%, #0a1a18 90%, #000000 100%)',
      }}
    >
      {/* Section heading */}
      <div
        className="relative z-20 text-center pt-24 pb-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p
          className="text-sm tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "'Inter', sans-serif", color: '#6b9e94' }}
        >
          What&apos;s on my mind?
        </p>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl"
          style={{
            fontFamily: "'Instrument Serif', serif",
            color: '#1a3d35',
            lineHeight: 1.1,
          }}
        >
          Shop the <em style={{ fontStyle: 'italic', color: '#4a8a7a' }}>look</em>
        </h2>
      </div>

      {/* Bubble stage — relative container for positioning */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: '1200px',
          height: '70vh',
          minHeight: '500px',
        }}
      >
        {/* -------- Cat in the center -------- */}
        <div
          className="absolute z-10"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.8})`,
            opacity: isVisible ? 1 : 0,
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            width: 'clamp(220px, 30vw, 360px)',
          }}
        >
          <img
            src={catCenter}
            alt="Cat wearing MEOWHUG outfit"
            className="w-full h-auto drop-shadow-2xl"
            style={{
              borderRadius: '20px',
              filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.25))',
            }}
          />
        </div>

        {/* -------- Product Bubbles -------- */}
        {BUBBLES.map((bubble, i) => (
          <a
            key={bubble.id}
            href={bubble.href}
            className="absolute group"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0})`,
              opacity: isVisible ? 1 : 0,
              transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.15}s`,
              animation: isVisible
                ? `bubbleFloat ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`
                : 'none',
              zIndex: bubble.primary ? 15 : 12,
            }}
          >
            {/* Bubble shell */}
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: bubble.primary
                  ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), rgba(255,255,255,0.15) 60%, rgba(200,230,223,0.2))'
                  : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(255,255,255,0.1) 60%, rgba(200,230,223,0.15))',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255,255,255,0.4)',
                boxShadow: `
                  inset 0 0 ${bubble.size / 3}px rgba(255,255,255,0.15),
                  0 8px 32px rgba(0,0,0,0.08),
                  0 0 0 1px rgba(255,255,255,0.1)
                `,
                cursor: 'pointer',
                transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
              }}
            >
              {/* Iridescent highlight */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: '12%',
                  left: '18%',
                  width: '35%',
                  height: '25%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 100%)',
                  borderRadius: '50%',
                  filter: 'blur(4px)',
                }}
              />

              {/* Second iridescent arc */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  bottom: '15%',
                  right: '15%',
                  width: '25%',
                  height: '18%',
                  background: 'linear-gradient(315deg, rgba(180,230,220,0.4) 0%, transparent 100%)',
                  borderRadius: '50%',
                  filter: 'blur(3px)',
                }}
              />

              {/* Product image */}
              <img
                src={bubble.image}
                alt={bubble.label}
                className="rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                style={{
                  width: `${bubble.size * 0.6}px`,
                  height: `${bubble.size * 0.6}px`,
                }}
              />
            </div>

            {/* Label underneath — visible on primary or on hover */}
            {bubble.primary && (
              <div
                className="absolute left-1/2 flex items-center gap-1.5 whitespace-nowrap"
                style={{
                  bottom: '-32px',
                  transform: 'translateX(-50%)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  color: '#1a3d35',
                  fontWeight: 500,
                  opacity: 0.9,
                }}
              >
                {/* Cart icon */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Shop this look
              </div>
            )}

            {/* Hover tooltip for non-primary */}
            {!bubble.primary && (
              <div
                className="absolute left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
                style={{
                  bottom: '-28px',
                  transform: 'translateX(-50%)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: '#1a3d35',
                  fontWeight: 500,
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.5)',
                }}
              >
                {bubble.label}
              </div>
            )}
          </a>
        ))}

        {/* -------- Decorative empty bubbles -------- */}
        {DECOR_BUBBLES.map((b, i) => (
          <div
            key={`decor-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 70%)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: 'inset 0 0 8px rgba(255,255,255,0.1)',
              opacity: isVisible ? 0.7 : 0,
              transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0})`,
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.8 + i * 0.08}s`,
              animation: isVisible
                ? `bubbleFloat ${b.duration}s ease-in-out ${b.delay}s infinite`
                : 'none',
              zIndex: 5,
            }}
          >
            {/* Tiny highlight */}
            <div
              className="absolute rounded-full"
              style={{
                top: '15%',
                left: '20%',
                width: '30%',
                height: '20%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
                filter: 'blur(2px)',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BubbleShopSection;
