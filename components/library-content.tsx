import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Library, Plus, ArrowRight, Search, ListFilter } from "lucide-react";

interface LibraryContentProps {
  categories: Category[];
  onSelectCategory: (id: string) => void;
}

export function LibraryContent({ categories, onSelectCategory }: LibraryContentProps) {
  // Filter for playlists only
  const playlists = categories.filter((c) => c.type === "playlist");

  return (
    <div className="h-full bg-[#121212] text-white flex flex-col pb-[160px] pt-8">
      <div className="px-4 py-4 sticky top-0 bg-[#121212] z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold">
              J
            </div>
            <h1 className="text-xl font-bold">Your Library</h1>
          </div>
          <div className="flex items-center gap-4">
            <Search className="h-6 w-6" />
            <Plus className="h-6 w-6" />
          </div>
        </div>
        
        <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar">
            <span className="px-4 py-1.5 bg-[#2a2a2a] rounded-full text-sm text-white cursor-pointer border border-transparent">
              Playlists
            </span>
            <span className="px-4 py-1.5 bg-[#2a2a2a] rounded-full text-sm text-white cursor-pointer border border-transparent">
              Projects
            </span>
            <span className="px-4 py-1.5 bg-[#2a2a2a] rounded-full text-sm text-white cursor-pointer border border-transparent">
              Albums
            </span>
        </div>
      </div>

      <div className="px-4 py-2 flex items-center justify-between text-zinc-400 text-sm mb-2">
          <div className="flex items-center gap-1">
              <ArrowRight className="h-4 w-4 rotate-90" />
              <span>Recents</span>
          </div>
          <ListFilter className="h-4 w-4" />
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2">
          {/* Liked Songs Item */}
          <div
            className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-md cursor-pointer active:bg-black"
            onClick={() => onSelectCategory("liked")}
          >
            <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 rounded-sm">
              <Library className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col gap-1 overflow-hidden">
              <span className="font-medium truncate text-white text-base">Liked Songs</span>
              <div className="flex items-center text-zinc-400 text-sm">
                <span className="text-green-500 -rotate-45 mr-1 text-xs">📌</span>
                <span>Playlist • 2,874 songs</span>
              </div>
            </div>
          </div>

          {/* Dynamic Categories */}
          {playlists.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-md cursor-pointer active:bg-black"
              onClick={() => onSelectCategory(category.id)}
            >
              <div className="h-16 w-16 bg-[#282828] flex items-center justify-center flex-shrink-0 rounded-sm">
                <category.icon className="h-8 w-8 text-zinc-400" />
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="font-medium truncate text-white text-base">
                  {category.name}
                </span>
                <span className="text-zinc-400 text-sm truncate">
                  Playlist • Jacen Salvador
                </span>
              </div>
            </div>
          ))}
          
          {/* Add some fake items to make it look fuller if needed */}
           <div className="flex items-center gap-3 p-2 hover:bg-[#2a2a2a] rounded-md cursor-pointer opacity-50">
              <div className="h-16 w-16 bg-[#282828] flex items-center justify-center flex-shrink-0 rounded-full">
                <Plus className="h-8 w-8 text-zinc-400" />
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="font-medium truncate text-white text-base">
                  Add Artists
                </span>
              </div>
            </div>

        </div>
      </ScrollArea>
    </div>
  );
}

