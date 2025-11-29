import { Home, Library, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  currentTab: "home" | "library" | "profile";
  onTabChange: (tab: "home" | "library" | "profile") => void;
}

export function MobileNav({ currentTab, onTabChange }: MobileNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[80px] bg-black/95 backdrop-blur-md border-t border-zinc-800 z-50 pb-4 md:hidden">
      <div className="flex items-center justify-around h-full px-4">
        <button
          onClick={() => onTabChange("home")}
          className="flex flex-col items-center gap-1 min-w-[64px]"
        >
          <Home
            className={cn(
              "h-6 w-6",
              currentTab === "home" ? "text-white" : "text-zinc-400"
            )}
          />
          <span
            className={cn(
              "text-[10px] font-medium",
              currentTab === "home" ? "text-white" : "text-zinc-400"
            )}
          >
            Home
          </span>
        </button>
        <button
          onClick={() => onTabChange("library")}
          className="flex flex-col items-center gap-1 min-w-[64px]"
        >
          <Library
            className={cn(
              "h-6 w-6",
              currentTab === "library" ? "text-white" : "text-zinc-400"
            )}
          />
          <span
            className={cn(
              "text-[10px] font-medium",
              currentTab === "library" ? "text-white" : "text-zinc-400"
            )}
          >
            Your Library
          </span>
        </button>
        <button
          onClick={() => onTabChange("profile")}
          className="flex flex-col items-center gap-1 min-w-[64px]"
        >
          <User
            className={cn(
              "h-6 w-6",
              currentTab === "profile" ? "text-white" : "text-zinc-400"
            )}
          />
          <span
            className={cn(
              "text-[10px] font-medium",
              currentTab === "profile" ? "text-white" : "text-zinc-400"
            )}
          >
            Profile
          </span>
        </button>
      </div>
    </div>
  );
}

