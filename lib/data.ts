import { Library, User, Code, Layers } from "lucide-react"

export type Project = {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  link?: string
  image?: string
  date?: string
}

export type Category = {
  id: string
  name: string
  icon: any
  type: "projects" | "about"
  projects?: Project[]
  content?: string
}

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory.",
    longDescription: "Built with Next.js, Stripe, and Prisma. Features include real-time inventory management using webhooks, secure checkout flow integration with Stripe, and a comprehensive admin dashboard for product and order management.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    link: "https://github.com/jacenv/ecommerce",
    date: "2024"
  },
  {
    id: "proj-2",
    title: "AI Chatbot Assistant",
    description: "An intelligent chatbot using OpenAI API with context memory.",
    longDescription: "Leverages the GPT-4 model to provide helpful responses. Includes a custom vector database for context retention and personalized system prompts to tailor the assistant's personality.",
    tags: ["OpenAI", "React", "Node.js", "Pinecone"],
    link: "https://github.com/jacenv/chatbot",
    date: "2023"
  },
  {
    id: "proj-3",
    title: "Portfolio Site",
    description: "This very website! Designed with a Spotify-inspired UI.",
    longDescription: "A showcase of my work and skills. Implemented using Next.js App Router, Shadcn UI for components, and Tailwind CSS for styling. Features a responsive layout mimicking a desktop application.",
    tags: ["Next.js", "Tailwind", "Shadcn UI"],
    link: "https://github.com/jacenv/portfolio",
    date: "2024"
  },
  {
    id: "proj-4",
    title: "Task Manager CLI",
    description: "A rust-based command line tool for managing daily tasks.",
    longDescription: "Fast and efficient task management in the terminal. Supports priorities, due dates, and recurring tasks. Local storage using SQLite.",
    tags: ["Rust", "SQLite", "CLI"],
    date: "2023"
  }
]

export const sidebarData: Category[] = [
  {
    id: "projects",
    name: "My Projects",
    icon: Layers,
    type: "projects",
    projects: projectsData
  },
  {
    id: "about",
    name: "About Me",
    icon: User,
    type: "about",
    content: "I am a software engineer passionate about building web applications. I love Next.js, React, and TypeScript. When I'm not coding, I'm probably listening to music or exploring new tech."
  }
]
