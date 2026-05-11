import React, { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VideoBackground from './components/VideoBackground';
import ScrollTextOverlay from './components/ScrollTextOverlay';
import BubbleShopSection from './components/BubbleShopSection';
import CollectionSection from './components/CollectionSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateFooterHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    // Initial update
    setTimeout(updateFooterHeight, 100);
    window.addEventListener('resize', updateFooterHeight);
    return () => window.removeEventListener('resize', updateFooterHeight);
  }, []);

  return (
    <div className="relative w-full bg-black">
      <main
        className="relative z-10 bg-transparent transition-all duration-300"
        style={{ marginBottom: `${footerHeight}px` }}
      >
        {/* ===== HERO: Scroll-driven video experience ===== */}
        <div style={{ height: '500vh' }}>
          {/* Video Background Layer — canvas-based frame sequence (z-0) */}
          <VideoBackground />

          {/* Scroll-driven text sections (z-10) */}
          <ScrollTextOverlay />

          {/* Navigation Bar (z-50) */}
          <Navbar />
        </div>

        {/* These sections have their own opaque backgrounds to cover the video and the footer */}
        <div className="relative z-20">
          {/* ===== SECTION 2: Bubble Shop ===== */}
          <BubbleShopSection />

          {/* ===== SECTION 3: Product Collection ===== */}
          <CollectionSection />
        </div>
      </main>

      {/* ===== FOOTER: Sticky Reveal underneath ===== */}
      <div
        ref={footerRef as any}
        className="fixed bottom-0 left-0 w-full z-0"
      >
        <Footer />
      </div>
    </div>
  );
};

export default App;

