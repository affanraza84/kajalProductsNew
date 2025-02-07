"use client";
import { cn } from "@/app/utils/cn";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
}) => {
  const noise = createNoise3D();

  // Persist mutable values using useRef
  const w = useRef<number>(0);
  const h = useRef<number>(0);
  const nt = useRef<number>(0);
  const i = useRef<number>(0);
  const x = useRef<number>(0);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);

  const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

  // Define color palette
  const waveColors = colors ?? [
    "#FEC2D7", // Soft pink
    "#F9A8D4", // Blush pink
    "#F472B6", // Hot pink
    "#FBCFE8", // Light pink
    "#F9A8D4", // Blush pink
  ];

  // Wrap `drawWave` in `useCallback`
  const drawWave = useCallback(
    (n: number) => {
      nt.current += getSpeed();
      for (i.current = 0; i.current < n; i.current++) {
        if (ctx.current) {
          ctx.current.beginPath();
          ctx.current.lineWidth = waveWidth || 50;
          ctx.current.strokeStyle = waveColors[i.current % waveColors.length];
          for (x.current = 0; x.current < w.current; x.current += 5) {
            const y = noise(x.current / 800, 0.3 * i.current, nt.current) * 100;
            ctx.current.lineTo(x.current, y + h.current * 0.5);
          }
          ctx.current.stroke();
          ctx.current.closePath();
        }
      }
    },
    [waveWidth, waveColors] // Include dependencies
  );

  // Now `render` correctly depends on `drawWave`
  const render = useCallback(() => {
    if (!canvasRef.current) return;
    if (ctx.current) {
      ctx.current.fillStyle = backgroundFill || "#F9F5F1";
      ctx.current.globalAlpha = waveOpacity || 0.5;
      ctx.current.fillRect(0, 0, w.current, h.current);
      drawWave(5); // No more missing dependency
      animationIdRef.current = requestAnimationFrame(render);
    }
  }, [backgroundFill, waveOpacity, drawWave]); // Added drawWave

  const init = useCallback(() => {
    if (!canvasRef.current) return;
    canvas.current = canvasRef.current;
    ctx.current = canvas.current.getContext("2d");

    if (ctx.current) {
      w.current = ctx.current.canvas.width = window.innerWidth;
      h.current = ctx.current.canvas.height = window.innerHeight;
      ctx.current.filter = `blur(${blur}px)`;
      nt.current = 0;
      render();
    } else {
      console.log("Unable to get canvas context");
    }
  }, [blur, render]); // render is included

  useEffect(() => {
    init();
    return () => cancelAnimationFrame(animationIdRef.current);
  }, [init]);

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      w.current = canvasRef.current.width = window.innerWidth;
      h.current = canvasRef.current.height = window.innerHeight;
      if (ctx.current) {
        ctx.current.filter = `blur(${blur}px)`;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [blur]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
