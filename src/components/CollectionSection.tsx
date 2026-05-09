import React, { useRef, useEffect, useState } from 'react';
import catClothe1 from '../assets/cat_clothe.jpg';
import catClothe2 from '../assets/cat_clothe_2.jpg';
import catClothe3 from '../assets/cat_clothe_3.jpg';
import catClothe4 from '../assets/cat_clothe_4.jpg';
import catClothe5 from '../assets/cat_clothe_5.jpg';

/* ------------------------------------------------------------------ */
/*  Product data                                                       */
/* ------------------------------------------------------------------ */

interface Product {
  id: number;
  image: string;
  title: string;
  brand: string;
  price: string;
  description: string;
  detail: string; // Sizes or Colors
  detailLabel: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    image: catClothe1,
    title: 'Hoodie Bạc Hà Mềm Mại',
    brand: 'Purrfect Thread',
    price: '299.000đ',
    description: 'Ấm áp và phong cách.',
    detail: 'S, M, L',
    detailLabel: 'Kích cỡ',
  },
  {
    id: 2,
    image: catClothe2,
    title: 'Hoodie Bạc Hà Cổ Điển',
    brand: 'Meow Couture',
    price: '345.000đ',
    description: 'Tươi mới và năng động.',
    detail: 'M, L',
    detailLabel: 'Kích cỡ',
  },
  {
    id: 3,
    image: catClothe3,
    title: 'Giường Sofa Ấm Áp',
    brand: 'Dreamy Pets',
    price: '890.000đ',
    description: 'Thoải mái tối đa.',
    detail: 'Xám, Xanh',
    detailLabel: 'Màu sắc',
  },
  {
    id: 4,
    image: catClothe4,
    title: 'Áo Sơ Mi Dạo Phố',
    brand: 'Wild Whiskers',
    price: '250.000đ',
    description: 'Sẵn sàng vui chơi.',
    detail: 'S, M',
    detailLabel: 'Kích cỡ',
  },
  {
    id: 5,
    image: catClothe5,
    title: 'Vòng Cổ Nhung Thanh Lịch',
    brand: 'Luxury Paws',
    price: '199.000đ',
    description: 'Sang trọng và an toàn.',
    detail: 'Đỏ, Đen',
    detailLabel: 'Màu sắc',
  },
];

/* ------------------------------------------------------------------ */
/*  Product Card Component                                             */
/* ------------------------------------------------------------------ */

const ProductCard: React.FC<{
  product: Product;
  index: number;
  isVisible: boolean;
}> = ({ product }) => {
  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        aspectRatio: '3 / 4',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15)',
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Subtle bottom shadow for depth, common in poster designs */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-50"
        style={{
          background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.6) 100%)'
        }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Collection Section                                                 */
/* ------------------------------------------------------------------ */

const CollectionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // The scrollable distance is the total height of this section minus one viewport height
      // (since the sticky element takes up exactly one viewport height)
      const scrollableDistance = height - windowHeight;
      const scrolled = -top;

      let progress = 0;
      if (scrolled > 0 && scrollableDistance > 0) {
        progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      }
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative w-full"
      style={{
        // 300vh gives us plenty of scroll distance to read through the 5 cards smoothly
        height: '300vh',
        background: 'linear-gradient(180deg, #dcf0ea 0%, #e8f5f0 100%)',
      }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">
        {/* ---- Decorative background shapes ---- */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '5%',
            left: '-5%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(230,195,175,0.25) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: `translate(${scrollProgress * 100}px, ${scrollProgress * 50}px)`,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: '10%',
            right: '-8%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240,210,200,0.2) 0%, transparent 70%)',
            filter: 'blur(70px)',
            transform: `translate(${-scrollProgress * 150}px, ${-scrollProgress * 80}px)`,
          }}
        />
        {/* Subtle wavy line decoration */}
        <svg
          className="absolute pointer-events-none"
          style={{ top: '15%', left: '0', width: '100%', height: '120px', opacity: 0.06 }}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60"
            fill="none"
            stroke="#c9956a"
            strokeWidth="2"
          />
        </svg>

        {/* ---- Section heading ---- */}
        <div
          className="relative z-10 w-full flex flex-col items-center text-center px-6 mb-8 sm:mb-12"
          style={{
            // Fade in initially, stay visible, then fade out slightly at the very end
            opacity: scrollProgress < 0.05 ? scrollProgress * 20 : (scrollProgress > 0.95 ? (1 - scrollProgress) * 20 : 1),
            transform: `translateY(${scrollProgress < 0.05 ? 30 - scrollProgress * 600 : 0}px)`,
            transition: 'opacity 0.1s, transform 0.1s',
          }}
        >
          <p
            className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 text-center"
            style={{ fontFamily: "'Inter', sans-serif", color: '#6b9e94' }}
          >
            NEW COLLECTION
          </p>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl text-center"
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#1e3b33',
              lineHeight: 1.1,
            }}
          >
            Trending <em style={{ fontStyle: 'italic', color: '#174737' }}>right now</em>
          </h2>
          <p
            className="text-sm sm:text-base mt-4 max-w-lg mx-auto text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#4a665b',
              lineHeight: 1.6,
            }}
          >
            This week's most popular outfits for stylish cats.
          </p>
        </div>

        {/* ---- Product Horizontal Scroll Track ---- */}
        <div className="relative z-10 w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-4 sm:gap-6 md:gap-8 px-8 sm:px-16"
            style={{
              width: 'max-content',
              // Translate horizontally. We want to move from 0 to negative (totalWidth - viewportWidth)
              // To ensure it fully clears the screen on mobile/desktop, we use a calculated max translation.
              // A simple robust approach without window resize listeners: use `calc()` in CSS.
              // However, since we know we have 5 cards, we can roughly move by a large percentage of the container width.
              // To be exact, let's use a wide translation that guarantees all cards are seen.
              // For 5 cards, translating by -65% of the container's own width usually shows the last card.
              transform: `translateX(calc(-${scrollProgress * 100}% + ${scrollProgress * 100}vw))`,
              willChange: 'transform',
            }}
          >
            {PRODUCTS.map((product, i) => (
              <div
                key={product.id}
                style={{
                  width: 'clamp(260px, 25vw, 380px)',
                  flexShrink: 0,
                  // Add a slight parallax/stagger to the cards based on scroll
                  transform: `translateY(${Math.sin(scrollProgress * Math.PI * 2 + i) * 15}px)`,
                }}
              >
                <ProductCard
                  product={product}
                  index={i}
                  isVisible={true}
                />
              </div>
            ))}

            {/* Empty padding element at the end so the last card doesn't stick to the edge */}
            <div style={{ width: 'clamp(40px, 10vw, 120px)', flexShrink: 0 }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
