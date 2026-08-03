"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Pause, Heart } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Project, Artist, likedArtists } from "@/lib/data";

// Distinct gradient per row so placeholder tiles read as intentional design
// rather than a missing image.
const AVATAR_GRADIENTS = [
  "from-violet-500 to-purple-700",
  "from-sky-500 to-blue-700",
  "from-pink-500 to-rose-600",
  "from-emerald-500 to-teal-700",
  "from-amber-500 to-orange-600",
  "from-fuchsia-500 to-indigo-700",
];

// Artist avatar with a graceful fallback: if there's no image (or it fails to
// load), show a gradient tile with the artist's initial.
function ArtistAvatar({ artist, index }: { artist: Artist; index: number }) {
  const [error, setError] = React.useState(false);

  if (!artist.imageUrl || error) {
    return (
      <div
        className={cn(
          "h-full w-full flex items-center justify-center bg-gradient-to-br text-white font-bold text-lg",
          AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]
        )}
      >
        {artist.name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={artist.imageUrl}
      alt={artist.name}
      width={48}
      height={48}
      unoptimized
      className="h-full w-full object-cover"
      onError={() => setError(true)}
    />
  );
}

interface LikedSongsContentProps {
  currentProject: Project | null;
  isPlaying: boolean;
  onPlay: (project: Project, queue?: Project[]) => void;
}

export function LikedSongsContent({
  currentProject,
  isPlaying,
  onPlay,
}: LikedSongsContentProps) {
  const artists = likedArtists;

  // Convert Artist to Project so the bottom player can display it
  const toProject = (artist: Artist): Project => ({
    id: artist.id,
    title: artist.name,
    description: "Artist",
    tags: ["Artist"],
    link: artist.link,
    image: artist.imageUrl,
  });

  const handleArtistPlay = (artist: Artist) => {
    onPlay(toProject(artist), artists.map(toProject));
  };

  return (
    <div className="h-full relative bg-[#121212] rounded-lg overflow-hidden ml-2 my-2 mr-2">
      <ScrollArea className="h-full w-full bg-[#121212]">
        <div className="flex flex-col min-h-full pb-20">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center gap-4 p-6 pt-16 md:flex-row md:items-end md:text-left md:gap-6 md:p-8 md:pt-8 bg-gradient-to-b from-[#5038a0] to-[#121212]">
            <div className="flex h-44 w-44 md:h-[232px] md:w-[232px] md:min-w-[232px] items-center justify-center shadow-2xl relative group bg-gradient-to-br from-[#450af5] to-[#c4efd9]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="h-20 w-20 md:h-24 md:w-24 text-white fill-current" />
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 pb-2 min-w-0">
              <span className="text-sm font-medium uppercase tracking-wider text-white">
                Personal picks
              </span>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl lg:text-8xl text-white break-words">
                Music I like
              </h1>
              <div className="flex items-center gap-2 text-sm text-zinc-300 font-medium mt-4">
                <div className="h-6 w-6 rounded-full bg-zinc-500 flex items-center justify-center text-[10px] text-white">
                  JS
                </div>
                <span className="font-bold text-white hover:underline cursor-pointer">
                  Jacen Salvador
                </span>
                <span>•</span>
                <span className="text-white/70">{artists.length} artists</span>
              </div>
            </div>
          </div>

          {/* Background gradient continuation */}
          <div className="bg-gradient-to-b from-[#121212]/20 to-[#121212] relative z-10">
            {/* Actions Bar */}
            <div className="flex items-center justify-end md:justify-start gap-8 px-4 md:px-6 py-4 md:py-6">
              <Button
                size="icon"
                className="h-14 w-14 rounded-full shadow-lg bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 transition-all text-black border-0"
                onClick={() => artists.length > 0 && handleArtistPlay(artists[0])}
              >
                {isPlaying && currentProject?.id === artists[0]?.id ? (
                  <Pause className="h-6 w-6 fill-black stroke-black" />
                ) : (
                  <Play className="h-6 w-6 fill-black stroke-black pl-1" />
                )}
              </Button>
            </div>

            {/* Content Section */}
            <div className="px-4 md:px-6">
              <div className="pb-10 space-y-1">
                {artists.map((artist, i) => (
                  <div
                    key={artist.id}
                    className="group flex items-center gap-3 md:gap-4 rounded-md px-2 md:px-4 py-2 transition-colors hover:bg-white/10 active:bg-white/10 cursor-pointer"
                    onClick={() => handleArtistPlay(artist)}
                  >
                    {/* Track number / play toggle (desktop only) */}
                    <div className="w-4 hidden md:flex justify-center text-sm font-medium text-zinc-400">
                      <span
                        className={cn(
                          "group-hover:hidden",
                          currentProject?.id === artist.id &&
                            isPlaying &&
                            "text-green-500"
                        )}
                      >
                        {i + 1}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 hidden group-hover:flex p-0 hover:bg-transparent text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArtistPlay(artist);
                        }}
                      >
                        {currentProject?.id === artist.id && isPlaying ? (
                          <Pause className="h-4 w-4 fill-current" />
                        ) : (
                          <Play className="h-4 w-4 fill-current" />
                        )}
                      </Button>
                    </div>

                    {/* Circular avatar — Spotify renders artists as circles */}
                    <div className="h-12 w-12 md:h-10 md:w-10 rounded-full overflow-hidden flex-shrink-0">
                      <ArtistAvatar artist={artist} index={i} />
                    </div>

                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                      <span
                        className={cn(
                          "truncate font-medium text-base",
                          currentProject?.id === artist.id
                            ? "text-[#1ed760]"
                            : "text-white"
                        )}
                      >
                        {artist.name}
                      </span>
                      <span className="truncate text-sm text-zinc-400">
                        Artist
                      </span>
                    </div>

                    {artist.link && (
                      <a
                        href={artist.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4 text-zinc-400 hover:text-white" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
