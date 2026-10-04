import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';

export default function NotFound() {
  useDocumentTitle("Page Not Found | 404", "The requested page could not be located.");

  return (
    <PageLayout>
      <section className="py-24 md:py-32 bg-surface-warm text-center">
        <Container>
          <div className="max-w-md mx-auto space-y-6">
            <span className="text-6xl sm:text-7xl font-serif font-bold text-primary-900 block tracking-tight">
              404
            </span>
            <div className="w-16 h-1 bg-accent-500 mx-auto rounded-full" />
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
              Page Not Found
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We could not find the page you were looking for. It may have been moved, renamed, or is temporarily unavailable.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                as={Link}
                to="/"
                variant="primary"
                size="md"
                leftIcon={Home}
              >
                Return to Home
              </Button>
              <Button
                as={Link}
                to="/courses"
                variant="secondary"
                size="md"
                leftIcon={ArrowLeft}
              >
                Explore Courses
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
