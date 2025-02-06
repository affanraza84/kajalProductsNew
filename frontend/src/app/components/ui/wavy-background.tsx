"use client";
import { cn } from "@/app/utils/cn";
import React, { useEffect, useRef, useState } from "react";
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
  
  // Use useRef to persist mutable values
  const w = useRef<number>(0);
  const h = useRef<number>(0);
  const nt = useRef<number>(0);
  const i = useRef<number>(0);
  const x = useRef<number>(0);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
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
      console.log("unable to get canvas");
    }
  };

  // New pink color palette for the wave
  const waveColors = colors ?? [
    "#FEC2D7", // Soft pink
    "#F9A8D4", // Blush pink
    "#F472B6", // Hot pink
    "#FBCFE8", // Light pink
    "#F9A8D4", // Blush pink again for a more unified look
  ];

  const drawWave = (n: number) => {
    nt.current += getSpeed();
    for (i.current = 0; i.current < n; i.current++) {
      if (ctx.current) {
        ctx.current.beginPath();
        ctx.current.lineWidth = waveWidth || 50;
        ctx.current.strokeStyle = waveColors[i.current % waveColors.length];
        for (x.current = 0; x.current < w.current; x.current += 5) {
          const y = noise(x.current / 800, 0.3 * i.current, nt.current) * 100;
          ctx.current.lineTo(x.current, y + h.current * 0.5); // adjust for height, currently at 50% of the container
        }
        ctx.current.stroke();
        ctx.current.closePath();
      }
    }
  };

  const render = () => {
    if (!canvasRef.current) return;
    if (ctx.current) {
      ctx.current.fillStyle = backgroundFill || "#F9F5F1"; // Light off-white background
      ctx.current.globalAlpha = waveOpacity || 0.5;
      ctx.current.fillRect(0, 0, w.current, h.current);
      drawWave(5);
      animationIdRef.current = requestAnimationFrame(render);
    }
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      w.current = canvasRef.current.width = window.innerWidth;
      h.current = canvasRef.current.height = window.innerHeight;
      if(ctx.current){
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
