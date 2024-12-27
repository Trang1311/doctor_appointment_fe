"use client";
import React from "react";
import { Tomorrow, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const tomorrow = Roboto({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-roboto",
});

export default function GlitchText({
  text = "1000 Stars",
  className,
  starCount = 50,
}: {
  text: string;
  className?: string;
  starCount?: number;
}) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden max-w-[690px] max-h-[200px]">
      <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#004574] via-[#01304f] to-[#001b2d] p-4 rounded-lg">
        {[...Array(starCount)].map((_, i) => (
          <div
            key={i}
            className="star absolute aspect-square animate-[twinkle_5s_infinite] rounded-full bg-[#fafafa] opacity-75"
            style={{
              width: `${Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        <h1
          className={cn(
            "glitch-text z-10 animate-[glitch_3s_infinite] text-sm ",
            className,
            tomorrow.className
          )}
          aria-label={text}
        >
          <FontAwesomeIcon icon={faStar} style={{ marginRight: "8px" }} />
          {text}
        </h1>
      </div>
    </div>
  );
}
