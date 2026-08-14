import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Category, Project } from "@/lib/data"
import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  GraduationCap,
  MapPin,
  Pause,
  Play,
  Smartphone,
} from "lucide-react"

const CARD_STYLES = [
  "from-violet-500/30 via-violet-500/5 to-transparent border-violet-400/20",
  "from-sky-500/30 via-sky-500/5 to-transparent border-sky-400/20",
  "from-amber-500/30 via-amber-500/5 to-transparent border-amber-400/20",
  "from-rose-500/30 via-rose-500/5 to-transparent border-rose-400/20",
  "from-emerald-500/30 via-emerald-500/5 to-transparent border-emerald-400/20",
]

interface HomeContentProps {
  playlists: Category[]
  projects: Project[]
  onSelectCategory: (id: string) => void
  onNavigateToAbout: () => void
  onNavigateHome: () => void
  onPlay: (project: Project, queue?: Project[]) => void
  currentProject: Project | null
  isPlaying: boolean
}

export function HomeContent({
  playlists,
  projects,
  onSelectCategory,
  onNavigateToAbout,
  onNavigateHome,
  onPlay,
  currentProject,
  isPlaying,
}: HomeContentProps) {
  const sidebarPlaylists = playlists.filter((category) => category.type === "playlist")

  return (
    <div className="relative m-2 ml-2 flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-[#101010]">
      <ScrollArea className="h-full w-full bg-[#101010]">
        <div className="min-h-full bg-[radial-gradient(circle_at_80%_0%,rgba(30,215,96,0.16),transparent_30%),linear-gradient(to_bottom,#202020_0%,#101010_34%)] pb-24">
          <div className="sticky top-0 z-20 flex items-center gap-2 border-b border-white/5 bg-[#101010]/85 px-5 py-3 backdrop-blur-xl md:px-8">
            <Badge
              className="cursor-pointer rounded-full border-0 bg-white px-3 py-1.5 text-sm font-semibold text-black hover:bg-zinc-200"
              onClick={onNavigateHome}
            >
              Overview
            </Badge>
            <Badge
              className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-200 hover:bg-white/10"
              onClick={() => onSelectCategory("projects")}
            >
              Work
            </Badge>
            <Badge
              className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-200 hover:bg-white/10"
              onClick={onNavigateToAbout}
            >
              Experience
            </Badge>
          </div>

          <header className="px-5 pb-12 pt-12 md:px-8 md:pb-16 md:pt-16 lg:px-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1ed760]/25 bg-[#1ed760]/10 px-3 py-1.5 text-sm font-medium text-[#63e58f]">
              <span className="h-2 w-2 rounded-full bg-[#1ed760] shadow-[0_0_14px_rgba(30,215,96,0.8)]" />
              Building at mthdstudios
            </div>
            <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              I build AI-powered products that hold up in production.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              I&apos;m Jacen Salvador, a full-stack software engineer in San Diego. I ship consumer
              iOS apps and production websites from architecture through release.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="h-11 rounded-full bg-[#1ed760] px-6 font-bold text-black hover:bg-[#35e06f]"
                onClick={() => onSelectCategory("projects")}
              >
                Explore selected work
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <a href="/jacen-resume.pdf" target="_blank" rel="noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>

            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/8 bg-black/20 p-4 backdrop-blur-sm">
                <Smartphone className="mb-3 h-5 w-5 text-[#1ed760]" />
                <p className="text-2xl font-bold text-white">2</p>
                <p className="mt-1 text-sm text-zinc-400">consumer iOS apps shipped</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-black/20 p-4 backdrop-blur-sm">
                <GraduationCap className="mb-3 h-5 w-5 text-[#1ed760]" />
                <p className="text-2xl font-bold text-white">SDSU &apos;26</p>
                <p className="mt-1 text-sm text-zinc-400">B.S. in Computer Science</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-black/20 p-4 backdrop-blur-sm">
                <MapPin className="mb-3 h-5 w-5 text-[#1ed760]" />
                <p className="text-2xl font-bold text-white">San Diego</p>
                <p className="mt-1 text-sm text-zinc-400">California, Pacific time</p>
              </div>
            </div>
          </header>

          <section className="px-5 md:px-8 lg:px-12">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#63e58f]">Selected work</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Products built to ship</h2>
              </div>
              <button
                type="button"
                onClick={() => onSelectCategory("projects")}
                className="hidden text-sm font-semibold text-zinc-400 transition-colors hover:text-white sm:block"
              >
                View all work
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => {
                const isCurrent = currentProject?.id === project.id
                return (
                  <article
                    key={project.id}
                    className={cn(
                      "group relative flex min-h-64 cursor-pointer flex-col overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]",
                      CARD_STYLES[index % CARD_STYLES.length],
                    )}
                    onClick={() => onPlay(project, projects)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-lg font-black text-white shadow-lg">
                        {project.title.charAt(0)}
                      </div>
                      <button
                        type="button"
                        aria-label={`${isCurrent && isPlaying ? "Pause" : "Preview"} ${project.title}`}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full bg-[#1ed760] text-black shadow-lg transition duration-200 group-hover:scale-105",
                          !isCurrent && "opacity-0 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100",
                        )}
                      >
                        {isCurrent && isPlaying ? (
                          <Pause className="h-4 w-4 fill-current" />
                        ) : (
                          <Play className="ml-0.5 h-4 w-4 fill-current" />
                        )}
                      </button>
                    </div>
                    <div className="mt-auto pt-10">
                      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#1ed760]" />
                        {project.date}
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-white">{project.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="rounded-full border border-white/8 bg-black/25 px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#63e58f] transition-colors hover:text-[#8cf1ad]"
                        >
                          {project.link.includes("apps.apple.com") ? "View on the App Store" : "Visit project"}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="px-5 pb-4 pt-16 md:px-8 lg:px-12">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">More about me</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Explore the portfolio</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {sidebarPlaylists.map((playlist) => (
                <button
                  type="button"
                  key={`${playlist.id}-mix`}
                  className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.035] p-4 text-left transition hover:border-white/15 hover:bg-white/[0.07]"
                  onClick={() => onSelectCategory(playlist.id)}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8">
                    <playlist.icon className="h-5 w-5 text-zinc-300" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-sm font-semibold text-white">{playlist.name}</strong>
                    <p className="mt-1 truncate text-xs text-zinc-500">{playlist.description}</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-zinc-600 transition group-hover:text-white" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  )
}
