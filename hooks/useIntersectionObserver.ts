"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useIntersectionObserver<T extends Element>(
  options?: IntersectionObserverInit
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(Boolean(entry?.isIntersecting));
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isVisible];
}
