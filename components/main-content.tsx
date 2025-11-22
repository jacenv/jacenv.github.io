import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink, Pause, Clock } from "lucide-react"
import { Category, Project } from "@/lib/data"
import { TopNav } from "@/components/top-nav"
import { cn } from "@/lib/utils"

interface MainContentProps {
  category: Category
  currentProject: Project | null
  isPlaying: boolean
  onPlay: (project: Project) => void
  onNavigateToAbout: () => void
}

export function MainContent({ category, currentProject, isPlaying, onPlay, onNavigateToAbout }: MainContentProps) {
  return (
    <div className="h-full relative bg-[#121212] rounded-lg overflow-hidden ml-2 my-2 mr-2">
      {/* Top Navigation - Absolute to overlay content */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <TopNav onNavigateToAbout={onNavigateToAbout} />
      </div>
      
      <ScrollArea className="h-full w-full bg-[#121212]">
        <div className="flex flex-col min-h-full pb-20">
            {/* Header Section */}
            <div className="flex items-end gap-6 p-8 bg-gradient-to-b from-[#535353] to-[#121212] pt-[80px]">
                <div className="flex h-[232px] w-[232px] min-w-[232px] items-center justify-center shadow-2xl relative group">
                     {/* Using a colored div as a placeholder for album art */}
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 shadow-lg"></div>
                     <category.icon className="h-24 w-24 text-white relative z-10" />
                </div>
                <div className="flex flex-col gap-2 pb-2">
                <span className="text-sm font-medium uppercase tracking-wider text-white">
                    {category.type === "projects" ? "Playlist" : "Profile"}
                </span>
                <h1 className="text-5xl font-black tracking-tight lg:text-8xl text-white">
                    {category.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-300 font-medium mt-4">
                    <div className="h-6 w-6 rounded-full bg-zinc-500"></div>
                    <span className="font-bold text-white hover:underline cursor-pointer">Jacen Salvador</span>
                    <span>•</span>
                    <span className="text-white/70">{category.type === "projects" ? `${category.projects?.length} projects, 1 hr 15 min` : "1 person"}</span>
                </div>
                </div>
            </div>

            {/* Background gradient continuation */}
            <div className="bg-gradient-to-b from-[#121212]/20 to-[#121212] relative z-10">

                {/* Actions Bar */}
                <div className="flex items-center gap-8 px-6 py-6">
                    <Button 
                        size="icon" 
                        className="h-14 w-14 rounded-full shadow-lg bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 transition-all text-black border-0"
                        onClick={() => category.projects && category.projects.length > 0 && onPlay(category.projects[0])}
                    >
                    {isPlaying && category.projects?.some(p => p.id === currentProject?.id) ? (
                            <Pause className="h-6 w-6 fill-black stroke-black" />
                    ) : (
                            <Play className="h-6 w-6 fill-black stroke-black pl-1" />
                    )}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <svg role="img" height="32" width="32" viewBox="0 0 24 24" className="fill-current"><path d="M5.21 1.57a6.757 6.757 0 0 1 6.778 0 3.387 3.387 0 0 0 3.744 0 6.757 6.757 0 0 1 6.778 0A6.757 6.757 0 0 1 24 8.327a6.757 6.757 0 0 1-1.49 4.744 3.387 3.387 0 0 0 0 4.744 6.757 6.757 0 0 1 0 9.488 6.757 6.757 0 0 1-4.744 1.49 3.387 3.387 0 0 0-4.744 0 6.757 6.757 0 0 1-9.488 0 6.757 6.757 0 0 1-1.49-4.744 3.387 3.387 0 0 0 0-4.744 6.757 6.757 0 0 1 0-9.488A6.757 6.757 0 0 1 5.21 1.57z"></path><path d="M11.999 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0-4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0-4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                    </Button>
                </div>

                {/* Content Section */}
                <div className="px-6">
                    {category.type === "projects" && category.projects ? (
                    <div className="pb-10">
                        <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(50px,1fr)] gap-4 border-b border-white/10 px-4 py-2 text-sm font-medium text-zinc-400 sticky top-[64px] bg-[#121212] z-10 mb-4">
                        <div className="text-center">#</div>
                        <div>Title</div>
                        <div>Tech Stack</div>
                        <div>Date</div>
                        <div className="flex justify-end pr-4"><Clock className="h-4 w-4" /></div>
                        </div>
                        <div className="space-y-2">
                        {category.projects.map((project, i) => (
                            <div
                            key={project.id}
                            className="group grid grid-cols-[16px_4fr_3fr_2fr_minmax(50px,1fr)] gap-4 rounded-md px-4 py-2 text-sm transition-colors hover:bg-white/10 items-center relative"
                            onDoubleClick={() => onPlay(project)}
                            >
                            <div className="font-medium text-zinc-400 group-hover:text-white w-4 flex justify-center">
                                <span className={cn("group-hover:hidden", currentProject?.id === project.id && isPlaying && "text-green-500")}>{i + 1}</span>
                                <Button
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-6 w-6 hidden group-hover:flex p-0 hover:bg-transparent text-white"
                                    onClick={() => onPlay(project)}
                                >
                                    {currentProject?.id === project.id && isPlaying ? (
                                        <Pause className="h-4 w-4 fill-current" />
                                    ) : (
                                        <Play className="h-4 w-4 fill-current" />
                                    )}
                                </Button>
                            </div>
                            <div className="flex items-center gap-4 min-w-0">
                                {/* Small thumbnail */}
                                <div className="h-10 w-10 bg-zinc-800 rounded flex-shrink-0 flex items-center justify-center">
                                    <category.icon className="h-5 w-5 text-zinc-500" />
                                </div>
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className={cn("truncate font-medium text-base", currentProject?.id === project.id ? 'text-[#1ed760]' : 'text-white')}>{project.title}</span>
                                    <span className="truncate text-sm text-zinc-400 group-hover:text-white transition-colors cursor-pointer hover:underline">
                                    Jacen Salvador
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1 items-center">
                                {project.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="rounded-sm text-[10px] bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                                    {tag}
                                </Badge>
                                ))}
                                {project.tags.length > 2 && (
                                <span className="text-[10px] text-zinc-400">+{project.tags.length - 2}</span>
                                )}
                            </div>
                            <div className="text-zinc-400 text-sm">
                                {project.date}
                            </div>
                            <div className="flex justify-end pr-2">
                                {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <ExternalLink className="h-4 w-4 text-zinc-400 hover:text-white" />
                                </a>
                                )}
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    ) : (
                    <div className="pb-10 text-white">
                        <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-zinc-300">
                        <p>{category.content}</p>
                        
                        {/* Additional hardcoded about sections if needed */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold tracking-tight text-white">Experience</h3>
                            <p className="text-base text-zinc-400">
                            Building scalable applications and intuitive user interfaces. 
                            Always learning new technologies and best practices.
                            </p>
                        </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
      </ScrollArea>
    </div>
  )
}
