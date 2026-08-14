import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Keep the brand moment brief so it never gets between a visitor and the work.
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 650);

    // Call onComplete after transition finishes (e.g. 500ms fade)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1000);

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
      <div className="text-center space-y-3">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1ed760] text-lg font-black tracking-tight text-black">
          JS
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Jacen Salvador
        </h1>
        <p className="text-sm text-zinc-500 md:text-base">
          Product engineering, end to end.
        </p>
      </div>
    </div>
  );
}
