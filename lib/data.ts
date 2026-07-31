import { Library, User, Code, Layers, Mail, Globe, Music } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  link?: string;
  image?: string;
  date?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: any;
  type: "playlist" | "about";
  description?: string;
  projects?: Project[]; // Re-using Project type for "Tracks"
  content?: string;
};

export const statusProject: Project = {
  id: "status-1",
  title: "Full Stack Developer",
  description: "San Diego • mthdstudios dev",
  tags: ["Status"],
  date: "Now",
  link: "mailto:jacenvsalvador@gmail.com",
};

export const projectsData: Project[] = [
  {
    id: "proj-5",
    title: "Persistent Reminder Bot",
    description: "Discord bot that pings you until tasks are completed.",
    longDescription:
      "A persistent Discord reminder bot that pings you at regular intervals for tasks. It won't stop notifying you until you mark the task as complete using the '!done' command. Built with Python and discord.py.",
    tags: ["Python", "discord.py", "Bot"],
    link: "https://github.com/jacenv/PersistentReminder",
    date: "Jan 2026",
  },
  {
    id: "proj-1",
    title: "GoodMacros - Nutrition Finder App",
    description:
      "Cross-platform nutrition app ranking foods by custom metrics.",
    longDescription:
      "Built a cross-platform nutrition app that ranks foods by a custom metric, helping users find high-protein, low-calorie items. Implemented barcode scanning for instant food lookups and caching results in Convex reducing excessive API calls. Developed goal-based grading logic to personalize nutrition scores.",
    tags: ["Expo", "React Native", "Next.js", "Convex"],
    link: "#", // User didn't provide link
    date: "Oct 2025",
  },
  {
    id: "proj-2",
    title: "CatifyAI - Cat Selfie Image Generator",
    description:
      "Mobile app transforming user photos into stylized cat selfies.",
    longDescription:
      "Built a mobile app that transforms user photos into 1024x1024 HD, stylized 'cat selfies' using OpenAI image generation. Implemented a credit-based monetization system with RevenueCat. Built backend functions in Convex for image processing orchestration.",
    tags: ["React Native", "OpenAI", "Convex", "RevenueCat"],
    link: "#",
    date: "Aug 2025",
  },
  {
    id: "proj-4",
    title: "Systems & Cloud Lab",
    description: "Infrastructure Deployment Projects on multi-OS environments.",
    longDescription:
      "Deployed multi-OS environments using OpenBSD, FreeBSD, Rocky Linux, and others. Built and maintained cloud and containerized systems with Docker, NGINX, Kubernetes, and Azure. Implemented secure, version-controlled infrastructures.",
    tags: ["Kubernetes", "Docker", "Azure", "Unix"],
    link: "#",
    date: "May 2025",
  },
  {
    id: "proj-3",
    title: "Trauvo - Travel Planner",
    description:
      "Monorepo architecture with shared backend for travel planning.",
    longDescription:
      "Architecting a monorepo with shared backend and web/mobile apps using Convex functions for real-time data. Implementing cross-platform maps and device integrations using Expo APIs for location and notifications.",
    tags: ["React Native", "Next.js", "Convex", "Stripe"],
    link: "#",
    date: "In Progress",
  },
];

export const skillsData: Project[] = [
  {
    id: "skill-1",
    title: "Programming Languages",
    description: "Python, JavaScript, TypeScript, Java, C++, R",
    tags: ["Languages"],
    date: "Current",
  },
  {
    id: "skill-2",
    title: "Frameworks & Tools",
    description:
      "React Native, React.js, Node.js, Convex, Supabase, Firebase, Git, Expo, Tailwind CSS",
    tags: ["Frameworks"],
    date: "Current",
  },
  {
    id: "skill-3",
    title: "Technologies & APIs",
    description: "OpenAI, WebSockets, In-App Purchases, Convex Functions",
    tags: ["Tech"],
    date: "Current",
  },
  {
    id: "skill-4",
    title: "Infrastructure & Platforms",
    description: "Kubernetes, Docker, Azure, Proxmox VE, NGINX",
    tags: ["Infrastructure"],
    date: "Current",
  },
  {
    id: "skill-5",
    title: "Operating Systems",
    description: "Windows, MacOS, OpenBSD, FreeBSD, Ubuntu, Solaris, AIX",
    tags: ["OS"],
    date: "Current",
  },
];

export const contactData: Project[] = [
  {
    id: "contact-1",
    title: "Email",
    description: "jacenvsalvador@gmail.com",
    tags: ["Contact"],
    link: "mailto:jacenvsalvador@gmail.com",
    date: "Primary",
  },
  {
    id: "contact-2",
    title: "LinkedIn",
    description: "linkedin.com/in/jacensalvador",
    tags: ["Social"],
    link: "https://linkedin.com/in/jacensalvador",
    date: "Connect",
  },
  {
    id: "contact-3",
    title: "GitHub",
    description: "github.com/jacenv",
    tags: ["Code"],
    link: "https://github.com/jacenv",
    date: "Follow",
  },
  {
    id: "contact-4",
    title: "Phone",
    description: "email first :)",
    tags: ["Mobile"],
    link: "tel:check the email",
    date: "Call",
  },
];

export const interestsData: Project[] = [
  {
    id: "int-1",
    title: "Indoor Bouldering",
    description: "Certified V6 Mesa Rim Climber",
    tags: ["Outdoor"],
    date: "Activity",
  },
  {
    id: "int-2",
    title: "Volleyball",
    description: "Open Gym Warrior, 40 inch vert",
    tags: ["Indoor"],
    date: "Activity",
  },
  {
    id: "int-3",
    title: "Traveling",
    description: "Current favorite destination: Tokyo, Japan",
    tags: ["Flying"],
    date: "Hobby",
  },
  {
    id: "int-4",
    title: "Competitive eSports",
    description: "Former collegiate Valorant player",
    tags: ["Gaming"],
    date: "Hobby",
  },
  {
    id: "int-5",
    title: "Frontend Development",
    description: "Creating websites and web applications",
    tags: ["Software"],
    date: "Technical",
  },
];

export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  dateAdded: string;
  duration: string;
  coverUrl?: string;
  link?: string;
};

// Manually add your liked songs here — the count updates everywhere automatically.
export const likedSongs: Song[] = [
  {
    id: "1",
    title: "Entombed",
    artist: "Deftones",
    album: "Koi No Yokan",
    dateAdded: "4 days ago",
    duration: "4:59",
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b27387e62856413955a263649438",
  },
  {
    id: "2",
    title: "Ash",
    artist: "LE SSERAFIM",
    album: "HOT",
    dateAdded: "4 days ago",
    duration: "3:18",
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b273c8c32d4b031014685693552d",
  },
  {
    id: "3",
    title: "Shinunoga E-Wa",
    artist: "Fujii Kaze",
    album: "HELP EVER HURT NEVER",
    dateAdded: "5 days ago",
    duration: "3:06",
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b273e6d1304f1542579159495403",
  },
  {
    id: "4",
    title: "One Last Kiss",
    artist: "Hikaru Utada",
    album: "BADモード",
    dateAdded: "1 week ago",
    duration: "4:10",
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b273d45179b354461c2b65a52f21",
  },
  {
    id: "5",
    title: "Sunny",
    artist: "Yorushika",
    album: "Sunny",
    dateAdded: "1 week ago",
    duration: "4:31",
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b27383177927c561c3386e569191",
  },
  {
    id: "6",
    title: "Revolutionary Roads - On The Way",
    artist: "AiNA THE END",
    album: "Revolutionary Roads - On The Way",
    dateAdded: "1 week ago",
    duration: "3:18",
    coverUrl:
      "https://i.scdn.co/image/ab67616d0000b273e860607a724137e739bd2989",
  },
];

export const sidebarData: Category[] = [
  {
    id: "projects",
    name: "My Projects",
    icon: Layers,
    type: "playlist",
    description: "projects that i have worked on",
    projects: projectsData,
  },
  {
    id: "skills",
    name: "Skills / Tech Stack",
    icon: Code,
    type: "playlist",
    description: "technical skills and tools that i have used",
    projects: skillsData,
  },
  {
    id: "contact",
    name: "Contact",
    icon: Mail,
    type: "playlist",
    description: "get in contact with me!",
    projects: contactData,
  },
  {
    id: "interests",
    name: "Outside Interests",
    icon: Globe,
    type: "playlist",
    description: "what i like to do outside of coding",
    projects: interestsData,
  },
  {
    id: "about",
    name: "About Me",
    icon: User,
    type: "about",
    content: JSON.stringify({
      bio: "hi im jacen! i am a current senior at san diego state university studying computer science! i am currently a hobbiest builder who enjoys building fullstack mobile apps as well as frontend web work. come explore my portfolio to learn more about me!",
      education: {
        school: "San Diego State University",
        degree: "Computer Science, B.S. in Applied Arts and Sciences",
        year: "Graduated May 2026"
      },
      experience: [
        {
          role: "Cofounder",
          company: "mthdstudios",
          duration: "April 2026 - Present",
          description: "Building mobile apps and websites as a service to clients."
        },
        {
          role: "Full Stack Developer",
          company: "Freelance",
          duration: "2023 - Present",
          description: "Developing mobile apps along with websites for multiple clients."
        }
      ],
      cta: "Anything else you want to know (resume, projects, etc.)? Send an email!"
    }),
  },
];
