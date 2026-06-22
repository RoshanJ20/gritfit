"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A barely-there grid of hairlines that drifts slowly behind a section — depth,
 * not decoration. Restyled from ReactBits' Squares: brand-tinted strokes on a
 * transparent canvas, drifting diagonally. Absolute + pointer-events-none, so
 * drop it as the first child of a `relative` wrapper. Reduced motion → a single
 * static frame, no animation loop.
 */
export function SquaresBackground({
  className,
  cell = 56,
  opacity = 0.05,
}: {
  className?: string;
  cell?: number;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let offset = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth * dpr;
      canvas.height = parent.offsetHeight * dpr;
      canvas.style.width = `${parent.offsetWidth}px`;
      canvas.style.height = `${parent.offsetHeight}px`;
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(174, 217, 35, ${opacity})`;
      ctx.lineWidth = dpr;
      const size = cell * dpr;
      const o = offset % size;
      for (let xpos = -o; xpos < w; xpos += size) {
        ctx.beginPath();
        ctx.moveTo(xpos, 0);
        ctx.lineTo(xpos, h);
        ctx.stroke();
      }
      for (let ypos = -o; ypos < h; ypos += size) {
        ctx.beginPath();
        ctx.moveTo(0, ypos);
        ctx.lineTo(w, ypos);
        ctx.stroke();
      }
    };

    resize();
    if (reduced) {
      draw();
      return;
    }
    const loop = () => {
      offset += 0.18;
      draw();
      raf = requestAnimationFrame(loop);
    };
    loop();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [cell, opacity, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    />
  );
}
