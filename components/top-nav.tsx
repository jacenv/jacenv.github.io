import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, User, Home, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TopNavProps {
  onNavigateToAbout: () => void
  onNavigateHome: () => void
}

export function TopNav({ onNavigateToAbout, onNavigateHome }: TopNavProps) {
  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-transparent px-6 py-4 transition-colors hover:bg-black/20">
      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
            <Button size="icon" className="rounded-full bg-black/40 text-white hover:bg-black/60 h-8 w-8" disabled>
            <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full bg-black/40 text-white hover:bg-black/60 h-8 w-8" disabled>
            <ChevronRight className="h-5 w-5" />
            </Button>
        </div>
        
        <Button 
            size="icon" 
            className="rounded-full bg-[#1f1f1f] text-white hover:scale-105 transition-transform h-12 w-12 flex-shrink-0"
            onClick={onNavigateHome}
        >
            <Home className="h-6 w-6" />
        </Button>

        <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-white pointer-events-none" />
            <input 
                type="text"
                placeholder="What do you want to play?" 
                className="pl-10 pr-4 h-12 rounded-full bg-[#1f1f1f] border-0 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/20 w-[300px] hover:bg-[#2a2a2a] transition-colors font-medium truncate" 
            />
       </div>

      </div>
      <div className="flex items-center gap-4">
        {/* Premium/Explore buttons could go here */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="bg-zinc-800 text-white">JS</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Jacen Salvador</p>
                <p className="text-xs leading-none text-muted-foreground">
                  View Profile
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onNavigateToAbout}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
               Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

