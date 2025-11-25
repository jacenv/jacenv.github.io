import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TopNav } from "@/components/top-nav"
import { cn } from "@/lib/utils"
import { Category, Project } from "@/lib/data"
import { Play, Pause } from "lucide-react"

interface HomeContentProps {
  playlists: Category[]
  projects: Project[]
  onSelectCategory: (id: string) => void
  onNavigateToAbout: () => void
  onPlay: (project: Project, queue?: Project[]) => void
  currentProject: Project | null
  isPlaying: boolean
}

export function HomeContent({ 
    playlists, 
    projects, 
    onSelectCategory, 
    onNavigateToAbout,
    onPlay,
    currentProject,
    isPlaying
}: HomeContentProps) {
  
  const sidebarPlaylists = playlists.filter(c => c.type === 'playlist')
  const currentHour = new Date().getHours()
  let greeting = "Good evening"
  if (currentHour < 12) greeting = "Good morning"
  else if (currentHour < 18) greeting = "Good afternoon"

  return (
    <div className="h-full relative bg-[#121212] rounded-lg overflow-hidden ml-2 my-2 mr-2 flex flex-col">
      {/* Top Navigation - Absolute to overlay content */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <TopNav onNavigateToAbout={onNavigateToAbout} />
      </div>
      
      <ScrollArea className="h-full w-full bg-[#121212]">
        <div className="flex flex-col min-h-full pb-20 bg-gradient-to-b from-[#222222] to-[#121212]">
            
            {/* Pills Section (Mocked) */}
            <div className="mt-20 px-6 flex gap-2 mb-6 sticky top-0 z-10">
                <Badge className="bg-white text-black hover:bg-zinc-200 cursor-pointer px-3 py-1.5 text-sm font-medium rounded-full border-0">All</Badge>
                <Badge className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] cursor-pointer px-3 py-1.5 text-sm font-medium rounded-full border-0">Music</Badge>
                <Badge className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] cursor-pointer px-3 py-1.5 text-sm font-medium rounded-full border-0">Podcasts</Badge>
            </div>

            {/* Recent Grid Section */}
            <div className="px-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {sidebarPlaylists.slice(0, 8).map((playlist) => (
                        <div 
                            key={playlist.id}
                            className="group flex items-center bg-[#2a2a2a]/60 hover:bg-[#2a2a2a] transition-colors rounded-md overflow-hidden cursor-pointer h-[64px] pr-4 relative"
                            onClick={() => onSelectCategory(playlist.id)}
                        >
                            <div className={`h-full w-[64px] flex items-center justify-center flex-shrink-0 shadow-lg bg-gradient-to-br ${
                                playlist.id === 'skills' ? 'from-purple-600 to-blue-600' :
                                playlist.id === 'contact' ? 'from-green-600 to-teal-600' :
                                playlist.id === 'interests' ? 'from-orange-600 to-red-600' :
                                'from-blue-600 to-purple-700'
                            }`}>
                                <playlist.icon className="h-8 w-8 text-white" />
                            </div>
                            <span className="font-bold text-white ml-4 truncate">{playlist.name}</span>
                            
                            {/* Play button on hover */}
                            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl rounded-full bg-green-500 p-3 hover:scale-105">
                                <Play className="h-5 w-5 fill-black text-black pl-0.5" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* "Made for Viewers" Section */}
            <div className="px-6 mb-8">
                <div className="flex items-end justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">Made for Viewers</h2>
                    <span className="text-xs text-zinc-400 font-bold hover:underline cursor-pointer uppercase tracking-widest">Show all</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            className="group bg-[#181818] hover:bg-[#282828] transition-colors p-4 rounded-md cursor-pointer flex flex-col gap-3 relative"
                            onClick={() => onPlay(project, projects)}
                        >
                            <div className="relative aspect-square w-full bg-zinc-800 rounded-md overflow-hidden shadow-lg mb-1">
                                {/* Placeholder image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                                     <span className="text-zinc-500 font-bold text-4xl">{project.title.charAt(0)}</span>
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
                            <div className="flex flex-col gap-1 min-h-[60px]">
                                <strong className="text-white font-bold truncate">{project.title}</strong>
                                <p className="text-zinc-400 text-sm line-clamp-2 leading-tight">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* "Your Top Mixes" Section (Mocked with Skills/Interests) */}
            <div className="px-6 mb-8">
                <div className="flex items-end justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">Your Top Mixes</h2>
                    <span className="text-xs text-zinc-400 font-bold hover:underline cursor-pointer uppercase tracking-widest">Show all</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                     {/* Reuse playlists as mixes */}
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
                                 <strong className="text-white font-bold truncate">{playlist.name}</strong>
                                 <p className="text-zinc-400 text-sm line-clamp-2 leading-tight">
                                     {playlist.description || "Jacen Salvador"}
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
