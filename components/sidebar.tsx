import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Category, likedArtists } from "@/lib/data"
import { Heart, Library, Radio } from "lucide-react"

const categorySubtitles: Record<string, string> = {
  projects: "Products and client work",
  skills: "Tools and technologies",
  contact: "Start a conversation",
  interests: "Beyond engineering",
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[]
  selectedCategoryId: string
  onSelectCategory: (id: string) => void
}

export function Sidebar({
  className,
  categories,
  selectedCategoryId,
  onSelectCategory,
}: SidebarProps) {
  const sidebarPlaylists = categories.filter((category) => category.type === "playlist")

  return (
    <aside className={cn("h-full bg-black p-2 text-zinc-400", className)}>
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-[#101010]">
        <div className="border-b border-white/5 px-4 py-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Library className="h-5 w-5 text-[#1ed760]" />
            Portfolio library
          </div>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">A curated view of my work, capabilities, and interests.</p>
        </div>

        <ScrollArea className="min-h-0 flex-1 px-2 py-3">
          <div className="space-y-1">
            {sidebarPlaylists.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "h-auto w-full justify-start rounded-xl px-2 py-2.5 text-left font-normal text-zinc-400 hover:bg-white/[0.06] hover:text-white",
                  selectedCategoryId === category.id && "bg-white/[0.07] text-white",
                )}
                onClick={() => onSelectCategory(category.id)}
              >
                <span className={cn(
                  "mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]",
                  selectedCategoryId === category.id && "bg-[#1ed760] text-black",
                )}>
                  <category.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-white">{category.name}</span>
                  <span className="mt-1 block truncate text-xs text-zinc-500">{categorySubtitles[category.id]}</span>
                </span>
              </Button>
            ))}

            <div className="mx-2 my-3 h-px bg-white/5" />

            <Button
              variant="ghost"
              className={cn(
                "h-auto w-full justify-start rounded-xl px-2 py-2.5 text-left font-normal text-zinc-400 hover:bg-white/[0.06] hover:text-white",
                selectedCategoryId === "liked" && "bg-white/[0.07] text-white",
              )}
              onClick={() => onSelectCategory("liked")}
            >
              <span className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
                <Heart className="h-5 w-5 fill-current" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-white">Music I like</span>
                <span className="mt-1 flex items-center gap-1 truncate text-xs text-zinc-500">
                  <Radio className="h-3 w-3" /> {likedArtists.length} favorite artists
                </span>
              </span>
            </Button>
          </div>
        </ScrollArea>

        <div className="border-t border-white/5 p-4">
          <p className="text-xs font-medium text-zinc-500">Available for thoughtful product and engineering conversations.</p>
          <a href="mailto:jacenvsalvador@gmail.com" className="mt-2 inline-block text-sm font-semibold text-[#63e58f] hover:text-[#8cf1ad]">
            Get in touch ↗
          </a>
        </div>
      </div>
    </aside>
  )
}
