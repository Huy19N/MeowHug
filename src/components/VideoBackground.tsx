import React, { useRef, useEffect, useState } from 'react';
import catVideo from '../assets/cat_video_2.mp4';

const TOTAL_FRAMES = 120; // We'll extract this many frames from the video

const VideoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Extract frames from video using offscreen video element
    const extractFrames = async () => {
      const video = document.createElement('video');
      video.src = catVideo;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        video.onloadeddata = () => resolve();
        video.onerror = () => reject(new Error('Video load failed'));
      });

      const duration = video.duration;
      const frames: HTMLImageElement[] = [];
      const offscreen = document.createElement('canvas');
      offscreen.width = video.videoWidth;
      offscreen.height = video.videoHeight;
      const offCtx = offscreen.getContext('2d')!;

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const time = (i / (TOTAL_FRAMES - 1)) * (duration - 0.05);
        video.currentTime = time;

        await new Promise<void>((resolve) => {
          video.onseeked = () => {
            offCtx.drawImage(video, 0, 0, offscreen.width, offscreen.height);
            const img = new Image();
            img.src = offscreen.toDataURL('image/webp', 0.85);
            img.onload = () => {
              frames[i] = img;
              setLoadingProgress(Math.round(((i + 1) / TOTAL_FRAMES) * 100));
              resolve();
            };
          };
        });
      }

      framesRef.current = frames;
      setIsReady(true);

      // Paint first frame
      drawFrame(ctx, canvas, frames[0]);
    };

    extractFrames();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Scroll handling + render loop
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateScroll = () => {
      // Only scrub within the hero section (first 500vh)
      const heroHeight = window.innerHeight * 5; // 500vh
      const maxScroll = heroHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      targetFrameRef.current = Math.round(progress * (TOTAL_FRAMES - 1));
    };

    const renderLoop = () => {
      // Lerp toward target for buttery smooth scrubbing
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.08;

      const frameIndex = Math.round(currentFrameRef.current);
      const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));

      if (framesRef.current[clampedIndex]) {
        drawFrame(ctx, canvas, framesRef.current[clampedIndex]);
      }

      rafRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', updateScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isReady]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Loading overlay */}
      {!isReady && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white">
          <div
            className="text-sm tracking-widest uppercase"
            style={{ fontFamily: "'Inter', sans-serif", color: '#6F6F6F' }}
          >
            Loading Experience · {loadingProgress}%
          </div>
          <div className="mt-4 w-48 h-[2px] bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};

function drawFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement
) {
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;

  // Object-fit: cover
  const scale = Math.max(cw / iw, ch / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = (cw - sw) / 2;
  const sy = (ch - sh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh);
}

export default VideoBackground;
