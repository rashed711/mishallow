import React, { Suspense, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  height?: string;
}

const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  fallback = <div className="h-[200px] w-full animate-pulse bg-slate-50 rounded-3xl" />,
  height = "200px"
}) => {
  // Performance & SEO Optimization: Ensure full content parity for mobile and desktop
  // Crawlers and desktop get immediate render; mobile uses content-visibility for maximum speed
  const [isReady, setIsReady] = useState(false);

  const isCrawler = typeof navigator !== 'undefined' && /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '600px 0px',
  });

  useEffect(() => {
    // Desktop and bots are immediately rendered to guarantee parity and prevent TBT
    if (window.innerWidth >= 1024 || isCrawler) {
      setIsReady(true);
    }
  }, [isCrawler]);

  useEffect(() => {
    if (inView) {
      setIsReady(true);
    }
  }, [inView]);

  return (
    <div 
      ref={ref} 
      style={{ 
        contentVisibility: 'auto',
        containIntrinsicSize: '0 800px',
        minHeight: isReady ? 'auto' : height 
      }}
    >
      {isReady || isCrawler || typeof window === 'undefined' ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

export default React.memo(LazySection);
