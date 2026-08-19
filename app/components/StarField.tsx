"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width,
    }));

    function animate() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => {
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-30"
    />
  );
}
