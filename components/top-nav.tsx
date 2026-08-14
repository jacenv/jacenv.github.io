import { Button } from "@/components/ui/button"
import { ArrowUpRight, Download, Home, User } from "lucide-react"

interface TopNavProps {
  onNavigateToAbout: () => void
  onNavigateHome: () => void
}

export function TopNav({ onNavigateToAbout, onNavigateHome }: TopNavProps) {
  return (
    <nav className="flex h-16 min-h-16 w-full items-center justify-between border-b border-white/5 bg-black px-4" aria-label="Primary navigation">
      <button type="button" onClick={onNavigateHome} className="group flex items-center gap-3 text-left">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1ed760] text-sm font-black tracking-tight text-black transition-transform group-hover:scale-105">
          JS
        </span>
        <span className="hidden sm:block">
          <span className="block text-sm font-bold leading-none text-white">Jacen Salvador</span>
          <span className="mt-1 block text-xs text-zinc-500">Software engineer</span>
        </span>
      </button>

      <div className="flex items-center gap-1">
        <Button variant="ghost" className="rounded-full text-zinc-300 hover:bg-white/8 hover:text-white" onClick={onNavigateHome}>
          <Home className="mr-2 h-4 w-4" />
          Overview
        </Button>
        <Button variant="ghost" className="rounded-full text-zinc-300 hover:bg-white/8 hover:text-white" onClick={onNavigateToAbout}>
          <User className="mr-2 h-4 w-4" />
          About
        </Button>
        <Button asChild variant="ghost" className="hidden rounded-full text-zinc-300 hover:bg-white/8 hover:text-white lg:flex">
          <a href="https://github.com/jacenv" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button asChild className="ml-1 rounded-full bg-white px-4 font-bold text-black hover:bg-zinc-200">
          <a href="/jacen-resume.pdf" target="_blank" rel="noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Resume
          </a>
        </Button>
      </div>
    </nav>
  )
}
