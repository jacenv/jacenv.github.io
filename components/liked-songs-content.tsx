"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Pause, Clock, Library } from "lucide-react";
import { TopNav } from "@/components/top-nav";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/data";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  dateAdded: string;
  duration: string;
  coverUrl?: string;
  link?: string;
}

interface LikedSongsContentProps {
  currentProject: Project | null;
  isPlaying: boolean;
  onPlay: (project: Project, queue?: Project[]) => void;
  onNavigateToAbout: () => void;
  onNavigateHome: () => void;
}

export function LikedSongsContent({
  currentProject,
  isPlaying,
  onPlay,
  onNavigateToAbout,
  onNavigateHome,
}: LikedSongsContentProps) {
  // Manually add your songs here
  const songs: Song[] = [
    {
      id: "1",
      title: "Entombed",
      artist: "Deftones",
      album: "Koi No Yokan",
      dateAdded: "4 days ago",
      duration: "4:59",
      coverUrl:
        "https://i.scdn.co/image/ab67616d0000b27387e62856413955a263649438",
    },
    {
      id: "2",
      title: "FUCK THE SPEAKERZ UP",
      artist: "ISOxo",
      album: "FUCK THE SPEAKERZ UP",
      dateAdded: "4 days ago",
      duration: "2:46",
      coverUrl:
        "https://i.scdn.co/image/ab67616d0000b273c8c32d4b031014685693552d",
    },
    {
      id: "3",
      title: "Shinunoga E-Wa",
      artist: "Fujii Kaze",
      album: "HELP EVER HURT NEVER",
      dateAdded: "5 days ago",
      duration: "3:06",
      coverUrl:
        "https://i.scdn.co/image/ab67616d0000b273e6d1304f1542579159495403",
    },
    {
      id: "4",
      title: "One Last Kiss",
      artist: "Hikaru Utada",
      album: "BADモード",
      dateAdded: "1 week ago",
      duration: "4:10",
      coverUrl:
        "https://i.scdn.co/image/ab67616d0000b273d45179b354461c2b65a52f21",
    },
    {
      id: "5",
      title: "Sunny",
      artist: "Yorushika",
      album: "Sunny",
      dateAdded: "1 week ago",
      duration: "4:31",
      coverUrl:
        "https://i.scdn.co/image/ab67616d0000b27383177927c561c3386e569191",
    },
    {
      id: "6",
      title: "Revolutionary Roads - On The Way",
      artist: "AiNA THE END",
      album: "Revolutionary Roads - On The Way",
      dateAdded: "1 week ago",
      duration: "3:18",
      coverUrl:
        "https://i.scdn.co/image/ab67616d0000b273e860607a724137e739bd2989",
    },
  ];

  // Convert Song to Project for the player
  const handleSongPlay = (song: Song) => {
    const project: Project = {
      id: song.id,
      title: song.title,
      description: song.artist,
      tags: [song.album],
      link: song.link,
      date: song.dateAdded,
    };

    // Convert all songs to projects for the queue
    const queue: Project[] = songs.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.artist,
      tags: [s.album],
      link: s.link,
      date: s.dateAdded,
    }));

    onPlay(project, queue);
  };

  return (
    <div className="h-full relative bg-[#121212] rounded-lg overflow-hidden ml-2 my-2 mr-2">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <TopNav onNavigateToAbout={onNavigateToAbout} onNavigateHome={onNavigateHome} />
      </div>

      <ScrollArea className="h-full w-full bg-[#121212]">
        <div className="flex flex-col min-h-full pb-20">
          {/* Header Section */}
          <div className="flex items-end gap-6 p-8 bg-gradient-to-b from-[#5038a0] to-[#121212] pt-[80px]">
            <div className="flex h-[232px] w-[232px] min-w-[232px] items-center justify-center shadow-2xl relative group bg-gradient-to-br from-[#450af5] to-[#c4efd9]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Library className="h-24 w-24 text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-2 pb-2">
              <span className="text-sm font-medium uppercase tracking-wider text-white">
                Playlist
              </span>
              <h1 className="text-5xl font-black tracking-tight lg:text-8xl text-white">
                Liked Songs
              </h1>
              <div className="flex items-center gap-2 text-sm text-zinc-300 font-medium mt-4">
                <div className="h-6 w-6 rounded-full bg-zinc-500 flex items-center justify-center text-[10px] text-white">
                  JS
                </div>
                <span className="font-bold text-white hover:underline cursor-pointer">
                  Jacen Salvador
                </span>
                <span>•</span>
                <span className="text-white/70">{songs.length} songs</span>
              </div>
            </div>
          </div>

          {/* Background gradient continuation */}
          <div className="bg-gradient-to-b from-[#121212]/20 to-[#121212] relative z-10">
            {/* Actions Bar */}
            <div className="flex items-center gap-8 px-6 py-6">
              <Button
                size="icon"
                className="h-14 w-14 rounded-full shadow-lg bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 transition-all text-black border-0"
                onClick={() => songs.length > 0 && handleSongPlay(songs[0])}
              >
                {isPlaying && currentProject?.id === songs[0]?.id ? (
                  <Pause className="h-6 w-6 fill-black stroke-black" />
                ) : (
                  <Play className="h-6 w-6 fill-black stroke-black pl-1" />
                )}
              </Button>
            </div>

            {/* Content Section */}
            <div className="px-6">
              <div className="pb-10">
                <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(50px,1fr)] gap-4 border-b border-white/10 px-4 py-2 text-sm font-medium text-zinc-400 sticky top-[64px] bg-[#121212] z-10 mb-4">
                  <div className="text-center">#</div>
                  <div>Title</div>
                  <div>Album</div>
                  <div>Date added</div>
                  <div className="flex justify-end pr-4">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-2">
                  {songs.map((song, i) => (
                    <div
                      key={song.id}
                      className="group grid grid-cols-[16px_4fr_3fr_2fr_minmax(50px,1fr)] gap-4 rounded-md px-4 py-2 text-sm transition-colors hover:bg-white/10 items-center relative"
                      onDoubleClick={() => handleSongPlay(song)}
                    >
                      <div className="font-medium text-zinc-400 group-hover:text-white w-4 flex justify-center">
                        <span
                          className={cn(
                            "group-hover:hidden",
                            currentProject?.id === song.id &&
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
                          onClick={() => handleSongPlay(song)}
                        >
                          {currentProject?.id === song.id && isPlaying ? (
                            <Pause className="h-4 w-4 fill-current" />
                          ) : (
                            <Play className="h-4 w-4 fill-current" />
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Thumbnail */}
                        <div className="h-10 w-10 bg-zinc-800 rounded flex-shrink-0 overflow-hidden">
                          {song.coverUrl ? (
                            <img
                              src={song.coverUrl}
                              alt={song.album}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-zinc-700">
                              <Library className="h-5 w-5 text-zinc-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span
                            className={cn(
                              "truncate font-medium text-base",
                              currentProject?.id === song.id
                                ? "text-[#1ed760]"
                                : "text-white"
                            )}
                          >
                            {song.title}
                          </span>
                          <span className="truncate text-sm text-zinc-400 group-hover:text-white transition-colors cursor-pointer hover:underline">
                            {song.artist}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="truncate text-zinc-400 group-hover:text-white">
                          {song.album}
                        </span>
                      </div>
                      <div className="text-zinc-400 text-sm">
                        {song.dateAdded}
                      </div>
                      <div className="flex justify-end pr-2 items-center gap-4">
                        <span className="text-zinc-400">{song.duration}</span>
                        {song.link && (
                          <a
                            href={song.link}
                            target="_blank"
                            rel="noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="h-4 w-4 text-zinc-400 hover:text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
