import React from 'react';
import { MapPin } from 'lucide-react';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="w-full h-[500px] bg-[#eaf4ec] text-[#2c4031] flex flex-col justify-between py-12 px-6 md:px-16 relative z-0">
      <div className="flex flex-col md:flex-row justify-around items-start md:items-center gap-10">
        {/* Brand Logo and Description */}
        <div className="max-w-md">
          <a
            href="#"
            className="font-display text-5xl tracking-tight block mb-4"
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: '#1a2e20',
            }}
          >
            MeowHug<sup className="text-xl align-super">®</sup>
          </a>
          <p className="font-body text-sm leading-relaxed text-[#4a6350] mb-6">
            Discover elegant minimalist style, where sophistication meets comfort.
            All our designs aim to provide a perfect experience and the purest rustic beauty.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-[#3b5241]">
            <MapPin size={18} />
            <span>Viet Nam</span>
          </div>
        </div>

        {/* Links and Info */}
        <div className="grid grid-cols-2 gap-12 font-body text-sm">
          <div>
            <h4 className="font-semibold text-[#1a2e20] mb-4 uppercase tracking-wider text-xs">Website Info</h4>
            <ul className="space-y-3 text-[#4a6350]">
              <li>Design aesthetic: Minimalist, elegant</li>
              <li>Style: Pastel White/Green</li>
              <li>Designed & Developed by: Huy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#1a2e20] mb-4 uppercase tracking-wider text-xs">Follow me</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/_jahwi/" target="_blank" className="p-2 bg-white/60 rounded-full hover:bg-white transition-colors duration-200 shadow-sm text-[#3b5241]">
                <InstagramIcon size={20} />
              </a>
              <a href="https://www.facebook.com/huy.nguyen.638274" target="_blank" className="p-2 bg-white/60 rounded-full hover:bg-white transition-colors duration-200 shadow-sm text-[#3b5241]">
                <FacebookIcon size={20} />
              </a>
              <a href="https://github.com/Huy19N" target="_blank" className="p-2 bg-white/60 rounded-full hover:bg-white transition-colors duration-200 shadow-sm text-[#3b5241]">
                <GithubIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-[#c6dfcd] flex flex-col md:flex-row justify-between items-center text-xs text-[#5c7a64] font-body">
        <p>© {new Date().getFullYear()} MeowHug. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Illustration image resources are copyrighted by Pinterest.</p>
      </div>
    </footer>
  );
};

export default Footer;
