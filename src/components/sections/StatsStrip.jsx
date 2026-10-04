import React from 'react';
import { Container } from '../ui/Container';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { Skeleton } from '../ui/Skeleton';

export function StatsStrip() {
  const { config, loading } = useSiteConfig();
  const stats = config?.stats || [];

  return (
    <section className="bg-surface-parchment text-neutral-900 py-8 border-b border-neutral-200/90" aria-label="Key Academy Statistics">
      <Container>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <Skeleton variant="rectangular" className="h-10 w-24 mx-auto bg-neutral-200 rounded" />
                <Skeleton variant="text" className="h-4 w-32 mx-auto bg-neutral-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-neutral-300/80">
            {stats.map((item, index) => (
              <div
                key={item.id || index}
                className={`text-center px-4 ${index > 0 ? 'pt-4 md:pt-0' : ''}`}
              >
                <div className="font-serif text-xl sm:text-2xl lg:text-2xl font-normal text-primary-950 tracking-tight mb-1">
                  <span>{item.value}</span>
                  {item.suffix && (
                    <span className="text-terracotta-600 font-sans font-medium text-base ml-1">{item.suffix}</span>
                  )}
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-0.5">
                  {item.label}
                </h3>
                <p className="text-[11px] text-neutral-600 max-w-[200px] mx-auto hidden sm:block">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
