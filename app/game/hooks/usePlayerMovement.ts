"use client";

import { useEffect, useState } from "react";

type Direction = "up" | "down" | "left" | "right" | null;

interface Position {
  x: number;
  y: number;
}

interface UsePlayerMovementOptions {
  speed?: number;
  bounds: { width: number; height: number };
}

export function usePlayerMovement({ speed = 5, bounds }: UsePlayerMovementOptions) {
  const [position, setPosition] = useState<Position>({ x: bounds.width / 2, y: bounds.height / 2 });
  const [direction, setDirection] = useState<Direction>(null);

  // Keyboard controls (desktop)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowUp" || e.key === "w") setDirection("up");
      if (e.key === "ArrowDown" || e.key === "s") setDirection("down");
      if (e.key === "ArrowLeft" || e.key === "a") setDirection("left");
      if (e.key === "ArrowRight" || e.key === "d") setDirection("right");
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        setDirection(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Touch / swipe controls (iPad)
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    function handleTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (Math.abs(dx) > Math.abs(dy)) {
        setDirection(dx > 0 ? "right" : "left");
      } else {
        setDirection(dy > 0 ? "down" : "up");
      }
    }

    function handleTouchEnd() {
      setDirection(null);
    }

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Movement loop
  useEffect(() => {
    let animationFrame: number;

    function step() {
      setPosition((prev) => {
        let x = prev.x;
        let y = prev.y;

        if (direction === "up") y -= speed;
        if (direction === "down") y += speed;
        if (direction === "left") x -= speed;
        if (direction === "right") x += speed;

        // Clamp to bounds
        x = Math.max(0, Math.min(bounds.width, x));
        y = Math.max(0, Math.min(bounds.height, y));

        return { x, y };
      });

      animationFrame = requestAnimationFrame(step);
    }

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [direction, speed, bounds.width, bounds.height]);

  return { position, direction };
}
