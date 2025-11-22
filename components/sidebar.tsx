import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Category } from "@/lib/data"
import { Library } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[]
  selectedCategoryId: string
  onSelectCategory: (id: string) => void
}

export function Sidebar({ className, categories, selectedCategoryId, onSelectCategory }: SidebarProps) {
  const projectCategories = categories.filter(c => c.type === 'projects')

  return (
    <div className={cn("pb-12 h-full", className)}>
      <div className="space-y-4 py-4 h-full flex flex-col">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button 
                 variant={selectedCategoryId === "projects" ? "secondary" : "ghost"} // Assuming first category is projects
                 className="w-full justify-start"
                 onClick={() => onSelectCategory(projectCategories[0]?.id)}
            >
                <Library className="mr-2 h-4 w-4" />
                My Projects
            </Button>
            {/* Add more mocked discovery items if needed */}
          </div>
        </div>
        <div className="py-2 flex-1 flex flex-col">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea className="flex-1 px-1">
            <div className="space-y-1 p-2">
               <Button variant="ghost" className="w-full justify-start font-normal text-muted-foreground">
                  <Library className="mr-2 h-4 w-4" />
                  Liked Songs
               </Button>
               {projectCategories.map((category) => (
                 <Button
                   key={category.id}
                   variant={selectedCategoryId === category.id ? "secondary" : "ghost"}
                   className="w-full justify-start font-normal"
                   onClick={() => onSelectCategory(category.id)}
                 >
                   <span className="truncate">{category.name}</span>
                 </Button>
               ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
