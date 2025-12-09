import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, User, Home, Search, Bell, Users } from "lucide-react"
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
    <div className="flex w-full items-center justify-between bg-black px-4 py-2 h-[64px] min-h-[64px]">
      <div className="flex gap-2 items-center flex-1">
        <div className="flex gap-2 mr-2">
            <Button size="icon" className="rounded-full bg-black text-zinc-400 hover:text-white h-8 w-8" disabled>
            <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button size="icon" className="rounded-full bg-black text-zinc-400 hover:text-white h-8 w-8" disabled>
            <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
        
        <Button 
            size="icon" 
            className="rounded-full bg-[#1f1f1f] text-white hover:scale-105 transition-transform h-12 w-12 flex-shrink-0"
            onClick={onNavigateHome}
        >
            <Home className="h-6 w-6" />
        </Button>

        <div className="relative group flex-1 max-w-[480px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-white pointer-events-none" />
            <input 
                type="text"
                placeholder="What do you want to play?" 
                className="pl-10 pr-12 h-12 rounded-full bg-[#1f1f1f] border-0 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/20 w-full hover:bg-[#2a2a2a] transition-colors font-medium truncate" 
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 border-l border-zinc-600 pl-3 h-6 flex items-center">
                 <Library className="h-5 w-5 text-zinc-400 hover:text-white cursor-pointer" />
            </div>
       </div>

      </div>
      <div className="flex items-center gap-4">
        <Button size="icon" variant="ghost" className="text-zinc-400 hover:text-white hover:bg-transparent">
             <Bell className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost" className="text-zinc-400 hover:text-white hover:bg-transparent">
             <Users className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:scale-105 transition-transform">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="bg-[#1f1f1f] text-white font-bold">JS</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#282828] border-black text-white" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Jacen Salvador</p>
                <p className="text-xs leading-none text-zinc-400">
                  View Profile
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700" />
            <DropdownMenuItem onClick={onNavigateToAbout} className="focus:bg-zinc-700 focus:text-white cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-zinc-700 focus:text-white cursor-pointer">
               Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function Library(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="m16 6 4 14" />
        <path d="M12 6v14" />
        <path d="M8 8v12" />
        <path d="M4 4v16" />
        </svg>
    )
}

