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

export const projectsData: Project[] = [
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
      "React Native, React.js, Node.js, Convex, Supabase, Firebase, Git, Expo",
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
    title: "Bouldering",
    description: "Certified V5 Mesa Rim Climber",
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
];

export const sidebarData: Category[] = [
  {
    id: "projects",
    name: "My Projects",
    icon: Layers,
    type: "playlist",
    description: "things i have created :0",
    projects: projectsData,
  },
  {
    id: "skills",
    name: "Skills / Tech Stack",
    icon: Code,
    type: "playlist",
    description: "techincal skills",
    projects: skillsData,
  },
  {
    id: "contact",
    name: "Contact",
    icon: Mail,
    type: "playlist",
    description: "get in contact with me :)",
    projects: contactData,
  },
  {
    id: "interests",
    name: "Outside Interests",
    icon: Globe,
    type: "playlist",
    description: "what I like to do outside coding",
    projects: interestsData,
  },
  {
    id: "about",
    name: "About Me",
    icon: User,
    type: "about",
    content: `About me:
    Computer Science student at San Diego State University (June 2026). Has experience building full-stack and mobile applications using TypeScript, React Native, Next.js, and Convex. Passionate about creating scalable, high-performance systems, strong UI/UX, and modern cloud infrastructure.

Education:
San Diego State University - Computer Science, B.S. in Applied Arts and Sciences.

Anything else you want to know (resume, projects, etc.)? Send an email!`,
  },
];
