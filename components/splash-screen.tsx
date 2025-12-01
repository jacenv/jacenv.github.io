import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // Call onComplete after transition finishes (e.g. 500ms fade)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-500 ease-in-out",
        isFading ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="text-center space-y-4 animate-pulse">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
          hi, i&apos;m jacen
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl">
          welcome to my portfolio
        </p>
      </div>
    </div>
  );
}

