"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function MotionWrap({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass =
    delay === 1
      ? "fade-in-up-delay-1"
      : delay === 2
        ? "fade-in-up-delay-2"
        : delay === 3
          ? "fade-in-up-delay-3"
          : "";

  return (
    <div
      ref={ref}
      className={cn(
        visible ? `fade-in-up ${delayClass}` : "opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
