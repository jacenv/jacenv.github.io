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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomPlayerProps {
  project: Project | null;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export function BottomPlayer({
  project,
  isPlaying,
  onPlayPause,
}: BottomPlayerProps) {
  // If no project is selected, render the empty state
  if (!project) {
    return (
      <div className="h-[90px] w-full bg-black flex items-center justify-between px-4 relative z-50 border-t border-zinc-800">
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
            <div className="h-1 w-full bg-zinc-800 rounded-full relative">
              {/* Empty progress bar */}
            </div>
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
            <div className="h-1 w-full bg-zinc-800 rounded-full relative"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90px] w-full bg-black flex items-center justify-between px-4 relative z-50 border-t border-zinc-800">
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
            className="text-zinc-400 hover:text-white h-8 w-8"
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white h-8 w-8"
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
          >
            <SkipForward className="h-5 w-5 fill-current" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white h-8 w-8"
          >
            <Repeat className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full max-w-[600px]">
          <span className="text-xs text-zinc-400 min-w-[32px] text-right font-variant-numeric tabular-nums">
            0:00
          </span>
          <div className="h-1 w-full bg-zinc-600 rounded-full group cursor-pointer relative">
            <div className="h-full w-1/3 bg-white rounded-full group-hover:bg-[#1db954]"></div>
            <div className="absolute top-1/2 left-1/3 h-3 w-3 bg-white rounded-full opacity-0 group-hover:opacity-100 -translate-y-1/2 -translate-x-1/2 shadow-md"></div>
          </div>
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
          <div className="h-1 w-full bg-zinc-600 rounded-full cursor-pointer relative">
            <div className="h-full w-3/4 bg-white rounded-full group-hover:bg-[#1db954]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
