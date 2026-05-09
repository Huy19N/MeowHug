import React, { useRef, useEffect, useState } from 'react';
import catCenter from '../assets/cat_center.jpg';
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
  /** Desktop position (% of stage) */
  x: number;
  y: number;
  /** Mobile position (% of stage) */
  mobileX: number;
  mobileY: number;
  /** Base diameter — will be scaled by viewport */
  baseSize: number;
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
    x: 78,
    y: 18,
    mobileX: 75,
    mobileY: 8,
    baseSize: 200,
    primary: true,
    delay: 0,
    duration: 6,
  },
  {
    id: 'jacket',
    image: productJacket,
    label: 'Pastel Jacket',
    href: '#shop-jacket',
    x: 12,
    y: 18,
    mobileX: 22,
    mobileY: 8,
    baseSize: 140,
    delay: 1.2,
    duration: 7,
  },
  {
    id: 'necklace',
    image: productNecklace,
    label: 'Paw Necklace',
    href: '#shop-necklace',
    x: 15,
    y: 72,
    mobileX: 20,
    mobileY: 78,
    baseSize: 130,
    delay: 2.4,
    duration: 5.5,
  },
  {
    id: 'sunglasses',
    image: productSunglasses,
    label: 'Round Shades',
    href: '#shop-sunglasses',
    x: 82,
    y: 75,
    mobileX: 78,
    mobileY: 82,
    baseSize: 120,
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
  { x: 30, y: 12, size: 28, delay: 0.5, duration: 5 },
  { x: 42, y: 6, size: 18, delay: 1.8, duration: 6.2 },
  { x: 62, y: 82, size: 22, delay: 3.0, duration: 5.8 },
  { x: 22, y: 45, size: 16, delay: 0.2, duration: 7.0 },
  { x: 90, y: 42, size: 20, delay: 2.2, duration: 6.0 },
  { x: 55, y: 15, size: 14, delay: 1.0, duration: 5.5 },
  { x: 38, y: 78, size: 24, delay: 3.5, duration: 6.8 },
  { x: 70, y: 50, size: 12, delay: 0.7, duration: 7.2 },
  { x: 8, y: 55, size: 18, delay: 2.8, duration: 5.2 },
  { x: 88, y: 88, size: 15, delay: 1.5, duration: 6.5 },
  { x: 48, y: 62, size: 10, delay: 4.0, duration: 5.0 },
  { x: 95, y: 22, size: 16, delay: 2.0, duration: 7.5 },
];

/* ------------------------------------------------------------------ */
/*  Hook — get responsive bubble scale & mobile flag                   */
/* ------------------------------------------------------------------ */

function useResponsive() {
  const [state, setState] = useState({ isMobile: false, scale: 1 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const isMobile = w < 768;
      // Scale bubbles based on viewport width
      // At 1440px+ → scale 1.0, at 768px → 0.7, at 375px → 0.55
      const scale = isMobile
        ? Math.max(0.5, Math.min(0.75, w / 768))
        : Math.max(0.7, Math.min(1.15, w / 1440));
      setState({ isMobile, scale });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return state;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const BubbleShopSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile, scale } = useResponsive();

  /* Intersection Observer — animate in when section enters viewport */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
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
        background:
          'linear-gradient(180deg, #dcf0ea 0%, #c8e6df 20%, #e8f5f0 50%, #e4f2ed 80%, #dcf0ea 100%)',
      }}
    >
      {/* Section heading */}
      <div
        className="relative z-20 text-center pt-20 sm:pt-24 pb-4 sm:pb-8 px-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p
          className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4"
          style={{ fontFamily: "'Inter', sans-serif", color: '#6b9e94' }}
        >
          What&apos;s on my mind?
        </p>
        <h2
          className="text-3xl sm:text-5xl md:text-6xl"
          style={{
            fontFamily: "'Instrument Serif', serif",
            color: '#1a3d35',
            lineHeight: 1.1,
          }}
        >
          Shop the <em style={{ fontStyle: 'italic', color: '#4a8a7a' }}>look</em>
        </h2>
      </div>

      {/* Bubble stage — full width, aspect-ratio-controlled */}
      <div
        className="relative w-full mx-auto"
        style={{
          maxWidth: '1600px',
          height: isMobile ? '80vh' : '75vh',
          minHeight: isMobile ? '500px' : '600px',
          padding: isMobile ? '0 16px' : '0 40px',
        }}
      >
        {/* -------- Cat in the center -------- */}
        <div
          className="absolute z-10"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.85})`,
            opacity: isVisible ? 1 : 0,
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            width: isMobile ? 'min(65vw, 280px)' : 'clamp(320px, 28vw, 480px)',
          }}
        >
          <img
            src={catCenter}
            alt="Cat wearing MEOWHUG outfit"
            className="w-full h-auto"
            style={{
              borderRadius: isMobile ? '16px' : '24px',
              filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.25))',
            }}
          />
        </div>

        {/* -------- Product Bubbles -------- */}
        {BUBBLES.map((bubble, i) => {
          const bubbleSize = Math.round(bubble.baseSize * scale);
          const posX = isMobile ? bubble.mobileX : bubble.x;
          const posY = isMobile ? bubble.mobileY : bubble.y;

          return (
            <a
              key={bubble.id}
              href={bubble.href}
              className="absolute group"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                width: `${bubbleSize}px`,
                height: `${bubbleSize}px`,
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
                    inset 0 0 ${bubbleSize / 3}px rgba(255,255,255,0.15),
                    0 8px 32px rgba(0,0,0,0.08),
                    0 0 0 1px rgba(255,255,255,0.1)
                  `,
                  cursor: 'pointer',
                  transition:
                    'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
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
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 100%)',
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
                    background:
                      'linear-gradient(315deg, rgba(180,230,220,0.4) 0%, transparent 100%)',
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
                    width: `${bubbleSize * 0.6}px`,
                    height: `${bubbleSize * 0.6}px`,
                  }}
                />
              </div>

              {/* Label underneath — visible on primary or on hover */}
              {bubble.primary && (
                <div
                  className="absolute left-1/2 flex items-center gap-1.5 whitespace-nowrap"
                  style={{
                    bottom: isMobile ? '-28px' : '-36px',
                    transform: 'translateX(-50%)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? '11px' : '13px',
                    color: '#1a3d35',
                    fontWeight: 500,
                    opacity: 0.9,
                  }}
                >
                  {/* Cart icon */}
                  <svg
                    width={isMobile ? '12' : '14'}
                    height={isMobile ? '12' : '14'}
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
          );
        })}

        {/* -------- Decorative empty bubbles -------- */}
        {DECOR_BUBBLES.map((b, i) => {
          const decorSize = Math.round(b.size * scale);
          return (
            <div
              key={`decor-${i}`}
              className="absolute pointer-events-none"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${decorSize}px`,
                height: `${decorSize}px`,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 70%)',
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
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
                  filter: 'blur(2px)',
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BubbleShopSection;
