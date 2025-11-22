"use client";

import * as React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "@/components/sidebar";
import { MainContent } from "@/components/main-content";
import { BottomPlayer } from "@/components/bottom-player";
import { sidebarData, Project } from "@/lib/data";

export default function SpotifyPage() {
  const [isMounted, setIsMounted] = React.useState(false);

  // Find the default "projects" category
  const defaultCategory =
    sidebarData.find((c) => c.id === "projects") || sidebarData[0]; // Using ID 'projects' to match data.ts

  const [selectedCategoryId, setSelectedCategoryId] = React.useState(
    defaultCategory.id
  );

  const [currentProject, setCurrentProject] = React.useState<Project | null>(
    null
  );
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedCategory =
    sidebarData.find((c) => c.id === selectedCategoryId) || sidebarData[0];

  const handlePlay = (project: Project) => {
    if (currentProject?.id === project.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentProject(project);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    if (currentProject) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNavigateToAbout = () => {
    const aboutCategory = sidebarData.find((c) => c.id === "about");
    if (aboutCategory) {
      setSelectedCategoryId(aboutCategory.id);
    }
  };

  // Prevent hydration mismatch by only rendering the complex layout after mount
  // Or simply return a loading state / simplified layout initially if critical
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
            <MainContent
              category={selectedCategory}
              currentProject={currentProject}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onNavigateToAbout={handleNavigateToAbout}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Bottom Player */}
      {currentProject && (
        <BottomPlayer
          project={currentProject}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      )}

      {/* Mobile View Fallback */}
      <div className="md:hidden absolute inset-0 flex flex-col bg-black z-40">
        <div className="p-4 border-b border-zinc-800">
          <select
            className="w-full p-2 rounded-md border border-zinc-800 bg-zinc-900 text-white"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            {sidebarData.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 overflow-hidden">
          <MainContent
            category={selectedCategory}
            currentProject={currentProject}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onNavigateToAbout={handleNavigateToAbout}
          />
        </div>
        {currentProject && (
          <BottomPlayer
            project={currentProject}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
          />
        )}
      </div>
    </div>
  );
}
