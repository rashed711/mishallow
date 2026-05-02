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
  // Performance Optimization: Only use intersection observer on mobile/low-end devices.
  // On desktop, we want immediate rendering to avoid TBT/Hydration overhead.
  const [isDesktop, setIsDesktop] = useState(true);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '400px 0px',
    skip: isDesktop, // Skip observer on desktop
  });

  useEffect(() => {
    const checkDesktop = window.innerWidth >= 1024;
    setIsDesktop(checkDesktop);
    if (checkDesktop) {
      setHasBeenViewed(true);
    }
  }, []);

  useEffect(() => {
    if (inView) {
      setHasBeenViewed(true);
    }
  }, [inView]);

  return (
    <div ref={ref} style={{ minHeight: isDesktop || hasBeenViewed ? 'auto' : height }}>
      {isDesktop || hasBeenViewed ? (
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
