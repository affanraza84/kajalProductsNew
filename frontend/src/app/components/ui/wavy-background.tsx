"use client";
import { cn } from "@/app/utils/cn";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 50,
  backgroundFill = "#F9F5F1",
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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const animationIdRef = useRef<number>(0);

  const w = useRef<number>(0);
  const h = useRef<number>(0);
  const nt = useRef<number>(0);

  const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

  const waveColors = colors ?? [
    "#FEC2D7", "#F9A8D4", "#F472B6", "#FBCFE8", "#F9A8D4",
  ];

  const drawWave = (n: number) => {
    if (!ctx.current) return;
    nt.current += getSpeed();
    
    for (let i = 0; i < n; i++) {
      ctx.current.beginPath();
      ctx.current.lineWidth = waveWidth;
      ctx.current.strokeStyle = waveColors[i % waveColors.length];

      for (let x = 0; x < w.current; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt.current) * 100;
        ctx.current.lineTo(x, y + h.current * 0.5);
      }

      ctx.current.stroke();
      ctx.current.closePath();
    }
  };

  const render = useCallback(() => {
    if (!canvasRef.current || !ctx.current) return;

    ctx.current.fillStyle = backgroundFill;
    ctx.current.globalAlpha = waveOpacity;
    ctx.current.fillRect(0, 0, w.current, h.current);
    
    drawWave(5);
    animationIdRef.current = requestAnimationFrame(render);
  }, [backgroundFill, waveOpacity]);

  const init = useCallback(() => {
    if (!canvasRef.current) return;
    
    ctx.current = canvasRef.current.getContext("2d");
    if (!ctx.current) {
      console.log("Unable to get canvas context");
      return;
    }

    w.current = canvasRef.current.width = window.innerWidth;
    h.current = canvasRef.current.height = window.innerHeight;
    ctx.current.filter = `blur(${blur}px)`;
    nt.current = 0;
    render();
  }, [blur, render]);

  useEffect(() => {
    init();
    return () => cancelAnimationFrame(animationIdRef.current);
  }, [init]);

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      w.current = canvasRef.current.width = window.innerWidth;
      h.current = canvasRef.current.height = window.innerHeight;
      if (ctx.current) ctx.current.filter = `blur(${blur}px)`;
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
        style={isSafari ? { filter: `blur(${blur}px)` } : {}}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};