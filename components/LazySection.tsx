import React from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  height?: string;
}

/**
 * Keeps secondary homepage content present in server-rendered HTML and the
 * initial hydration tree. Native content-visibility lets the browser skip
 * off-screen rendering without withholding content from crawlers or users.
 */
const LazySection: React.FC<LazySectionProps> = ({
  children,
  height = "200px"
}) => {
  return (
    <div
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: `0 ${height}`
      }}
    >
      {children}
    </div>
  );
};

export default React.memo(LazySection);
