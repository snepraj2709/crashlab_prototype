"use client";

import { useEffect, useRef } from "react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, summary, label, [role='button'], [data-cursor='interactive']";
const NATIVE_CURSOR_SELECTOR = "[data-cursor='native']";

export function CustomCursor(): React.ReactElement {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor || typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(FINE_POINTER_QUERY);

    if (!mediaQuery.matches) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let animationFrame = 0;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let isVisible = false;
    let isInteractive = false;
    let isPressed = false;

    const getScale = (): number => {
      if (isPressed) {
        return isInteractive ? 1.06 : 0.92;
      }

      return isInteractive ? 1.14 : 1;
    };

    const render = (): void => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      cursor.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${getScale()})`;
      cursor.style.opacity = isVisible ? "1" : "0";

      animationFrame = window.requestAnimationFrame(render);
    };

    const setInteractiveState = (target: EventTarget | null): void => {
      const element = target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
      isInteractive = Boolean(element);
    };

    const isNativeCursorZone = (target: EventTarget | null): boolean =>
      target instanceof Element && Boolean(target.closest(NATIVE_CURSOR_SELECTOR));

    const handlePointerMove = (event: MouseEvent): void => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (isNativeCursorZone(event.target)) {
        isVisible = false;
        isInteractive = false;
        isPressed = false;
        return;
      }

      isVisible = true;
      setInteractiveState(event.target);
    };

    const handlePointerLeave = (): void => {
      isVisible = false;
      isInteractive = false;
      isPressed = false;
    };

    const handlePointerDown = (event: MouseEvent): void => {
      if (isNativeCursorZone(event.target)) {
        isPressed = false;
        return;
      }

      isPressed = true;
    };

    const handlePointerUp = (): void => {
      isPressed = false;
    };

    render();

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mousedown", handlePointerDown, { passive: true });
    window.addEventListener("mouseup", handlePointerUp, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return <div aria-hidden="true" className="custom-cursor" ref={cursorRef} />;
}
