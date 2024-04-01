import { useEffect, useState } from "react";

export function capitalizeWords(str: string): string {
    return str.replace(/\b(\w)/g, (s) => s.toUpperCase());
}

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
  