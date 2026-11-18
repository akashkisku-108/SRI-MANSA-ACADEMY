import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Award, Microscope, Users, GraduationCap, BarChart3, Laptop } from 'lucide-react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Skeleton } from '../ui/Skeleton';
import { InteractiveCard } from '../ui/InteractiveCard';
import { galleryService } from '../../services/galleryService';
import { gallerySectionsContent } from '../../data/gallery';

const ICON_MAP = {
  book: BookOpen,
  award: Award,
  microscope: Microscope,
  users: Users,
  graduation: GraduationCap,
  chart: BarChart3,
  laptop: Laptop,
};

export function GalleryPreview() {
  const [previewItems, setPreviewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    galleryService.getPreview(6)
      .then((data) => {
        if (isMounted) {
          setPreviewItems(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const content = gallerySectionsContent?.homepagePreview || {
    eyebrow: "CAMPUS JOURNAL · ASHOK NAGAR",
    title: "Inside the Academy",
    intro: "A glimpse into our classrooms, computer lab sessions, and personalized academic guidance."
  };

  return (
    <Section background="white" id="gallery-preview" spacing="normal" className="border-b border-neutral-200/90">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-700 block mb-2">
            {content.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-950 font-normal tracking-tight">
            {content.title}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
          {content.intro}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" className="h-80 rounded-card" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item, idx) => {
            const IconComponent = ICON_MAP[item.theme?.iconType] || BookOpen;

            return (
              <InteractiveCard
                key={item.id}
                as={Link}
                to="/gallery"
                className="h-full block group"
                innerClassName="rounded-card overflow-hidden border border-neutral-200/90 shadow-card bg-neutral-100 flex flex-col justify-between h-full hover:border-terracotta-400 hover:shadow-card-hover transition-all duration-300"
                aria-label={`View ${item.title} in gallery archive`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.altText || item.title}
                      width={item.width || 1024}
                      height={item.height || 768}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${item.theme.gradient} flex items-center justify-center`}>
                      <IconComponent className="w-10 h-10 text-white/70" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-transparent to-black/10" />

                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/95 text-primary-950 shadow-xs">
                      {item.theme?.tag || item.category}
                    </span>
                    <span className="text-white text-[11px] font-semibold bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                      {item.year}
                    </span>
                  </div>
                </div>

                <div className="p-5 bg-white border-t border-neutral-200 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-400 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-serif font-bold text-primary-950 mb-1.5 leading-snug group-hover:text-terracotta-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            );
          })}
        </div>
      )}

      <div className="mt-12 text-center">
        <Button
          as={Link}
          to="/gallery"
          variant="secondary"
          size="md"
          rightIcon={ArrowRight}
        >
          View Full Campus Photo Archive
        </Button>
      </div>
    </Section>
  );
}
