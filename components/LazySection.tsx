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
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px', // Load before it comes into view
  });

  useEffect(() => {
    if (inView) {
      setHasBeenViewed(true);
    }
  }, [inView]);

  return (
    <div ref={ref} style={{ minHeight: hasBeenViewed ? 'auto' : height }}>
      {hasBeenViewed ? (
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
