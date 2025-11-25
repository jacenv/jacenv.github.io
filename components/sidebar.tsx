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
        <div className="px-4 py-2 bg-[#121212] rounded-lg mb-2 mx-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-bold hover:text-white hover:bg-transparent px-2 text-base transition-colors duration-200",
                selectedCategoryId === "home" ? "text-white" : "text-zinc-400"
              )}
              onClick={() => onSelectCategory("home")}
            >
              <svg
                role="img"
                height="24"
                width="24"
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mr-4 fill-current"
              >
                <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
              </svg>
              Home
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-bold text-zinc-400 hover:text-white hover:bg-transparent px-2 text-base transition-colors duration-200"
            >
              <svg
                role="img"
                height="24"
                width="24"
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mr-4 fill-current"
              >
                <path d="M10.533 1.27893C5.35215 3.2056 1.28974 7.31507 1.00514 12.9536L1.00297 13H1C1 19.0751 5.92487 24 12 24C18.0751 24 23 19.0751 23 13H22.997C22.7124 7.31507 18.65 3.2056 13.4691 1.27893L12 0.72833L10.533 1.27893ZM2.99999 15C3.00266 9.36518 6.36271 4.70522 11.6354 2.75165C11.7532 2.70799 11.8766 2.68603 12 2.68603C12.1234 2.68603 12.2468 2.70799 12.3646 2.75165C17.6373 4.70522 20.9973 9.36518 21 15H15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15H2.99999Z"></path>
              </svg>
              Search
            </Button>
          </div>
        </div>
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
                className="w-full justify-start text-left font-normal text-zinc-400 hover:text-white hover:bg-[#1a1a1a] h-16 px-2"
                onClick={() =>
                  window.open(
                    "https://open.spotify.com/user/faexty?si=c063df1d3f2d4075",
                    "_blank"
                  )
                }
              >
                <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-md mr-3 flex items-center justify-center flex-shrink-0">
                  <Library className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-white font-medium truncate w-full">
                    Liked Songs
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center">
                    <span className="text-green-500 -rotate-45 mr-1">📌</span>{" "}
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
                  <div className="h-12 w-12 bg-[#282828] rounded-md mr-3 flex items-center justify-center flex-shrink-0">
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
