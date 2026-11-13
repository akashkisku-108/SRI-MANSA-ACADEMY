import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * HeroBackground - Dynamic Animated Educational Background Component
 * 
 * Features:
 * - Deep dark navy-to-purple gradient base with neon violet, magenta & cyan-blue glows
 * - Light mode: soft ivory/white-to-lavender gradient with pastel orbs and gentle glass cards
 * - Large glowing orbs & planets drifting slowly (20-40s loops) with soft pulsation
 * - Floating glassmorphism cards arranged in a slightly tilted isometric composition
 *   showing clean educational content:
 *   1. "Rank 1" Badge Card (AIR 1 NEET / JEE)
 *   2. "Score: 98/100" Card with circular progress / grade
 *   3. Mini Progress Bar Chart Card (99.4% percentile growth)
 *   4. "Live Class" Card with pulsing live indicator & faculty tag
 *   5. Mini Graduation Cap / Book Achievement Card
 * - Glossy abstract 3D-looking liquid ribbon / orb focal point with specular highlights
 * - Starfield dots with twinkling animation
 * - Subtle faint circuit / math grid lines
 * - Floating inline SVG educational icons: graduation cap, open book, pencil, atom,
 *   DNA helix, math symbols (pi, sigma, integral, x²), lightbulb, trophy at gentle low opacity
 * - Interactive subtle parallax (desktop mouse move / mobile gyro/scroll)
 * - IntersectionObserver to pause animations when hero is off-screen
 * - VisibilityState listener to pause animations when tab is hidden
 * - Prefers-reduced-motion: clean, elegant static layout without GPU animation overhead
 * - z-index behind hero content and pointer-events-none so all buttons/links remain clickable
 */
export function HeroBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Parallax offsets (smooth normalized -1 to +1)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e) => setReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  // IntersectionObserver to pause when hero is off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause when document / tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        // Re-check intersection if container exists
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const inView = rect.bottom > 0 && rect.top < window.innerHeight;
          setIsVisible(inView);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Mouse parallax interpolation on desktop
  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    const handleMouseMove = (e) => {
      // Normalize to -1 ... 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseTargetRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let currentX = 0;
    let currentY = 0;

    const tick = () => {
      // Smooth lerp
      currentX += (mouseTargetRef.current.x - currentX) * 0.05;
      currentY += (mouseTargetRef.current.y - currentY) * 0.05;
      setMouseOffset({ x: currentX, y: currentY });
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [reducedMotion, isVisible]);

  // Static starfield dots generator (deterministic)
  const stars = useMemo(() => {
    const starList = [
      { top: '12%', left: '8%', size: 2.5, delay: '0s', dur: '3.5s', op: 0.8 },
      { top: '22%', left: '28%', size: 1.5, delay: '1.2s', dur: '4s', op: 0.6 },
      { top: '8%', left: '48%', size: 3, delay: '2.4s', dur: '5s', op: 0.9 },
      { top: '18%', left: '62%', size: 2, delay: '0.5s', dur: '3.8s', op: 0.7 },
      { top: '35%', left: '85%', size: 2.5, delay: '1.8s', dur: '4.2s', op: 0.85 },
      { top: '65%', left: '78%', size: 3, delay: '2.1s', dur: '4.8s', op: 0.75 },
      { top: '80%', left: '42%', size: 1.8, delay: '0.9s', dur: '3.2s', op: 0.6 },
      { top: '88%', left: '92%', size: 2, delay: '1.5s', dur: '4.5s', op: 0.7 },
      { top: '48%', left: '15%', size: 2, delay: '2.8s', dur: '5.2s', op: 0.65 },
      { top: '72%', left: '22%', size: 2.5, delay: '0.3s', dur: '3.6s', op: 0.8 },
      { top: '28%', left: '95%', size: 1.8, delay: '1.9s', dur: '4s', op: 0.7 },
      { top: '6%', left: '80%', size: 2.2, delay: '3.1s', dur: '4.6s', op: 0.75 },
    ];
    return starList;
  }, []);

  // Parallax layer depths (pixels of shift)
  const layerSlow = {
    transform: reducedMotion
      ? 'none'
      : `translate3d(${mouseOffset.x * 8}px, ${mouseOffset.y * 8}px, 0)`,
  };
  const layerMid = {
    transform: reducedMotion
      ? 'none'
      : `translate3d(${mouseOffset.x * 16}px, ${mouseOffset.y * 16}px, 0)`,
  };
  const layerFast = {
    transform: reducedMotion
      ? 'none'
      : `translate3d(${mouseOffset.x * 24}px, ${mouseOffset.y * 24}px, 0)`,
  };

  const animStateClass = (!isVisible || reducedMotion) ? 'hero-bg-paused' : '';

  return (
    <div
      ref={containerRef}
      className={`hero-bg-root absolute inset-0 overflow-hidden pointer-events-none select-none transition-colors duration-700 ${
        isDark ? 'hero-bg-dark' : 'hero-bg-light'
      } ${animStateClass}`}
      aria-hidden="true"
    >
      {/* 1. Base Gradient Canvas */}
      <div className="absolute inset-0 hero-bg-canvas" />

      {/* 2. Delicate Academic Grid / Circuit Coordinates */}
      <div className="absolute inset-0 hero-bg-grid opacity-30" />

      {/* 3. Deep Ambient Glow Spots */}
      <div className="absolute inset-0">
        {/* Top-Right Neon Cyan / Electric Violet Glow */}
        <div
          className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full hero-ambient-glow-top hero-orb-pulse"
          style={{ ...layerSlow, animationDuration: '8s' }}
        />
        {/* Bottom-Left Saturated Magenta / Terracotta Planet Glow */}
        <div
          className="absolute -bottom-40 -left-40 w-[650px] h-[650px] rounded-full hero-ambient-glow-bottom hero-orb-pulse"
          style={{ ...layerSlow, animationDuration: '10s', animationDelay: '1.5s' }}
        />
        {/* Center-Right Subtle Violet Core Glow */}
        <div
          className="absolute top-1/4 right-1/4 w-[420px] h-[420px] rounded-full hero-ambient-glow-center hero-orb-pulse"
          style={{ ...layerMid, animationDuration: '9s', animationDelay: '3s' }}
        />
      </div>

      {/* 4. Large Glowing Corner Planet & Floating Spheres */}
      {/* Big Corner Planet at Bottom-Left */}
      <div
        className="absolute -bottom-28 -left-28 w-80 h-80 sm:w-96 sm:h-96 rounded-full hero-planet-main hero-planet-drift"
        style={{ ...layerSlow }}
      >
        <div className="w-full h-full rounded-full hero-planet-inner" />
        <div className="absolute inset-0 rounded-full hero-planet-ring" />
      </div>

      {/* Floating Minor Planet / Sphere Top-Right */}
      <div
        className="hidden sm:block absolute top-12 right-[12%] w-24 h-24 rounded-full hero-sphere-secondary hero-float-slow"
        style={{ ...layerMid, animationDelay: '1s' }}
      >
        <div className="w-full h-full rounded-full hero-sphere-secondary-inner" />
      </div>

      {/* Floating Minor Pearl Sphere Mid-Right */}
      <div
        className="absolute top-[60%] right-[38%] w-14 h-14 rounded-full hero-sphere-tertiary hero-float-reverse"
        style={{ ...layerFast, animationDelay: '2.5s' }}
      />

      {/* Tiny luminous accent sphere */}
      <div
        className="hidden md:block absolute top-[28%] right-[44%] w-6 h-6 rounded-full hero-sphere-tiny hero-float-slow"
        style={{ ...layerMid, animationDelay: '3.5s' }}
      />

      {/* 5. Glowing Glossy Abstract 3D Liquid Ribbon / Focal Orb */}
      <div
        className="hidden lg:block absolute top-[8%] right-[2%] w-[460px] h-[460px] hero-abstract-focal hero-ribbon-sway opacity-90 pointer-events-none"
        style={{ ...layerSlow }}
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-2xl"
        >
          <defs>
            {/* Dark Mode Gradients */}
            <linearGradient id="ribbonDarkGrad1" x1="50" y1="50" x2="350" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#D946EF" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#EC4899" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="ribbonDarkGrad2" x1="320" y1="80" x2="80" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#A855F7" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="glossHighlight" x1="120" y1="70" x2="220" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            {/* Light Mode Gradients */}
            <linearGradient id="ribbonLightGrad1" x1="50" y1="50" x2="350" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#FBCFE8" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#FDE68A" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="ribbonLightGrad2" x1="320" y1="80" x2="80" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#DDD6FE" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#FBCFE8" stopOpacity="0.5" />
            </linearGradient>

            <filter id="glowFocal" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="16" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Liquid Möbius Ribbon Strand A */}
          <path
            d="M 110,210 C 70,120 180,60 260,110 C 340,160 350,280 270,320 C 190,360 130,280 170,220 C 210,160 290,170 300,230"
            stroke={isDark ? "url(#ribbonDarkGrad1)" : "url(#ribbonLightGrad1)"}
            strokeWidth="38"
            strokeLinecap="round"
            filter="url(#glowFocal)"
          />

          {/* Liquid Strand B - Counter Loop with Gloss */}
          <path
            d="M 280,120 C 330,190 290,290 190,300 C 110,310 80,220 120,150 C 160,80 270,70 280,160 C 290,230 220,270 180,260"
            stroke={isDark ? "url(#ribbonDarkGrad2)" : "url(#ribbonLightGrad2)"}
            strokeWidth="24"
            strokeLinecap="round"
          />

          {/* Specular 3D Gloss Highlight curve */}
          <path
            d="M 125,180 C 110,140 160,85 220,105 C 265,120 285,160 260,200"
            stroke="url(#glossHighlight)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Inner Light Flare Core */}
          <circle cx="210" cy="190" r="18" fill="#FFFFFF" fillOpacity={isDark ? "0.45" : "0.75"} filter="url(#glowFocal)" />
        </svg>
      </div>

      {/* 6. Twinkling Starfield Dots */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <span
            key={i}
            className="hero-star absolute rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.dur,
              opacity: isDark ? star.op : star.op * 0.6,
              backgroundColor: isDark ? '#FFFFFF' : '#8B5CF6',
              boxShadow: isDark
                ? `0 0 6px 1px rgba(255,255,255,${star.op}), 0 0 12px 2px rgba(139,92,246,0.6)`
                : `0 0 4px 1px rgba(139,92,246,0.4)`,
            }}
          />
        ))}
      </div>

      {/* 7. Floating Educational Icons (Graduation Cap, Book, Atom, DNA, Math, Lightbulb, Trophy) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Icon 1: Graduation Cap (Top Left-Center) */}
        <div
          className="absolute top-[8%] left-[22%] hero-edu-icon hero-float-slow"
          style={{ ...layerMid, animationDelay: '0.4s' }}
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-terracotta-500/35 dark:text-terracotta-400/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>

        {/* Icon 2: Atom / Science Symbol (Mid Left) */}
        <div
          className="absolute top-[38%] left-[6%] hero-edu-icon hero-float-reverse"
          style={{ ...layerSlow, animationDelay: '1.2s' }}
        >
          <svg className="w-9 h-9 sm:w-12 sm:h-12 text-cyan-600/30 dark:text-cyan-400/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.6" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" />
          </svg>
        </div>

        {/* Icon 3: DNA Double Helix (Bottom Left-Center) */}
        <div
          className="hidden md:block absolute bottom-[18%] left-[24%] hero-edu-icon hero-float-slow"
          style={{ ...layerMid, animationDelay: '2.8s' }}
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-violet-600/30 dark:text-violet-400/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 15c6.667-6 13.333 0 20-6" />
            <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
            <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
            <path d="M17 6l-2.5-2.5" />
            <path d="M14 8l-1-1" />
            <path d="M7 18l2.5 2.5" />
            <path d="M3.5 14.5l.5.5" />
            <path d="M20 9.5l.5.5" />
            <path d="M2 9c6.667 6 13.333 0 20 6" />
          </svg>
        </div>

        {/* Icon 4: Math Symbols - Pi & Integral (Upper Center) */}
        <div
          className="hidden sm:block absolute top-[12%] left-[48%] hero-edu-icon hero-float-slow"
          style={{ ...layerSlow, animationDelay: '3.6s' }}
        >
          <svg className="w-8 h-8 text-amber-600/30 dark:text-amber-400/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 7h16" />
            <path d="M9 7v10c0 1.5-1 2-2 2" />
            <path d="M16 7v12" />
          </svg>
        </div>

        {/* Icon 5: Math Integral Symbol (Top Right-Center) */}
        <div
          className="hidden lg:block absolute top-[6%] right-[32%] hero-edu-icon hero-float-reverse"
          style={{ ...layerMid, animationDelay: '1.8s' }}
        >
          <svg className="w-7 h-7 text-pink-600/30 dark:text-pink-400/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M16 4c-3 0-5 2-5 5v6c0 3-2 5-5 5" />
          </svg>
        </div>

        {/* Icon 6: Math x² & Sigma (Mid Center-Right) */}
        <div
          className="hidden md:block absolute top-[44%] right-[28%] hero-edu-icon hero-float-slow"
          style={{ ...layerSlow, animationDelay: '2s' }}
        >
          <svg className="w-8 h-8 text-fuchsia-600/30 dark:text-fuchsia-400/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 4H6l6 8-6 8h12" />
          </svg>
        </div>

        {/* Icon 7: Lightbulb / Innovation (Bottom Center) */}
        <div
          className="hidden sm:block absolute bottom-[10%] left-[46%] hero-edu-icon hero-float-reverse"
          style={{ ...layerFast, animationDelay: '4.2s' }}
        >
          <svg className="w-8 h-8 text-yellow-600/35 dark:text-yellow-400/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
          </svg>
        </div>

        {/* Icon 8: Trophy of Excellence (Mid Right Edge) */}
        <div
          className="hidden lg:block absolute top-[32%] right-[5%] hero-edu-icon hero-float-slow"
          style={{ ...layerMid, animationDelay: '1.1s' }}
        >
          <svg className="w-9 h-9 text-amber-500/35 dark:text-amber-400/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
            <path d="M6 4h12v6a6 6 0 0 1-12 0V4z" />
          </svg>
        </div>

        {/* Icon 9: Open Book / Notebook (Bottom Right) */}
        <div
          className="hidden md:block absolute bottom-[8%] right-[14%] hero-edu-icon hero-float-reverse"
          style={{ ...layerSlow, animationDelay: '3.1s' }}
        >
          <svg className="w-8 h-8 text-sky-600/30 dark:text-sky-400/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
      </div>

      {/* 8. Floating Glassmorphism Cards (Arranged in Isometric/Tilted Depth on Right Side) */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Card 1: "AIR 1 / Rank 1" Gold Badge Card (Upper Right corner of photo) */}
        <div
          className="hidden sm:block absolute top-[6%] right-[2%] lg:right-[3%] z-20 hero-glass-card hero-glass-card-tilt-1 hero-card-float-1"
          style={{ ...layerFast, animationDuration: '7.5s' }}
        >
          <div className="p-3 sm:p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-primary-950 font-bold shadow-lg shadow-amber-500/30 shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                  State Rank 1
                </span>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400">NEET '25</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white mt-0.5">
                715 / 720 Perfect
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: "Score 98/100" Math Card with Progress Circle (Top-left corner of photo) */}
        <div
          className="hidden md:block absolute top-[8%] right-[38%] lg:right-[42%] z-20 hero-glass-card hero-glass-card-tilt-2 hero-card-float-2"
          style={{ ...layerMid, animationDuration: '8.8s', animationDelay: '1.2s' }}
        >
          <div className="p-3 rounded-2xl flex items-center gap-3">
            {/* Mini Circular Progress Ring */}
            <div className="relative w-10 h-10 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-neutral-200/50 dark:text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 dark:text-emerald-400"
                  strokeDasharray="98, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-neutral-800 dark:text-white">
                98%
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-semibold tracking-wider text-emerald-600 dark:text-emerald-400">
                Mathematics Centum
              </div>
              <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                Board Exam Score
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: "99.4% Percentile" Mini Bar Chart Card (Bottom-Right corner of photo) */}
        <div
          className="hidden sm:block absolute bottom-[4%] right-[2%] lg:right-[4%] z-20 hero-glass-card hero-glass-card-tilt-3 hero-card-float-3"
          style={{ ...layerSlow, animationDuration: '9.2s', animationDelay: '2.1s' }}
        >
          <div className="p-3 sm:p-3.5 rounded-2xl w-44 sm:w-48">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-white mb-2">
              <span className="flex items-center gap-1.5 text-terracotta-600 dark:text-terracotta-400">
                <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-pulse" />
                Performance
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">99.4 %tile</span>
            </div>
            {/* Visual Mini Bars */}
            <div className="flex items-end gap-1.5 h-8 pt-1">
              <div className="flex-1 bg-violet-400/30 dark:bg-violet-400/20 rounded-t h-3" />
              <div className="flex-1 bg-violet-400/40 dark:bg-violet-400/30 rounded-t h-5" />
              <div className="flex-1 bg-violet-400/50 dark:bg-violet-400/40 rounded-t h-4" />
              <div className="flex-1 bg-violet-400/70 dark:bg-violet-400/60 rounded-t h-6" />
              <div className="flex-1 bg-gradient-to-t from-violet-600 to-cyan-400 rounded-t h-full shadow-sm" />
            </div>
            <div className="flex justify-between text-[9px] text-neutral-500 dark:text-neutral-400 mt-1.5">
              <span>Test 1</span>
              <span>Test 2</span>
              <span>Test 3</span>
              <span>Test 4</span>
              <span className="font-bold text-neutral-700 dark:text-neutral-300">Final</span>
            </div>
          </div>
        </div>

        {/* Card 4: "Live Mentoring / Live Class" Card (Bottom-left of photo) */}
        <div
          className="hidden lg:block absolute bottom-[6%] right-[36%] z-20 hero-glass-card hero-glass-card-tilt-1 hero-card-float-1"
          style={{ ...layerMid, animationDuration: '8.2s', animationDelay: '0.8s' }}
        >
          <div className="p-2.5 sm:p-3 rounded-2xl flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-rose-500/20 dark:bg-rose-500/30 border border-rose-500/40 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Live Doubt Session
                </span>
              </div>
              <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                1-on-1 Faculty Mentorship
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Mobile-optimized Badge Card (Left/Center bottom on small screens) */}
        <div
          className="block sm:hidden absolute bottom-[6%] right-[6%] hero-glass-card hero-card-float-2"
          style={{ ...layerSlow }}
        >
          <div className="px-3 py-2 rounded-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-neutral-900 dark:text-white">
              Daily Batches Active
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
