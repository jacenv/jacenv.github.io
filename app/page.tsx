"use client";

import * as React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "@/components/sidebar";
import { MainContent } from "@/components/main-content";
import { HomeContent } from "@/components/home-content";
import { LikedSongsContent } from "@/components/liked-songs-content";
import { BottomPlayer } from "@/components/bottom-player";
import { sidebarData, projectsData, Project } from "@/lib/data";

export default function SpotifyPage() {
  const [isMounted, setIsMounted] = React.useState(false);

  // Default to 'home' view
  const [selectedCategoryId, setSelectedCategoryId] = React.useState("home");

  const [currentProject, setCurrentProject] = React.useState<Project | null>(
    null
  );
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Player State
  const [queue, setQueue] = React.useState<Project[]>([]);
  const [isShuffling, setIsShuffling] = React.useState(false);
  const [repeatMode, setRepeatMode] = React.useState<"off" | "all" | "one">(
    "off"
  );

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determine which category is selected (if any), for MainContent
  const selectedCategory = sidebarData.find((c) => c.id === selectedCategoryId);

  const handlePlay = (project: Project, newQueue?: Project[]) => {
    if (currentProject?.id === project.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentProject(project);
      setIsPlaying(true);
      if (newQueue) {
        setQueue(newQueue);
      }
    }
  };

  const handlePlayPause = () => {
    if (currentProject) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (!currentProject || queue.length === 0) return;

    const currentIndex = queue.findIndex((p) => p.id === currentProject.id);
    
    if (isShuffling) {
      // Pick a random song from the queue that isn't the current one (unless queue length is 1)
      if (queue.length === 1) {
          // If only 1 song, just restart it if needed or do nothing
          return;
      }
      let nextIndex = Math.floor(Math.random() * queue.length);
      while (nextIndex === currentIndex) {
          nextIndex = Math.floor(Math.random() * queue.length);
      }
      setCurrentProject(queue[nextIndex]);
      setIsPlaying(true);
      return;
    }

    if (currentIndex === -1) {
        // Current song not in queue? just play first
        setCurrentProject(queue[0]);
        setIsPlaying(true);
        return;
    }

    if (currentIndex < queue.length - 1) {
      setCurrentProject(queue[currentIndex + 1]);
      setIsPlaying(true);
    } else {
      // End of queue
      if (repeatMode === "all") {
        setCurrentProject(queue[0]);
        setIsPlaying(true);
      } else {
        // If repeat is off, maybe stop playing or just do nothing. Spotify usually stops.
        setIsPlaying(false);
        setCurrentProject(null);
      }
    }
  };

  const handlePrevious = () => {
    if (!currentProject || queue.length === 0) return;

    const currentIndex = queue.findIndex((p) => p.id === currentProject.id);
    
    // Usually previous goes to beginning of song if played for > 3s, but we don't track progress yet.
    // Let's just go to previous song.

    if (isShuffling) {
       // In shuffle mode, previous usually goes to previously played song in history.
       // We don't track history yet. Let's just pick random for now or do nothing.
       // Better: Go to previous in original list just for simplicity? Or just random.
       // Standard behavior: Go back in history.
       // Simplified behavior: Random.
       handleNext(); // Re-use random logic for now as we don't have history.
       return;
    }

    if (currentIndex > 0) {
      setCurrentProject(queue[currentIndex - 1]);
      setIsPlaying(true);
    } else {
       // Start of queue
       if (repeatMode === "all") {
           setCurrentProject(queue[queue.length - 1]);
           setIsPlaying(true);
       } else {
           // Restart current song?
           // For now, just do nothing if at start.
       }
    }
  };

  const handleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const handleRepeat = () => {
    if (repeatMode === "off") setRepeatMode("all");
    else if (repeatMode === "all") setRepeatMode("one");
    else setRepeatMode("off");
  };

  const handleNavigateToAbout = () => {
    const aboutCategory = sidebarData.find((c) => c.id === "about");
    if (aboutCategory) {
      setSelectedCategoryId(aboutCategory.id);
    }
  };

  if (!isMounted) {
    return <div className="h-screen w-full bg-black"></div>;
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-black text-foreground flex flex-col">
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full items-stretch"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={15}
            maxSize={30}
            className="hidden md:block min-w-[200px] bg-black border-r border-black"
          >
            <Sidebar
              categories={sidebarData}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
            />
          </ResizablePanel>
          <ResizableHandle
            withHandle
            className="hidden md:flex bg-black border-black"
          />
          <ResizablePanel defaultSize={80} minSize={30} className="bg-black">
            {selectedCategoryId === "home" ? (
              <HomeContent
                playlists={sidebarData}
                projects={projectsData}
                onSelectCategory={setSelectedCategoryId}
                onNavigateToAbout={handleNavigateToAbout}
                onPlay={handlePlay}
                currentProject={currentProject}
                isPlaying={isPlaying}
              />
            ) : selectedCategoryId === "liked" ? (
              <LikedSongsContent
                currentProject={currentProject}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onNavigateToAbout={handleNavigateToAbout}
              />
            ) : selectedCategory ? (
              <MainContent
                category={selectedCategory}
                currentProject={currentProject}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onNavigateToAbout={handleNavigateToAbout}
              />
            ) : null}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Bottom Player - Always Rendered */}
      <BottomPlayer
        project={currentProject}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onShuffle={handleShuffle}
        onRepeat={handleRepeat}
        isShuffling={isShuffling}
        repeatMode={repeatMode}
      />

      {/* Mobile View Fallback */}
      <div className="md:hidden absolute inset-0 flex flex-col bg-black z-40">
        <div className="p-4 border-b border-zinc-800">
          <select
            className="w-full p-2 rounded-md border border-zinc-800 bg-zinc-900 text-white"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="home">Home</option>
            <option value="liked">Liked Songs</option>
            {sidebarData.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 overflow-hidden">
          {selectedCategoryId === "home" ? (
            <HomeContent
              playlists={sidebarData}
              projects={projectsData}
              onSelectCategory={setSelectedCategoryId}
              onNavigateToAbout={handleNavigateToAbout}
              onPlay={handlePlay}
              currentProject={currentProject}
              isPlaying={isPlaying}
            />
          ) : selectedCategoryId === "liked" ? (
            <LikedSongsContent
              currentProject={currentProject}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onNavigateToAbout={handleNavigateToAbout}
            />
          ) : selectedCategory ? (
            <MainContent
              category={selectedCategory}
              currentProject={currentProject}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onNavigateToAbout={handleNavigateToAbout}
            />
          ) : null}
        </div>
        <BottomPlayer
          project={currentProject}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onShuffle={handleShuffle}
          onRepeat={handleRepeat}
          isShuffling={isShuffling}
          repeatMode={repeatMode}
        />
      </div>
    </div>
  );
}
