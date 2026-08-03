import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink, Pause } from "lucide-react"
import { Category, Project } from "@/lib/data"
import { cn } from "@/lib/utils"

type AboutExperience = {
  role: string
  company: string
  duration: string
  description: string
}

type AboutData = {
  bio: string
  education: {
    school: string
    degree: string
    year?: string
  }
  experience: AboutExperience[]
  cta: string
}

interface MainContentProps {
  category: Category
  currentProject: Project | null
  isPlaying: boolean
  onPlay: (project: Project, queue?: Project[]) => void
  onNavigateToProjects: () => void
}

export function MainContent({ category, currentProject, isPlaying, onPlay, onNavigateToProjects }: MainContentProps) {
  // Helper to determine headers based on category type or ID
  const getHeaders = () => {
     if (category.id === 'skills') return ['Category', 'Skills']
     if (category.id === 'contact') return ['Method', 'Details']
     if (category.id === 'interests') return ['Interest', 'About']
     return ['Project', 'Details']
  }

  const headers = getHeaders()
  const isAbout = category.id === "about"
  const isSkills = category.id === "skills"
  const isProjects = category.id === "projects"
  const isContact = category.id === "contact"

  const handlePlay = (project: Project) => {
      onPlay(project, category.projects);
  }

  return (
    <div className="h-full relative bg-[#121212] rounded-lg overflow-hidden ml-2 my-2 mr-2">
      <ScrollArea className="h-full w-full bg-[#121212]">
        <div className="flex flex-col min-h-full pb-20">
            {/* Header Section */}
            <div className="flex flex-col items-center text-center gap-4 p-6 pt-16 md:flex-row md:items-end md:text-left md:gap-6 md:p-8 md:pt-8 bg-gradient-to-b from-[#535353] to-[#121212]">
                <div className="flex h-44 w-44 md:h-[232px] md:w-[232px] md:min-w-[232px] items-center justify-center shadow-2xl relative group">
                     {/* Using a colored div as a placeholder for album art */}
                     <div className={`absolute inset-0 bg-gradient-to-br ${
                         category.id === 'skills' ? 'from-purple-600 to-blue-600' :
                         category.id === 'contact' ? 'from-green-600 to-teal-600' :
                         category.id === 'interests' ? 'from-orange-600 to-red-600' :
                         'from-blue-600 to-purple-700'
                     } shadow-lg`}></div>
                     <category.icon className="h-20 w-20 md:h-24 md:w-24 text-white relative z-10" />
                </div>
                <div className="flex flex-col items-center md:items-start md:mt-4 min-w-0">
                    <span className="text-sm font-medium uppercase tracking-wider text-white">
                        {isAbout ? "Profile" : "Portfolio section"}
                    </span>
                    <h1 className={cn(
                      "text-4xl font-black tracking-tight md:text-5xl text-white mt-2 break-words",
                      isAbout ? "lg:text-7xl max-w-3xl" : "lg:text-8xl"
                    )}>
                        {isAbout ? "Hi, I’m Jacen" : category.name}
                    </h1>
                    {isAbout ? (
                        <p className="max-w-2xl text-base md:text-lg leading-relaxed text-zinc-200 mt-4">
                          Full stack developer building mobile and web applications
                        </p>
                    ) : category.description && (
                        <p className="text-zinc-400 font-medium text-sm mt-4">{category.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-zinc-300 font-medium mt-4">
                    <div className="h-6 w-6 rounded-full bg-zinc-500"></div>
                    <span className="font-bold text-white hover:underline cursor-pointer">Jacen Salvador</span>
                    <span>•</span>
                    <span className="text-white/70">
                      {isAbout
                        ? "San Diego, CA"
                        : `${category.projects?.length || 0} ${category.id === "projects" ? "projects" : category.id === "skills" ? "skill groups" : category.id === "contact" ? "contact options" : "interests"}`}
                    </span>
                </div>
                {isAbout && (
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <Button
                      className="bg-[#1ed760] px-5 font-semibold text-black hover:bg-[#16be53]"
                      onClick={onNavigateToProjects}
                    >
                      View selected work
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/30 px-5 font-semibold text-white hover:bg-white/10 hover:text-white"
                    >
                      <a href="mailto:jacenvsalvador@gmail.com">Email me</a>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="px-3 font-semibold text-zinc-300 hover:bg-white/10 hover:text-white"
                    >
                      <a
                        href="https://drive.google.com/file/d/1JbWO4PQmiTf-LC0DDzR0pUldCw9YNRxV/view?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View resume
                      </a>
                    </Button>
                  </div>
                )}
                </div>
            </div>

            {/* Background gradient continuation */}
            <div className="bg-gradient-to-b from-[#121212]/20 to-[#121212] relative z-10">

                {/* Actions Bar */}
                <div className="flex items-center justify-end md:justify-start gap-8 px-4 md:px-6 py-4 md:py-6">
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
                <div className="px-4 md:px-6">
                    {category.type === "playlist" && category.projects ? (
                    /* One readable two-column layout for every section: label on the
                       left, full content on the right. Long lists wrap instead of
                       truncating, so nothing gets cut off with an ellipsis. */
                    <div className="pb-10">
                        <div className="hidden md:grid grid-cols-[220px_1fr] gap-6 border-b border-white/10 px-4 py-2 text-sm font-medium text-zinc-400 sticky top-[64px] bg-[#121212] z-10 mb-2">
                            <div>{headers[0]}</div>
                            <div>{headers[1]}</div>
                        </div>
                        <div className="divide-y divide-white/5">
                        {category.projects.map((project) => {
                            const hasLink = Boolean(project.link && project.link !== '#' && !project.link.startsWith('tel:'))
                            const isCurrent = currentProject?.id === project.id
                            return (
                            <div
                                key={project.id}
                                className={cn(
                                    "grid gap-3 md:grid-cols-[220px_1fr] md:gap-6 rounded-md px-2 md:px-4 py-4 transition-colors",
                                    isProjects && "cursor-pointer hover:bg-white/5"
                                )}
                                onClick={isProjects ? () => handlePlay(project) : undefined}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="h-9 w-9 bg-zinc-800 rounded flex-shrink-0 flex items-center justify-center">
                                        <category.icon className="h-4 w-4 text-zinc-500" />
                                    </div>
                                    <span className={cn("font-medium leading-tight", isCurrent ? "text-[#1ed760]" : "text-white")}>
                                        {project.title}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2 min-w-0">
                                    {isSkills ? (
                                        <div className="flex flex-wrap items-center gap-2">
                                            {project.description.split(",").map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="secondary"
                                                    className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-normal text-zinc-200 hover:bg-zinc-700"
                                                >
                                                    {skill.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-start justify-between gap-4">
                                                {isContact && hasLink ? (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-sm text-zinc-300 hover:text-white hover:underline break-all"
                                                    >
                                                        {project.description}
                                                    </a>
                                                ) : (
                                                    <p className="text-sm leading-relaxed text-zinc-300">{project.description}</p>
                                                )}
                                                {isProjects && (
                                                    <div className="flex items-center gap-3 flex-shrink-0">
                                                        <span className="text-sm text-zinc-400 whitespace-nowrap">{project.date}</span>
                                                        {hasLink && (
                                                            <a
                                                                href={project.link}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <ExternalLink className="h-4 w-4 text-zinc-400 hover:text-white" />
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            {isProjects && (
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="secondary"
                                                            className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-normal text-zinc-200 hover:bg-zinc-700"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            )
                        })}
                        </div>
                    </div>
                    ) : (
                    <div className="pb-10 text-white">
                        {/* Render About Me page */}
                        {category.id === 'about' && category.content && (() => {
                          const aboutData = JSON.parse(category.content) as AboutData;
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
                                  <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-start">
                                    <div>
                                      <h3 className="text-xl font-bold mb-2">{aboutData.education.school}</h3>
                                      <p className="text-zinc-300">{aboutData.education.degree}</p>
                                    </div>
                                    {aboutData.education.year && (
                                      <span className="text-zinc-400 md:whitespace-nowrap">{aboutData.education.year}</span>
                                    )}
                                  </div>
                                </div>
                              </section>

                              {/* Experience Section */}
                              <section>
                                <h2 className="text-3xl font-bold mb-4">Experience</h2>
                                <div className="space-y-4">
                                  {aboutData.experience.map((exp, idx) => (
                                    <div key={idx} className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
                                      <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-start mb-3">
                                        <div>
                                          <h3 className="text-xl font-bold">{exp.role}</h3>
                                          <p className="text-[#1ed760] font-medium">{exp.company}</p>
                                        </div>
                                        <span className="text-zinc-400 md:whitespace-nowrap">{exp.duration}</span>
                                      </div>
                                      <p className="text-zinc-300">{exp.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </section>

                              {/* Let's Connect Section */}
                              <section>
                                <h2 className="text-3xl font-bold mb-4">Let&apos;s Connect</h2>
                                <p className="text-lg text-zinc-300 mb-6">{aboutData.cta}</p>
                                <div className="flex flex-wrap gap-3">
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
                                  <a href="https://drive.google.com/file/d/1JbWO4PQmiTf-LC0DDzR0pUldCw9YNRxV/view?usp=sharing" target="_blank" rel="noreferrer">
                                    <Button variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white font-semibold px-8">
                                      Resume
                                    </Button>
                                  </a>
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
