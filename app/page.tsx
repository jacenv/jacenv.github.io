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
  // Find the default "projects" category
  const defaultCategory =
    sidebarData.find((c) => c.type === "projects") || sidebarData[0];

  const [selectedCategoryId, setSelectedCategoryId] = React.useState(
    defaultCategory.id
  );

  const [currentProject, setCurrentProject] = React.useState<Project | null>(
    null
  );
  const [isPlaying, setIsPlaying] = React.useState(false);

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

  return (
    <div className="h-screen w-full overflow-hidden bg-background text-foreground flex flex-col">
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full items-stretch"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={15}
            maxSize={30}
            className="hidden md:block min-w-[200px] bg-zinc-900/5 dark:bg-zinc-900/50 border-r"
          >
            <Sidebar
              categories={sidebarData}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
            />
          </ResizablePanel>
          <ResizableHandle withHandle className="hidden md:flex" />
          <ResizablePanel defaultSize={80} minSize={30}>
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

      {/* Mobile View Fallback (Simple stack for now or could use a Sheet) */}
      <div className="md:hidden h-full flex flex-col absolute inset-0 bg-background z-50">
        {/* Only showing if we are in mobile mode, but ResizablePanel handles hiding on md. 
             Wait, ResizablePanel renders children. I need to hide this explicitly if standard view is active or use media queries.
             The original code had this parallel to ResizablePanelGroup, which is fine as long as we use display:none via CSS classes.
             The previous code had md:hidden on the wrapper div.
          */}
      </div>

      {/* Re-implementing mobile fallback properly or relying on the resizable panel responsive classes if they work. 
          Actually, ResizablePanelGroup handles layout. The mobile div below is for small screens.
      */}
      <div className="md:hidden absolute inset-0 flex flex-col bg-background z-40">
        <div className="p-4 border-b">
          <select
            className="w-full p-2 rounded-md border bg-background"
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
