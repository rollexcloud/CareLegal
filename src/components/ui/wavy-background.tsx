"use client";
import { cn } from "@/utils/cn";
import React, { useEffect, useMemo, useRef } from "react";
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
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = useMemo(() => createNoise3D(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const waveColors = useMemo(
    () =>
      colors ?? [
        "#38bdf8",
        "#818cf8",
        "#c084fc",
        "#e879f9",
        "#22d3ee",
      ],
    [colors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let width = (ctx.canvas.width = window.innerWidth);
    let height = (ctx.canvas.height = window.innerHeight);
    let noiseTime = 0;

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

    ctx.filter = `blur(${blur}px)`;

    const drawWave = (count: number) => {
      noiseTime += getSpeed();
      for (let idx = 0; idx < count; idx++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[idx % waveColors.length];
        for (let posX = 0; posX < width; posX += 5) {
          const posY = noise(posX / 800, 0.3 * idx, noiseTime) * 100;
          ctx.lineTo(posX, posY + height * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    let animationId: number;
    const render = () => {
      ctx.fillStyle = backgroundFill || "black";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, width, height);
      drawWave(5);
      animationId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = ctx.canvas.width = window.innerWidth;
      height = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    window.addEventListener("resize", handleResize);
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [
    backgroundFill,
    blur,
    noise,
    speed,
    waveColors,
    waveOpacity,
    waveWidth,
  ]);

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
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
