import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink, Pause } from "lucide-react"
import { Category, Project } from "@/lib/data"
import { TopNav } from "@/components/top-nav"

interface MainContentProps {
  category: Category
  currentProject: Project | null
  isPlaying: boolean
  onPlay: (project: Project) => void
  onNavigateToAbout: () => void
}

export function MainContent({ category, currentProject, isPlaying, onPlay, onNavigateToAbout }: MainContentProps) {
  return (
    <div className="h-full relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Navigation - Absolute to overlay content */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <TopNav onNavigateToAbout={onNavigateToAbout} />
      </div>
      
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col min-h-full pb-20">
            {/* Header Section */}
            <div className="flex items-end gap-6 p-8 bg-gradient-to-b from-zinc-200/50 to-background dark:from-zinc-800/50 pt-[80px]">
                <div className="flex h-32 w-32 min-w-[128px] items-center justify-center rounded-md bg-primary shadow-2xl">
                <category.icon className="h-16 w-16 text-primary-foreground" />
                </div>
                <div className="flex flex-col gap-2">
                <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {category.type === "projects" ? "Playlist" : "Profile"}
                </span>
                <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
                    {category.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Jacen Salvador</span>
                    <span>•</span>
                    <span>{category.type === "projects" ? `${category.projects?.length} projects` : "1 person"}</span>
                </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-4 p-6">
                <Button 
                    size="icon" 
                    className="h-14 w-14 rounded-full shadow-md bg-green-500 hover:bg-green-400 text-black"
                    onClick={() => category.projects && category.projects.length > 0 && onPlay(category.projects[0])}
                >
                   {isPlaying && category.projects?.some(p => p.id === currentProject?.id) ? (
                        <Pause className="h-6 w-6 fill-current" />
                   ) : (
                        <Play className="h-6 w-6 fill-current pl-1" />
                   )}
                </Button>
            </div>

            {/* Content Section */}
            <div className="px-6">
                {category.type === "projects" && category.projects ? (
                <div className="pb-10">
                    <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(100px,1fr)] gap-4 border-b border-border/50 px-4 py-2 text-sm font-medium text-muted-foreground">
                    <div>#</div>
                    <div>Title</div>
                    <div>Tech Stack</div>
                    <div>Date</div>
                    <div className="text-right">Link</div>
                    </div>
                    <div className="mt-4 space-y-2">
                    {category.projects.map((project, i) => (
                        <div
                        key={project.id}
                        className="group grid grid-cols-[16px_4fr_3fr_2fr_minmax(100px,1fr)] gap-4 rounded-md px-4 py-2 text-sm transition-colors hover:bg-muted/50 items-center relative"
                        onDoubleClick={() => onPlay(project)}
                        >
                        <div className="font-medium text-muted-foreground group-hover:text-foreground w-4 flex justify-center">
                             <span className="group-hover:hidden">{i + 1}</span>
                             <Button
                                size="icon" 
                                variant="ghost" 
                                className="h-6 w-6 hidden group-hover:flex p-0 hover:bg-transparent hover:text-green-500"
                                onClick={() => onPlay(project)}
                             >
                                 {currentProject?.id === project.id && isPlaying ? (
                                     <Pause className="h-4 w-4 fill-current" />
                                 ) : (
                                     <Play className="h-4 w-4 fill-current" />
                                 )}
                             </Button>
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                            <span className={`truncate font-medium ${currentProject?.id === project.id ? 'text-green-500' : 'text-foreground'}`}>
                            {project.title}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                            {project.description}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-1 items-center">
                            {project.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="rounded-sm text-[10px]">
                                {tag}
                            </Badge>
                            ))}
                            {project.tags.length > 2 && (
                            <span className="text-[10px] text-muted-foreground">+{project.tags.length - 2}</span>
                            )}
                        </div>
                        <div className="text-muted-foreground">
                            {project.date}
                        </div>
                        <div className="flex justify-end">
                            {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </a>
                            )}
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                ) : (
                <div className="pb-10 text-foreground">
                    <div className="max-w-2xl space-y-6 text-lg leading-relaxed">
                    <p>{category.content}</p>
                    
                    {/* Additional hardcoded about sections if needed */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold tracking-tight">Experience</h3>
                        <p className="text-base text-muted-foreground">
                        Building scalable applications and intuitive user interfaces. 
                        Always learning new technologies and best practices.
                        </p>
                    </div>
                    </div>
                </div>
                )}
            </div>
        </div>
      </ScrollArea>
    </div>
  )
}
