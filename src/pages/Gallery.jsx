import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Microscope,
  Users,
  GraduationCap,
  BarChart3,
  Maximize2
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageLayout } from '../components/layout/PageLayout';
import { Section } from '../components/ui/Section';
import { Badge } from '../components/ui/Badge';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { Skeleton } from '../components/ui/Skeleton';
import { useGallery } from '../hooks/useGallery';

const CATEGORIES = [
  'All',
  'Classrooms & Library',
  'Felicitations & Awards',
  'Workshops & Labs',
  'Campus Life'
];

const ICON_MAP = {
  book: BookOpen,
  award: Award,
  microscope: Microscope,
  users: Users,
  graduation: GraduationCap,
  chart: BarChart3,
};

export default function Gallery() {
  useDocumentTitle(
    "Campus & Academic Life Gallery | Srimanasa Academy",
    "Explore our classrooms, STEM laboratories, library reading pods, annual convocations, and student life at Srimanasa Educational Academy."
  );

  const [activeCategory, setActiveCategory] = useState('All');
  const { items, loading, error } = useGallery(activeCategory);

  // Lightbox state
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const lightboxRef = useRef(null);

  const activeItem = activeItemIndex !== null ? items[activeItemIndex] : null;

  const openLightbox = (index) => {
    setActiveItemIndex(index);
  };

  const closeLightbox = () => {
    setActiveItemIndex(null);
  };

  const handleNext = () => {
    if (activeItemIndex === null || items.length === 0) return;
    setActiveItemIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    if (activeItemIndex === null || items.length === 0) return;
    setActiveItemIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeItemIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);

    // Focus close button on open
    const closeBtn = lightboxRef.current?.querySelector('button[aria-label="Close image lightbox"]');
    closeBtn?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItemIndex, items.length]);

  return (
    <PageLayout>
      {/* Header Banner */}
      <section className="bg-surface-warm text-neutral-900 py-14 md:py-18 border-b border-neutral-200/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-kolam-subtle opacity-30 pointer-events-none" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-widest block mb-2">
              PHOTO ARCHIVE · ASHOK NAGAR CAMPUS
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-primary-950 mb-4">
              Inside Srimanasa Academy
            </h1>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
              Step inside our modern lecture rooms, reference reading halls, science workshops, and annual ranker felicitation ceremonies in Chennai.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Gallery Section */}
      <Section background="warm">
        {/* Category Filter Tabs */}
        <div className="mb-10">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
            role="tablist"
            aria-label="Filter gallery items by category"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-button transition-all duration-150 whitespace-nowrap min-h-[44px] ${
                    isActive
                      ? 'bg-primary-900 text-white shadow-sm font-bold'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" className="h-72 rounded-card" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : items.length === 0 ? (
          <EmptyState
            title="No gallery items found"
            description="No images found for this category."
            actionText="View All Items"
            onAction={() => setActiveCategory('All')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => {
              const IconComponent = ICON_MAP[item.theme?.iconType] || BookOpen;

              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className="group relative bg-white rounded-card overflow-hidden border border-neutral-200/90 shadow-card hover:shadow-card-hover cursor-pointer transition-all duration-300 flex flex-col justify-between"
                  tabIndex={0}
                  role="button"
                  aria-haspopup="dialog"
                  aria-label={`View enlarged image: ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(idx);
                    }
                  }}
                >
                  {/* Visual Photo Header */}
                  <div className="h-60 relative overflow-hidden bg-neutral-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.altText || item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${item.theme.gradient} flex items-center justify-center`}>
                        <IconComponent className="w-10 h-10 text-white/70" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-black/20" />

                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-white/95 text-primary-950 shadow-sm">
                        {item.theme?.tag || item.category}
                      </span>
                      <span className="text-white text-xs font-semibold bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                        {item.year}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-white">
                      <span className="text-[11px] font-medium tracking-wide uppercase text-neutral-300">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded backdrop-blur-sm transition-colors text-white font-medium">
                        <Maximize2 className="w-3 h-3" aria-hidden="true" />
                        View
                      </span>
                    </div>
                  </div>

                  {/* Caption & Title */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-base text-primary-950 mb-1.5 leading-snug group-hover:text-primary-800 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* Accessible Fullscreen Lightbox Modal */}
      {activeItem && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950/95 backdrop-blur-md p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${activeItem.title}`}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Main Visual Content Box */}
          <div
            className="relative max-w-4xl w-full bg-neutral-900 rounded-card overflow-hidden shadow-elevated border border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visual Canvas */}
            <div className="w-full h-80 sm:h-96 relative bg-neutral-950 flex items-center justify-center overflow-hidden">
              {activeItem.image ? (
                <img
                  src={activeItem.image}
                  alt={activeItem.altText || activeItem.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${activeItem.theme.gradient} flex flex-col items-center justify-center p-8 text-center`}>
                  {(() => {
                    const ActiveIcon = ICON_MAP[activeItem.theme?.iconType] || BookOpen;
                    return (
                      <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-4 shadow-xl">
                        <ActiveIcon className="w-10 h-10" aria-hidden="true" />
                      </div>
                    );
                  })()}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute bottom-4 left-6 right-6 text-white pointer-events-none">
                <span className="text-[11px] uppercase tracking-widest text-terracotta-300 font-bold mb-1 block">
                  {activeItem.theme.tag} • {activeItem.year}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-normal text-white max-w-xl">
                  {activeItem.title}
                </h2>
              </div>
            </div>

            {/* Lightbox Footer Bar */}
            <div className="p-6 bg-white text-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <span className="text-[11px] font-semibold text-accent-700 uppercase tracking-wider">
                  Category: {activeItem.category}
                </span>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {activeItem.caption}
                </p>
                <p className="text-[11px] text-neutral-400 italic">
                  Alt text: {activeItem.altText}
                </p>
              </div>

              <div className="text-xs text-neutral-500 font-medium shrink-0 self-end sm:self-center">
                {activeItemIndex + 1} of {items.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
