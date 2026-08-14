import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Pause,
  Play,
} from "lucide-react"
import { Category, Project } from "@/lib/data"
import { cn } from "@/lib/utils"

type AboutExperience = {
  role: string
  company: string
  duration: string
  description: string
  highlights?: string[]
}

type AboutData = {
  bio: string
  stats?: { value: string; label: string }[]
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

const sectionAccent: Record<string, string> = {
  skills: "from-violet-500/35",
  contact: "from-emerald-500/35",
  interests: "from-amber-500/35",
  projects: "from-sky-500/35",
  about: "from-[#1ed760]/25",
}

export function MainContent({
  category,
  currentProject,
  isPlaying,
  onPlay,
  onNavigateToProjects,
}: MainContentProps) {
  const isAbout = category.id === "about"
  const isSkills = category.id === "skills"
  const isProjects = category.id === "projects"
  const isContact = category.id === "contact"
  const aboutData = isAbout && category.content
    ? (JSON.parse(category.content) as AboutData)
    : null

  return (
    <div className="relative m-2 ml-2 h-full overflow-hidden rounded-xl border border-white/5 bg-[#101010]">
      <ScrollArea className="h-full w-full bg-[#101010]">
        <div className="min-h-full pb-24">
          <header
            className={cn(
              "relative overflow-hidden bg-gradient-to-br via-[#171717] to-[#101010] px-5 pb-10 pt-12 md:px-8 md:pb-12 lg:px-12",
              sectionAccent[category.id] ?? "from-zinc-500/30",
            )}
          >
            <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/[0.035] blur-2xl" />
            <div className="relative flex flex-col gap-7 md:flex-row md:items-end">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-black/25 shadow-2xl backdrop-blur-sm md:h-40 md:w-40">
                {isAbout ? (
                  <span className="text-4xl font-black tracking-[-0.08em] text-white md:text-5xl">JS</span>
                ) : (
                  <category.icon className="h-12 w-12 text-white md:h-16 md:w-16" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">
                  {isAbout ? "Full-stack software engineer" : "Portfolio collection"}
                </p>
                <h1 className="mt-3 max-w-4xl text-4xl font-black leading-none tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                  {isAbout ? "Jacen Salvador" : category.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
                  {isAbout
                    ? "I turn product ideas into reliable mobile and web experiences - and own the details required to ship them."
                    : category.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> San Diego, CA
                  </span>
                  {!isAbout && (
                    <span>{category.projects?.length ?? 0} entries</span>
                  )}
                </div>
                {isAbout && (
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                      className="h-10 rounded-full bg-[#1ed760] px-5 font-bold text-black hover:bg-[#35e06f]"
                      onClick={onNavigateToProjects}
                    >
                      View selected work
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-10 rounded-full border-white/20 bg-white/5 px-5 font-semibold text-white hover:bg-white/10 hover:text-white"
                    >
                      <a href="/jacen-resume.pdf" target="_blank" rel="noreferrer">
                        <Download className="mr-2 h-4 w-4" /> Resume
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="px-5 py-10 md:px-8 lg:px-12">
            {category.type === "playlist" && category.projects ? (
              <div className={cn("grid gap-4", isProjects ? "xl:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3")}>
                {category.projects.map((project) => {
                  const hasLink = Boolean(project.link && project.link !== "#" && !project.link.startsWith("tel:"))
                  const isCurrent = currentProject?.id === project.id

                  return (
                    <article
                      key={project.id}
                      className={cn(
                        "group rounded-2xl border border-white/8 bg-white/[0.035] p-5 transition hover:border-white/15 hover:bg-white/[0.06]",
                        isProjects && "cursor-pointer",
                      )}
                      onClick={isProjects ? () => onPlay(project, category.projects) : undefined}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/8">
                            <category.icon className="h-5 w-5 text-zinc-300" />
                          </div>
                          <div className="min-w-0">
                            <h2 className={cn("font-bold text-white", isProjects ? "text-xl" : "text-base")}>
                              {project.title}
                            </h2>
                            {project.date && <p className="mt-0.5 text-xs text-zinc-500">{project.date}</p>}
                          </div>
                        </div>
                        {isProjects ? (
                          <button
                            type="button"
                            aria-label={`${isCurrent && isPlaying ? "Pause" : "Preview"} ${project.title}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-white transition group-hover:bg-[#1ed760] group-hover:text-black"
                          >
                            {isCurrent && isPlaying ? (
                              <Pause className="h-4 w-4 fill-current" />
                            ) : (
                              <Play className="ml-0.5 h-4 w-4 fill-current" />
                            )}
                          </button>
                        ) : hasLink ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.title}`}
                            className="text-zinc-500 transition hover:text-white"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>

                      {isSkills ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.description.split(",").map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="rounded-full border border-white/8 bg-black/20 px-3 py-1 text-xs font-normal text-zinc-200"
                            >
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <>
                          <p className="mt-5 text-sm leading-relaxed text-zinc-300">
                            {isProjects && project.longDescription ? project.longDescription : project.description}
                          </p>
                          {isProjects && (
                            <div className="mt-5 flex flex-wrap items-center gap-2">
                              {project.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="rounded-full border border-white/8 bg-black/20 px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {hasLink && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(event) => event.stopPropagation()}
                                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#63e58f] hover:text-[#8cf1ad]"
                                >
                                  {project.link?.includes("apps.apple.com") ? "View on App Store" : "Visit project"}
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                              )}
                            </div>
                          )}
                          {isContact && hasLink && (
                            <a
                              href={project.link}
                              target={project.link?.startsWith("mailto:") ? undefined : "_blank"}
                              rel="noreferrer"
                              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#63e58f] hover:text-[#8cf1ad]"
                            >
                              Open <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </>
                      )}
                    </article>
                  )
                })}
              </div>
            ) : aboutData ? (
              <div className="mx-auto max-w-5xl space-y-14">
                {aboutData.stats && (
                  <section className="grid gap-3 sm:grid-cols-3" aria-label="Career highlights">
                    {aboutData.stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/[0.035] p-5">
                        <p className="text-3xl font-black tracking-tight text-white">{stat.value}</p>
                        <p className="mt-2 text-sm leading-snug text-zinc-400">{stat.label}</p>
                      </div>
                    ))}
                  </section>
                )}

                <section className="grid gap-6 md:grid-cols-[180px_1fr]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#63e58f]">Profile</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">How I work</h2>
                  </div>
                  <p className="text-lg leading-relaxed text-zinc-300">{aboutData.bio}</p>
                </section>

                <section>
                  <div className="mb-5 flex items-center gap-3">
                    <BriefcaseBusiness className="h-5 w-5 text-[#1ed760]" />
                    <h2 className="text-2xl font-bold text-white">Experience</h2>
                  </div>
                  <div className="space-y-4">
                    {aboutData.experience.map((experience) => (
                      <article key={`${experience.company}-${experience.role}`} className="rounded-2xl border border-white/8 bg-white/[0.035] p-5 md:p-6">
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white">{experience.role}</h3>
                            <p className="mt-1 font-semibold text-[#63e58f]">{experience.company}</p>
                          </div>
                          <span className="shrink-0 text-sm text-zinc-500">{experience.duration}</span>
                        </div>
                        <p className="mt-4 leading-relaxed text-zinc-300">{experience.description}</p>
                        {experience.highlights && (
                          <ul className="mt-4 space-y-3">
                            {experience.highlights.map((highlight) => (
                              <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1ed760]" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="mb-5 flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-[#1ed760]" />
                    <h2 className="text-2xl font-bold text-white">Education</h2>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-5 md:p-6">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{aboutData.education.school}</h3>
                        <p className="mt-2 text-zinc-300">{aboutData.education.degree}</p>
                      </div>
                      {aboutData.education.year && (
                        <span className="shrink-0 text-sm text-zinc-500">{aboutData.education.year}</span>
                      )}
                    </div>
                  </div>
                </section>

                <section className="rounded-3xl border border-[#1ed760]/20 bg-[#1ed760]/[0.06] p-6 md:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#63e58f]">Let&apos;s work together</p>
                  <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-tight text-white md:text-3xl">{aboutData.cta}</h2>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild className="rounded-full bg-[#1ed760] px-6 font-bold text-black hover:bg-[#35e06f]">
                      <a href="mailto:jacenvsalvador@gmail.com">
                        <Mail className="mr-2 h-4 w-4" /> Email me
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full border-white/20 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
                      <a href="https://linkedin.com/in/jacensalvador" target="_blank" rel="noreferrer">LinkedIn</a>
                    </Button>
                  </div>
                </section>
              </div>
            ) : null}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
