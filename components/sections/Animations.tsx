"use client";

import React, { ReactNode, useEffect, useRef, useState } from 'react';

/**
 * FadeIn Component
 * Triggers a fade-up animation when the element enters the viewport.
 */
interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = "",
  delay = 0,
  threshold = 0.2
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;

      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transform ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
        } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform',
        transitionDuration: '600ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
};

/**
 * ParallaxImage Component
 * An image wrapper that creates a parallax scrolling effect.
 */
interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // 0 to 1
  className?: string;
  imageClassName?: string;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  speed = 0.1,
  className = "",
  imageClassName = ""
}) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only animate if in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        const centerPosition = windowHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = elementCenter - centerPosition;

        setOffset(distanceFromCenter * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`absolute w-full h-[120%] -top-[10%] object-cover transition-transform duration-75 ease-linear will-change-transform ${imageClassName}`}
        style={{ transform: `translateY(${offset}px)` }}
      />
    </div>
  );
};

/**
 * AnimatedHeading Component
 * Staggers the reveal of letters/words.
 */
interface AnimatedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  wordMode?: boolean;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = "",
  delay = 0,
  wordMode = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;

      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Simplified: just fade in the whole text with premium easing
  return (
    <span
      ref={ref}
      className={`inline-block ${isVisible ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity',
        transitionDuration: '500ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      aria-label={text}
    >
      {text}
    </span>
  );
};
