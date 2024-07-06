import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function capitalizeWords(str: string): string {
  return str.replace(/\b(\w)/g, (s) => s.toUpperCase());
}

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export function debounce<T extends (...args: any[]) => void>(callback: T, wait: number): (value: string) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (value: string): void => {
    const next = () => callback(value);

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(next, wait);
  };
}

export const useIsMobile = (): boolean => {
  return useMediaQuery({
    query: '(max-width: 768px)'
  })
};