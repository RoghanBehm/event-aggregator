import { useEffect, useState, RefObject } from 'react';

// Hook to detect truncation and add an is-truncated ID
export function useIsTruncated(element: RefObject<HTMLElement>): boolean {
  const [isTruncated, setIsTruncated] = useState(false);

  const determineIsTruncated = () => {
    if (!element.current) return false;
    const threshold = 2; // Adjusts for font size
    return element.current.scrollHeight > element.current.clientHeight + threshold;
  };

  useEffect(() => {
    if (!element.current) return;

    const handleResize = () => {
      const truncated = determineIsTruncated();
      setIsTruncated(truncated);

      // If text is truncated, add is-truncated to RefObject element
      if (truncated) {
        element.current!.id = 'is-truncated';
      } else {
        element.current!.id = ''; // Remove ID if not truncated
 
      }
    };

    handleResize(); // Check truncation on mount component mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [element]); // Re-runs truncation check if ref object value changes

  return isTruncated;
}
