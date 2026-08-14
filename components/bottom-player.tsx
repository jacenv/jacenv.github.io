import { Project } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Mail, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomPlayerProps {
  project: Project | null
  isPlaying: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  onShuffle: () => void
  onRepeat: () => void
  isShuffling: boolean
  repeatMode: "off" | "all" | "one"
}

export function BottomPlayer(props: BottomPlayerProps) {
  const { project, isPlaying, onPlayPause } = props

  if (!project) return null

  const isStatus = project.id === "status-1"
  const hasExternalLink = Boolean(project.link && !project.link.startsWith("mailto:"))

  return (
    <>
      <div className="fixed bottom-[calc(80px+env(safe-area-inset-bottom))] left-2 right-2 z-50 flex h-14 items-center gap-3 rounded-xl border border-white/10 bg-[#202020]/95 px-3 shadow-2xl backdrop-blur-xl md:hidden">
        <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", isStatus ? "bg-[#1ed760]" : "bg-sky-400")} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-zinc-500">{isStatus ? "Currently building" : "Selected project"}</p>
          <p className="truncate text-sm font-bold text-white">{project.title}</p>
        </div>
        {!isStatus && (
          <button type="button" onClick={onPlayPause} aria-label={isPlaying ? "Pause project preview" : "Play project preview"} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
          </button>
        )}
      </div>

      <div className="relative z-50 hidden h-[74px] w-full items-center justify-between gap-6 border-t border-white/8 bg-black px-5 md:flex">
        <div className="flex min-w-0 items-center gap-3">
          <span className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.06] text-sm font-black text-white",
            isStatus && "border-[#1ed760]/20 bg-[#1ed760]/10 text-[#63e58f]",
          )}>
            {isStatus ? <span className="h-2.5 w-2.5 rounded-full bg-[#1ed760] shadow-[0_0_12px_rgba(30,215,96,0.8)]" /> : project.title.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-500">{isStatus ? "Currently building" : "Selected project"}</p>
            <p className="truncate text-sm font-bold text-white">{project.title}</p>
          </div>
        </div>

        <p className="hidden max-w-xl truncate text-sm text-zinc-400 lg:block">{project.description}</p>

        <div className="flex shrink-0 items-center gap-2">
          {!isStatus && (
            <Button size="icon" variant="ghost" onClick={onPlayPause} aria-label={isPlaying ? "Pause project preview" : "Play project preview"} className="rounded-full text-zinc-300 hover:bg-white/10 hover:text-white">
              {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
            </Button>
          )}
          {hasExternalLink ? (
            <Button asChild className="rounded-full bg-white px-4 font-bold text-black hover:bg-zinc-200">
              <a href={project.link} target="_blank" rel="noreferrer">
                Open project <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ) : (
            <Button asChild variant="outline" className="rounded-full border-white/15 bg-white/5 px-4 font-semibold text-white hover:bg-white/10 hover:text-white">
              <a href="mailto:jacenvsalvador@gmail.com">
                <Mail className="mr-2 h-4 w-4" /> Get in touch
              </a>
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
