import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/lib/data";
import { Library, Plus, ArrowRight } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export function Sidebar({
  className,
  categories,
  selectedCategoryId,
  onSelectCategory,
}: SidebarProps) {
  // Filter out "About Me" because it's accessed via profile
  const sidebarPlaylists = categories.filter((c) => c.type === "playlist");

  return (
    <div className={cn("pb-12 h-full bg-[#121212] text-zinc-400", className)}>
      <div className="space-y-4 py-4 h-full flex flex-col">
        <div className="py-2 flex-1 flex flex-col bg-[#121212] rounded-lg mx-2">
          <div className="px-4 pt-4 flex items-center justify-between">
            <Button
              variant="ghost"
              className="justify-start text-left font-bold text-zinc-400 hover:text-white hover:bg-transparent pl-0 text-base group"
            >
              <Library className="mr-2 h-6 w-6 group-hover:text-white transition-colors" />
              Your Library
            </Button>
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-zinc-400 hover:text-white cursor-pointer transition-colors" />
              <ArrowRight className="h-5 w-5 text-zinc-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
            <span className="px-3 py-1 bg-[#2a2a2a] rounded-full text-sm text-white cursor-pointer hover:bg-[#3a3a3a] transition-colors whitespace-nowrap">
              Playlists
            </span>
            <span className="px-3 py-1 bg-[#2a2a2a] rounded-full text-sm text-white cursor-pointer hover:bg-[#3a3a3a] transition-colors whitespace-nowrap">
              Projects
            </span>
          </div>

          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 p-2">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-normal text-zinc-400 hover:text-white hover:bg-[#1a1a1a] h-16 px-2",
                  selectedCategoryId === "liked" && "bg-[#1a1a1a] text-white"
                )}
                onClick={() => onSelectCategory("liked")}
              >
                <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-md mr-2 flex items-center justify-center flex-shrink-0">
                  <Library className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-white font-medium truncate w-full">
                    Liked Songs
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center">
                    <span className="text-green-500 -rotate-45 mr-1">📍</span>{" "}
                    2,874 songs
                  </span>
                </div>
              </Button>
              {sidebarPlaylists.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left font-normal text-zinc-400 hover:text-white hover:bg-[#1a1a1a] h-16 px-2",
                    selectedCategoryId === category.id &&
                      "bg-[#1a1a1a] text-white"
                  )}
                  onClick={() => onSelectCategory(category.id)}
                >
                  <div className="h-12 w-12 bg-[#282828] rounded-md mr-2 flex items-center justify-center flex-shrink-0">
                    <category.icon className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="flex flex-col items-start overflow-hidden">
                    <span
                      className={cn(
                        "font-medium truncate w-full",
                        selectedCategoryId === category.id
                          ? "text-green-500"
                          : "text-white"
                      )}
                    >
                      {category.name}
                    </span>
                    <span className="text-xs text-zinc-400">
                      Jacen Salvador
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
