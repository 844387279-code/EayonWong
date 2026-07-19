"use client";

import { ReactNode, useCallback, useEffect, useRef } from "react";
import "./BorderGlow.css";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
};

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 174, s: 68, l: 55 };
  return { h: Number.parseFloat(match[1]), s: Number.parseFloat(match[2]), l: Number.parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const suffixes = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars: Record<string, string> = {};

  opacities.forEach((opacity, index) => {
    vars[`--glow-color${suffixes[index]}`] =
      `hsl(${base} / ${Math.min(opacity * intensity, 100)}%)`;
  });

  return vars;
}

const positions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const keys = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"];
const map = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]) {
  const vars: Record<string, string> = {};
  keys.forEach((key, index) => {
    vars[key] = `radial-gradient(at ${positions[index]}, ${colors[Math.min(map[index], colors.length - 1)]} 0px, transparent 50%)`;
  });
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

export default function BorderGlow({
  children,
  className = "",
  innerClassName = "",
  edgeSensitivity = 26,
  glowColor = "174 68 55",
  backgroundColor = "rgba(14, 18, 20, 0.74)",
  borderRadius = 8,
  glowRadius = 34,
  glowIntensity = 1,
  coneSpread = 24,
  animated = false,
  colors = ["#42d8c4", "#a8c7ff", "#dfb36e"],
  fillOpacity = 0.34,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!animated || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animationFrames = new Set<number>();
    const timers = new Set<number>();
    let hasAnimated = false;

    const animateValue = ({
      start = 0,
      end = 100,
      duration = 1000,
      delay = 0,
      ease,
      onUpdate,
      onEnd,
    }: {
      start?: number;
      end?: number;
      duration?: number;
      delay?: number;
      ease: (value: number) => number;
      onUpdate: (value: number) => void;
      onEnd?: () => void;
    }) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        const startedAt = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          onUpdate(start + (end - start) * ease(progress));

          if (progress < 1) {
            const frame = requestAnimationFrame(tick);
            animationFrames.add(frame);
          } else {
            onEnd?.();
          }
        };

        const frame = requestAnimationFrame(tick);
        animationFrames.add(frame);
      }, delay);

      timers.add(timer);
    };

    const runSweep = () => {
      if (hasAnimated) return;
      hasAnimated = true;

      const angleStart = 110;
      const angleEnd = 465;
      const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
      const easeInCubic = (value: number) => value * value * value;

      card.classList.add("sweep-active");
      card.style.setProperty("--cursor-angle", `${angleStart}deg`);

      animateValue({
        duration: 500,
        ease: easeOutCubic,
        onUpdate: (value) => card.style.setProperty("--edge-proximity", `${value}`),
      });
      animateValue({
        duration: 1500,
        ease: easeInCubic,
        end: 50,
        onUpdate: (value) => {
          const angle = (angleEnd - angleStart) * (value / 100) + angleStart;
          card.style.setProperty("--cursor-angle", `${angle}deg`);
        },
      });
      animateValue({
        start: 50,
        end: 100,
        delay: 1500,
        duration: 2250,
        ease: easeOutCubic,
        onUpdate: (value) => {
          const angle = (angleEnd - angleStart) * (value / 100) + angleStart;
          card.style.setProperty("--cursor-angle", `${angle}deg`);
        },
      });
      animateValue({
        start: 100,
        end: 0,
        delay: 2500,
        duration: 1500,
        ease: easeInCubic,
        onUpdate: (value) => card.style.setProperty("--edge-proximity", `${value}`),
        onEnd: () => card.classList.remove("sweep-active"),
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        runSweep();
      },
      { threshold: 0.24 },
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      animationFrames.forEach((frame) => cancelAnimationFrame(frame));
      card.classList.remove("sweep-active");
    };
  }, [animated]);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const kx = dx === 0 ? Infinity : cx / Math.abs(dx);
    const ky = dy === 0 ? Infinity : cy / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
    card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => cardRef.current?.style.setProperty("--edge-proximity", "0")}
      className={`border-glow-card ${className}`}
      data-animated={animated || undefined}
      style={{
        "--card-bg": backgroundColor,
        "--edge-sensitivity": edgeSensitivity,
        "--border-radius": `${borderRadius}px`,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": coneSpread,
        "--fill-opacity": fillOpacity,
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
      } as React.CSSProperties}
    >
      <span className="edge-light" />
      <div className={`border-glow-inner ${innerClassName}`}>{children}</div>
    </div>
  );
}
