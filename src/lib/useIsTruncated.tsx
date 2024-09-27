import { useEffect, useState, RefObject } from 'react';

// Hook to detect truncation and add a class or ID
export function useIsTruncated(element: RefObject<HTMLElement>): boolean {
  const [isTruncated, setIsTruncated] = useState(false);

  const determineIsTruncated = () => {
    if (!element.current) return false;
    const threshold = 2; // Adjust as needed based on your font size
    return element.current.scrollHeight > element.current.clientHeight + threshold;
  };

  useEffect(() => {
    if (!element.current) return;

    const handleResize = () => {
      const truncated = determineIsTruncated();
      setIsTruncated(truncated);

      // If text is truncated, add an ID or class
      if (truncated) {
        element.current!.id = 'is-truncated';  // Add an ID
        // or element.current!.classList.add('truncated'); // Add a class instead
      } else {
        element.current!.id = ''; // Remove the ID if not truncated
        // or element.current!.classList.remove('truncated'); // Remove the class
      }
    };

    handleResize(); // Check truncation when the component mounts
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [element]);

  return isTruncated;
}
