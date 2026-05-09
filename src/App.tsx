import React from 'react';
import Navbar from './components/Navbar';
import VideoBackground from './components/VideoBackground';
import ScrollTextOverlay from './components/ScrollTextOverlay';
import BubbleShopSection from './components/BubbleShopSection';
import CollectionSection from './components/CollectionSection';

const App: React.FC = () => {
  return (
    <div className="relative w-full" style={{ backgroundColor: '#000000' }}>
      {/* ===== HERO: Scroll-driven video experience ===== */}
      <div style={{ height: '500vh' }}>
        {/* Video Background Layer — canvas-based frame sequence (z-0) */}
        <VideoBackground />

        {/* Scroll-driven text sections (z-10) */}
        <ScrollTextOverlay />

        {/* Navigation Bar (z-50) */}
        <Navbar />
      </div>

      {/* ===== SECTION 2: Bubble Shop ===== */}
      <BubbleShopSection />

      {/* ===== SECTION 3: Product Collection ===== */}
      <CollectionSection />
    </div>
  );
};

export default App;

