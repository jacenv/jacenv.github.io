import { Project } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  Maximize2,
  ListMusic,
  Repeat1,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Slider } from "@/components/ui/slider";
import * as React from "react";

interface BottomPlayerProps {
  project: Project | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
  isShuffling: boolean;
  repeatMode: "off" | "all" | "one";
}

export function BottomPlayer({
  project,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  onRepeat,
  isShuffling,
  repeatMode,
}: BottomPlayerProps) {
  const [progress, setProgress] = React.useState([0]);
  const [volume, setVolume] = React.useState([75]);

  // If no project is selected, render the empty state (Desktop Only)
  if (!project) {
    return (
      <div className="hidden md:flex h-[90px] w-full bg-black items-center justify-between px-4 relative z-50 border-t border-zinc-800">
        {/* Left: Empty */}
        <div className="flex items-center gap-4 w-[30%] min-w-[180px]"></div>

        {/* Center: Disabled Controls */}
        <div className="flex flex-col items-center max-w-[40%] w-full gap-1">
          <div className="flex items-center gap-4 mb-1 opacity-50 pointer-events-none">
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 h-8 w-8"
              disabled
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 h-8 w-8"
              disabled
            >
              <SkipBack className="h-5 w-5 fill-current" />
            </Button>
            <Button
              size="icon"
              className="bg-zinc-400 text-black rounded-full h-8 w-8"
              disabled
            >
              <Play className="h-5 w-5 fill-current pl-0.5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 h-8 w-8"
              disabled
            >
              <SkipForward className="h-5 w-5 fill-current" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 h-8 w-8"
              disabled
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-[600px] opacity-50 pointer-events-none">
            <span className="text-xs text-zinc-600 min-w-[32px] text-right font-variant-numeric tabular-nums">
              -:--
            </span>
            <Slider
              defaultValue={[0]}
              max={100}
              step={1}
              className="w-full group cursor-default"
            />
            <span className="text-xs text-zinc-600 min-w-[32px] font-variant-numeric tabular-nums">
              -:--
            </span>
          </div>
        </div>

        {/* Right: Disabled Volume */}
        <div className="flex items-center justify-end gap-2 w-[30%] min-w-[180px] opacity-50 pointer-events-none">
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 h-8 w-8"
            disabled
          >
            <ListMusic className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 h-8 w-8"
            disabled
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 w-24">
            <Volume2 className="h-4 w-4 text-zinc-400" />
            <Slider
              defaultValue={[0]}
              max={100}
              step={1}
              className="w-full group cursor-default"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Mini Player */}
      <div className="md:hidden fixed bottom-[84px] left-2 right-2 h-14 bg-[#282828] rounded-md z-50 flex items-center justify-between px-3 shadow-lg" onClick={onPlayPause}>
         <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="h-10 w-10 bg-zinc-700 rounded-sm flex-shrink-0"></div>
            <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-white truncate">{project.title}</span>
                <span className="text-xs text-zinc-400 truncate">{project.description}</span>
            </div>
         </div>
         <div className="flex items-center gap-2">
             {/* Like button here later */}
             <Button
                size="icon"
                variant="ghost"
                className="text-white h-10 w-10 hover:bg-transparent"
                onClick={(e) => {
                    e.stopPropagation();
                    onPlayPause();
                }}
             >
                {isPlaying ? (
                  <Pause className="h-6 w-6 fill-current" />
                ) : (
                  <Play className="h-6 w-6 fill-current pl-1" />
                )}
             </Button>
         </div>
         {/* Progress bar at bottom of mini player */}
         <div className="absolute bottom-0 left-1 right-1 h-[2px] bg-zinc-600 rounded-full overflow-hidden">
            <div className="h-full bg-white w-1/3 rounded-full"></div>
         </div>
      </div>

      {/* Desktop Player */}
      <div className="hidden md:flex h-[90px] w-full bg-black items-center justify-between px-4 relative z-50 border-t border-zinc-800">
        {/* Left: Project Info */}
        <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
          <div className="h-14 w-14 bg-zinc-800 rounded-sm flex items-center justify-center overflow-hidden relative group cursor-pointer shadow-sm">
            {/* Placeholder for project image if available, else icon */}
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-400">
              <span className="text-[10px] font-bold text-white">PROJECT</span>
            </div>
          </div>
          <div className="flex flex-col justify-center overflow-hidden">
            <span className="text-sm font-medium text-white hover:underline cursor-pointer truncate">
              {project.title}
            </span>
            <span className="text-xs text-zinc-400 hover:underline cursor-pointer truncate">
              {project.description}
            </span>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex flex-col items-center max-w-[40%] w-full gap-1">
          <div className="flex items-center gap-4 mb-1">
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "text-zinc-400 hover:text-white h-8 w-8 transition-colors",
                isShuffling && "text-green-500 hover:text-green-400"
              )}
              onClick={onShuffle}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white h-8 w-8"
              onClick={onPrevious}
            >
              <SkipBack className="h-5 w-5 fill-current" />
            </Button>
            <Button
              size="icon"
              className="bg-white text-black hover:scale-105 transition-all rounded-full h-8 w-8"
              onClick={onPlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current pl-0.5" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white h-8 w-8"
              onClick={onNext}
            >
              <SkipForward className="h-5 w-5 fill-current" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "text-zinc-400 hover:text-white h-8 w-8 transition-colors",
                repeatMode !== "off" && "text-green-500 hover:text-green-400"
              )}
              onClick={onRepeat}
            >
              {repeatMode === "one" ? (
                <Repeat1 className="h-4 w-4" />
              ) : (
                <Repeat className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-[600px]">
            <span className="text-xs text-zinc-400 min-w-[32px] text-right font-variant-numeric tabular-nums">
              0:00
            </span>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="w-full group"
            />
            <span className="text-xs text-zinc-400 min-w-[32px] font-variant-numeric tabular-nums">
              3:45
            </span>
          </div>
        </div>

        {/* Right: Volume/Extras */}
        <div className="flex items-center justify-end gap-2 w-[30%] min-w-[180px]">
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white h-8 w-8"
          >
            <ListMusic className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white h-8 w-8"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 w-24 group">
            <Volume2 className="h-4 w-4 text-zinc-400 hover:text-white cursor-pointer" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-full group"
            />
          </div>
        </div>
      </div>
    </>
  );
}
