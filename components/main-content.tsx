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
  onPlay: (project: Project, queue?: Project[]) => void
  onNavigateToAbout: () => void
}

export function MainContent({ category, currentProject, isPlaying, onPlay, onNavigateToAbout }: MainContentProps) {
  // Helper to determine headers based on category type or ID
  const getHeaders = () => {
     if (category.id === 'skills') return ['Category', 'Skills', 'Proficiency']
     if (category.id === 'contact') return ['Method', 'Details', 'Type']
     if (category.id === 'interests') return ['Interest', 'Description', 'Type']
     return ['Title', 'Tech Stack', 'Date']
  }
  
  const headers = getHeaders()

  const handlePlay = (project: Project) => {
      onPlay(project, category.projects);
  }

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
                     <div className={`absolute inset-0 bg-gradient-to-br ${
                         category.id === 'skills' ? 'from-purple-600 to-blue-600' :
                         category.id === 'contact' ? 'from-green-600 to-teal-600' :
                         category.id === 'interests' ? 'from-orange-600 to-red-600' :
                         'from-blue-600 to-purple-700'
                     } shadow-lg`}></div>
                     <category.icon className="h-24 w-24 text-white relative z-10" />
                </div>
                <div className="flex flex-col gap-2 pb-2">
                <span className="text-sm font-medium uppercase tracking-wider text-white">
                    {category.type === "playlist" ? "Playlist" : "Profile"}
                </span>
                <h1 className="text-5xl font-black tracking-tight lg:text-8xl text-white">
                    {category.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-300 font-medium mt-4">
                    <div className="h-6 w-6 rounded-full bg-zinc-500"></div>
                    <span className="font-bold text-white hover:underline cursor-pointer">Jacen Salvador</span>
                    <span>•</span>
                    <span className="text-white/70">{category.type === "playlist" ? `${category.projects?.length || 0} items` : "1 person"}</span>
                </div>
                </div>
            </div>

            {/* Background gradient continuation */}
            <div className="bg-gradient-to-b from-[#121212]/20 to-[#121212] relative z-10">

                {/* Actions Bar */}
                <div className="flex items-center gap-8 px-6 py-6">
                {category.type === 'playlist' && (
                    <Button 
                        size="icon" 
                        className="h-14 w-14 rounded-full shadow-lg bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 transition-all text-black border-0"
                        onClick={() => category.projects && category.projects.length > 0 && handlePlay(category.projects[0])}
                    >
                    {isPlaying && category.projects?.some(p => p.id === currentProject?.id) ? (
                            <Pause className="h-6 w-6 fill-black stroke-black" />
                    ) : (
                            <Play className="h-6 w-6 fill-black stroke-black pl-1" />
                    )}
                    </Button>
                )}
                </div>

                {/* Content Section */}
                <div className="px-6">
                    {category.type === "playlist" && category.projects ? (
                    <div className="pb-10">
                        <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(50px,1fr)] gap-4 border-b border-white/10 px-4 py-2 text-sm font-medium text-zinc-400 sticky top-[64px] bg-[#121212] z-10 mb-4">
                        <div className="text-center">#</div>
                        <div>{headers[0]}</div>
                        <div>{headers[1]}</div>
                        <div>{headers[2]}</div>
                        <div className="flex justify-end pr-4"><Clock className="h-4 w-4" /></div>
                        </div>
                        <div className="space-y-2">
                        {category.projects.map((project, i) => (
                            <div
                            key={project.id}
                            className="group grid grid-cols-[16px_4fr_3fr_2fr_minmax(50px,1fr)] gap-4 rounded-md px-4 py-2 text-sm transition-colors hover:bg-white/10 items-center relative"
                            onDoubleClick={() => handlePlay(project)}
                            >
                            <div className="font-medium text-zinc-400 group-hover:text-white w-4 flex justify-center">
                                <span className={cn("group-hover:hidden", currentProject?.id === project.id && isPlaying && "text-green-500")}>{i + 1}</span>
                                <Button
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-6 w-6 hidden group-hover:flex p-0 hover:bg-transparent text-white"
                                    onClick={() => handlePlay(project)}
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
                                    {/* For non-projects, show description as artist name basically */}
                                    {category.id === 'projects' ? 'Jacen Salvador' : project.description}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1 items-center">
                                {project.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="rounded-sm text-[10px] bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                                    {tag}
                                </Badge>
                                ))}
                                {project.tags.length > 3 && (
                                <span className="text-[10px] text-zinc-400">+{project.tags.length - 3}</span>
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
                        {/* Render About Me page */}
                        {category.id === 'about' && category.content && (() => {
                          const aboutData = JSON.parse(category.content);
                          return (
                            <div className="max-w-4xl space-y-12">
                              {/* Bio Section */}
                              <section>
                                <h2 className="text-3xl font-bold mb-4">Bio</h2>
                                <p className="text-lg leading-relaxed text-zinc-300">
                                  {aboutData.bio}
                                </p>
                              </section>

                              {/* Education Section */}
                              <section>
                                <h2 className="text-3xl font-bold mb-4">Education</h2>
                                <div className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="text-xl font-bold mb-2">{aboutData.education.school}</h3>
                                      <p className="text-zinc-300">{aboutData.education.degree}</p>
                                    </div>
                                    <span className="text-zinc-400">{aboutData.education.year}</span>
                                  </div>
                                </div>
                              </section>

                              {/* Experience Section */}
                              <section>
                                <h2 className="text-3xl font-bold mb-4">Experience</h2>
                                <div className="space-y-4">
                                  {aboutData.experience.map((exp: any, idx: number) => (
                                    <div key={idx} className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
                                      <div className="flex justify-between items-start mb-3">
                                        <div>
                                          <h3 className="text-xl font-bold">{exp.role}</h3>
                                          <p className="text-[#1ed760] font-medium">{exp.company}</p>
                                        </div>
                                        <span className="text-zinc-400">{exp.duration}</span>
                                      </div>
                                      <p className="text-zinc-300">{exp.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </section>

                              {/* Let's Connect Section */}
                              <section>
                                <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
                                <p className="text-lg text-zinc-300 mb-6">{aboutData.cta}</p>
                                <div className="flex gap-4">
                                  <a href="mailto:jacenvsalvador@gmail.com">
                                    <Button className="bg-[#1ed760] hover:bg-[#16be53] text-black font-semibold px-8">
                                      Email Me
                                    </Button>
                                  </a>
                                  <a href="https://linkedin.com/in/jacensalvador" target="_blank" rel="noreferrer">
                                    <Button variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white font-semibold px-8">
                                      LinkedIn
                                    </Button>
                                  </a>
                                  <Button variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white font-semibold px-8">
                                    Resume
                                  </Button>
                                </div>
                              </section>
                            </div>
                          );
                        })()}
                    </div>
                    )}
                </div>
            </div>
        </div>
      </ScrollArea>
    </div>
  )
}
