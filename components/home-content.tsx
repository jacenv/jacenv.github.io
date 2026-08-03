import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Category, Project } from "@/lib/data"
import { Play, Pause } from "lucide-react"

// Distinct gradient per project so the placeholder tiles read as design
// rather than a missing screenshot.
const CARD_GRADIENTS = [
  "from-violet-600 to-indigo-800",
  "from-emerald-600 to-teal-800",
  "from-rose-600 to-pink-800",
  "from-sky-600 to-blue-800",
  "from-amber-600 to-orange-800",
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
    isPlaying
}: HomeContentProps) {
  
  const sidebarPlaylists = playlists.filter(c => c.type === 'playlist')
  return (
    <div className="h-full relative bg-[#121212] rounded-lg overflow-hidden ml-2 my-2 mr-2 flex flex-col">
      <ScrollArea className="h-full w-full bg-[#121212]">
        <div className="flex flex-col min-h-full pb-20 bg-gradient-to-b from-[#222222] to-[#121212]">
            
            {/* Portfolio filters */}
            <div className="sticky top-0 z-10 bg-[#121212]/95 backdrop-blur-sm px-6 py-4 mb-6 transition-colors duration-200">
                <div className="flex gap-2">
                    <Badge
                      className="bg-white text-black hover:bg-zinc-200 cursor-pointer px-3 py-1.5 text-sm font-medium rounded-full border-0"
                      onClick={onNavigateHome}
                    >
                      Overview
                    </Badge>
                    <Badge
                      className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] cursor-pointer px-3 py-1.5 text-sm font-medium rounded-full border-0"
                      onClick={() => onSelectCategory("projects")}
                    >
                      Projects
                    </Badge>
                    <Badge
                      className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] cursor-pointer px-3 py-1.5 text-sm font-medium rounded-full border-0"
                      onClick={onNavigateToAbout}
                    >
                      About
                    </Badge>
                </div>
            </div>

            {/* Intro — the landing view should say who this is before anything else */}
            <div className="px-6 pb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Portfolio
                </p>
                <h1 className="mt-3 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Jacen Salvador
                </h1>
                <p className="mt-4 text-lg font-medium text-white">
                    Full stack developer · San Diego, CA
                </p>
                <p className="mt-2 max-w-2xl leading-relaxed text-zinc-400">
                    Recent computer science grad from San Diego State, now building
                    mobile apps and websites at mthdstudios.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                        className="bg-[#1ed760] px-6 font-semibold text-black hover:bg-[#16be53]"
                        onClick={() => onSelectCategory("projects")}
                    >
                        View my work
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="border-white/30 px-6 font-semibold text-white hover:bg-white/10 hover:text-white"
                    >
                        <a href="mailto:jacenvsalvador@gmail.com">Email me</a>
                    </Button>
                    <Button
                        asChild
                        variant="ghost"
                        className="px-4 font-semibold text-zinc-300 hover:bg-white/10 hover:text-white"
                    >
                        <a
                            href="https://drive.google.com/file/d/1JbWO4PQmiTf-LC0DDzR0pUldCw9YNRxV/view?usp=sharing"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Resume
                        </a>
                    </Button>
                </div>
            </div>

            {/* Featured projects */}
            <div className="px-6 mb-8">
                <div className="flex items-end justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Featured projects</h2>
                    <button
                      type="button"
                      onClick={() => onSelectCategory("projects")}
                      className="text-xs text-zinc-400 font-bold hover:underline cursor-pointer uppercase tracking-widest"
                    >
                      View all projects
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {projects.map((project, i) => (
                        <div
                            key={project.id}
                            className="group bg-[#181818] hover:bg-[#282828] transition-colors p-4 rounded-md cursor-pointer flex flex-col gap-3 relative"
                            onClick={() => onPlay(project, projects)}
                        >
                            <div className="relative aspect-square w-full bg-zinc-800 rounded-md overflow-hidden shadow-lg mb-1">
                                {/* Placeholder tile until a real screenshot is dropped in */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-br flex items-center justify-center",
                                    CARD_GRADIENTS[i % CARD_GRADIENTS.length]
                                )}>
                                     <span className="text-white/90 font-black text-4xl">{project.title.charAt(0)}</span>
                                </div>
                                {/* Play button overlay */}
                                <div className={cn(
                                    "absolute bottom-2 right-2 transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-xl rounded-full bg-green-500 p-3 hover:scale-105 z-10",
                                    currentProject?.id === project.id && isPlaying && "opacity-100 translate-y-0"
                                )}>
                                    {currentProject?.id === project.id && isPlaying ? (
                                        <Pause className="h-6 w-6 fill-black text-black" />
                                    ) : (
                                        <Play className="h-6 w-6 fill-black text-black pl-1" />
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <strong className="text-white font-bold leading-snug">{project.title}</strong>
                                <p className="text-zinc-400 text-sm leading-snug">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[10px] font-normal text-zinc-300"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* More portfolio sections */}
            <div className="px-6 mb-8">
                <div className="flex items-end justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Explore more</h2>
                    <button
                      type="button"
                      onClick={onNavigateToAbout}
                      className="text-xs text-zinc-400 font-bold hover:underline cursor-pointer uppercase tracking-widest"
                    >
                      View my profile
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                     {/* Reuse sections as portfolio cards */}
                     {sidebarPlaylists.map((playlist) => (
                         <div 
                             key={playlist.id + "-mix"} 
                             className="group bg-[#181818] hover:bg-[#282828] transition-colors p-4 rounded-md cursor-pointer flex flex-col gap-3"
                             onClick={() => onSelectCategory(playlist.id)}
                         >
                             <div className="relative aspect-square w-full bg-zinc-800 rounded-md overflow-hidden shadow-lg mb-1">
                                <div className={`absolute inset-0 bg-gradient-to-br ${
                                    playlist.id === 'skills' ? 'from-purple-600 to-blue-600' :
                                    playlist.id === 'contact' ? 'from-green-600 to-teal-600' :
                                    playlist.id === 'interests' ? 'from-orange-600 to-red-600' :
                                    'from-blue-600 to-purple-700'
                                } flex items-center justify-center`}>
                                    <playlist.icon className="h-12 w-12 text-white" />
                                </div>
                             </div>
                             <div className="flex flex-col gap-1">
                                 <strong className="text-white font-bold leading-snug">{playlist.name}</strong>
                                 <p className="text-zinc-400 text-sm leading-snug">
                                     {playlist.description}
                                 </p>
                             </div>
                         </div>
                     ))}
                </div>
            </div>

        </div>
      </ScrollArea>
    </div>
  )
}
