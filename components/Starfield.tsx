"use client";

import { useEffect, useRef } from "react";

interface StarfieldProps {
  className?: string;
}

export default function Starfield({ className }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width,
    }));

    function animate() {
      // transparent background, no black fill
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      stars.forEach((star) => {
        star.z -= 2;
        if (star.z <= 0) star.z = width;

        const sx = (star.x - width / 2) * (100 / star.z) + width / 2;
        const sy = (star.y - height / 2) * (100 / star.z) + height / 2;

        const size = (width / star.z) * 1.2;

        ctx.fillStyle = "white";
        ctx.fillRect(sx, sy, size, size);
      });

      requestAnimationFrame(animate);
    }

    animate();

    // handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute inset-0 -z-50 pointer-events-none"}
    />
  );
}
