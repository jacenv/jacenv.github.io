import { User, Code, Layers, Mail, Globe, type LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
  type: "playlist" | "about";
  description?: string;
  projects?: Project[]; // Re-using Project type for "Tracks"
  content?: string;
};

export const statusProject: Project = {
  id: "status-1",
  title: "mthdstudios",
  description: "mthdstudios • consumer iOS products and production websites",
  tags: ["Co-founder", "Shipping now"],
  date: "Now",
  link: "mailto:jacenvsalvador@gmail.com",
};

export const projectsData: Project[] = [
  {
    id: "yearning",
    title: "Yearning",
    description: "AI conversation simulator published on the iOS App Store.",
    longDescription:
      "Built a hardened LLM boundary that validates every client-controlled prompt input before a billed model call. Designed 12 layered rate-limit buckets and integrated DeepSeek through the Vercel AI SDK with Zod-validated replies and coaching guidance.",
    tags: ["Expo", "Convex", "DeepSeek", "Cloudflare", "RevenueCat"],
    link: "https://apps.apple.com/us/app/yearning/id6778991849",
    date: "Jun 2026 — Present",
  },
  {
    id: "larp",
    title: "Larp",
    description: "AI photo and video editor published on the iOS App Store.",
    longDescription:
      "Architected a Turborepo monorepo and a three-tier content catalog backed by nine composite indexes. Orchestrated image and video generation on fal.ai with server-side entitlements, token-bucket limits, and RevenueCat credits.",
    tags: ["Expo", "Next.js", "Convex", "fal.ai", "Turborepo"],
    link: "https://apps.apple.com/us/app/larp-ai-photo-editor/id6758196527",
    date: "Jan — May 2026",
  },
  {
    id: "studio-avenue",
    title: "Studio Avenue",
    description: "Editorial portfolio for an award-winning post-production studio.",
    longDescription:
      "Built studioavenue.co for a post-production studio with work for Marc Jacobs, the Golden State Warriors, and BLACKPINK. Sanity powers a streamlined publishing workflow for the studio team.",
    tags: ["Next.js", "Sanity", "Client work"],
    link: "https://studioavenue.co",
    date: "Client work",
  },
  {
    id: "polarity-visions",
    title: "PolarityVisions",
    description: "Data-rich creative portfolio with a type-safe application layer.",
    longDescription:
      "Modeled many-to-many media and partner relationships in MySQL with Drizzle ORM, then exposed them through a type-safe tRPC API for a polished creative portfolio experience.",
    tags: ["Next.js", "tRPC", "Drizzle ORM", "MySQL"],
    date: "Client work",
  },
  {
    id: "systems-cloud-lab",
    title: "Systems & Cloud Lab",
    description: "Fault-tolerant infrastructure across cloud and UNIX environments.",
    longDescription:
      "Deployed OpenBSD, Ubuntu, Solaris, and AIX systems on Proxmox with cross-system networking and DNS. Built containerized services with Docker and Kubernetes on Azure, backed by NFS and self-managed GitLab.",
    tags: ["Kubernetes", "Docker", "Azure", "Proxmox", "NGINX"],
    date: "Jan — May 2025",
  },
];

export const skillsData: Project[] = [
  {
    id: "skill-1",
    title: "Programming Languages",
    description: "TypeScript, JavaScript, Python, SQL, Java, C/C++",
    tags: ["Languages"],
    date: "Current",
  },
  {
    id: "skill-2",
    title: "Product Engineering",
    description:
      "React, React Native (Expo), Next.js, Node.js, tRPC, TailwindCSS, Sanity",
    tags: ["Frameworks"],
    date: "Current",
  },
  {
    id: "skill-3",
    title: "AI & Backend",
    description: "Vercel AI SDK, DeepSeek, fal.ai, Convex, Drizzle ORM, Zod, MySQL",
    tags: ["Tech"],
    date: "Current",
  },
  {
    id: "skill-4",
    title: "Infrastructure & Platforms",
    description: "Cloudflare Workers/R2, Docker, Kubernetes, Azure, Turborepo, CI/CD, Git",
    tags: ["Infrastructure"],
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
    title: "Location",
    description: "San Diego, California",
    tags: ["Based in"],
    date: "Pacific time",
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

export type Artist = {
  id: string;
  name: string;
  /** Optional image URL. Falls back to a gradient tile with the artist's initial. */
  imageUrl?: string;
  link?: string;
};

// Manually add artists here — the count updates everywhere automatically.
// Add an `imageUrl` to any entry to replace its gradient placeholder tile.
export const likedArtists: Artist[] = [
  {
    id: "1",
    name: "Olivia Rodrigo",
    imageUrl: "https://i.scdn.co/image/ab6761610000f178b14eb4dcfd2f3858bed06e44",
    link: "https://open.spotify.com/artist/1McMsnEElThX1knmY4oliG",
  },
  {
    id: "2",
    name: "LOONA",
    imageUrl: "https://i.scdn.co/image/ab6761610000f17880584436e5726afb70cee7f8",
    link: "https://open.spotify.com/artist/52zMTJCKluDlFwMQWmccY7",
  },
  {
    id: "3",
    name: "ARTMS",
    imageUrl: "https://i.scdn.co/image/ab6761610000f178c0be4bb287e7a4fc5452d5fc",
    link: "https://open.spotify.com/artist/213zHiFZwtDVEqyxeCbk07",
  },
  {
    id: "4",
    name: "aespa",
    imageUrl: "https://i.scdn.co/image/ab6761610000f178053bbb910dda6d4ab0618b8b",
    link: "https://open.spotify.com/artist/6YVMFz59CuY7ngCxTxjpxE",
  },
  {
    id: "5",
    name: "ISOxo",
    imageUrl: "https://i.scdn.co/image/ab6761610000f178479dba99dbe84334400964e9",
    link: "https://open.spotify.com/artist/4zVCMnjw54nkhGHU4e1Pav",
  },
  {
    id: "6",
    name: "Porter Robinson",
    imageUrl: "https://i.scdn.co/image/ab6761610000f178f67786cf70976b5d87b27b5a",
    link: "https://open.spotify.com/artist/3dz0NnIZhtKKeXZxLOxCam",
  },
  {
    id: "7",
    name: "Tiffany Day",
    imageUrl: "https://i.scdn.co/image/ab6761610000f1781d3b285fae5233fdff9ae2dc",
    link: "https://open.spotify.com/artist/5D5Qbe1lf3aMnLsPSzXItu",
  },
  {
    id: "8",
    name: "LE SSERAFIM",
    imageUrl: "https://i.scdn.co/image/ab6761610000f178d4037f03c5f92e7e6ea89b9e",
    link: "https://open.spotify.com/artist/4SpbR6yFEvexJuaBpgAU5p",
  },
  {
    id: "9",
    name: "ILLIT",
    imageUrl: "https://i.scdn.co/image/ab6761610000f1787fabcc2491d95050faa5b710",
    link: "https://open.spotify.com/artist/36cgvBn0aadzOijnjjwqMN",
  },
  {
    id: "10",
    name: "Ninajirachi",
    imageUrl: "https://i.scdn.co/image/ab6761610000f1786363b3a1630b8811a4d3d718",
    link: "https://open.spotify.com/artist/3MekbRujJg5VZThubOlrkR",
  },
];

export const sidebarData: Category[] = [
  {
    id: "projects",
    name: "My Projects",
    icon: Layers,
    type: "playlist",
    description: "Selected products, client work, and systems projects",
    projects: projectsData,
  },
  {
    id: "skills",
    name: "Skills / Tech Stack",
    icon: Code,
    type: "playlist",
    description: "Languages, frameworks, backend, and infrastructure",
    projects: skillsData,
  },
  {
    id: "contact",
    name: "Contact",
    icon: Mail,
    type: "playlist",
    description: "Email, LinkedIn, GitHub, and location",
    projects: contactData,
  },
  {
    id: "interests",
    name: "Outside Interests",
    icon: Globe,
    type: "playlist",
    description: "A few things I enjoy beyond software",
    projects: interestsData,
  },
  {
    id: "about",
    name: "About Me",
    icon: User,
    type: "about",
    content: JSON.stringify({
      bio: "I am a full-stack software engineer and co-founder based in San Diego. I ship consumer iOS products and production websites end to end - from product architecture and AI integrations to release pipelines, observability, and deployment.",
      stats: [
        { value: "2", label: "consumer iOS apps shipped" },
        { value: "3+ yrs", label: "building for clients" },
        { value: "B.S.", label: "computer science, SDSU" }
      ],
      education: {
        school: "San Diego State University",
        degree: "Bachelor of Applied Arts and Sciences in Computer Science",
        year: "Graduated June 2026"
      },
      experience: [
        {
          role: "Co-Founder & Software Engineer",
          company: "mthdstudios",
          duration: "Jan 2025 - Present",
          description: "Co-founded a two-person software studio and shipped two consumer iOS apps to the App Store.",
          highlights: [
            "Own the release lifecycle across EAS builds, App Store submissions, over-the-air updates, and Sentry crash triage.",
            "Built and deployed the studio marketing site and product pages with Next.js and Cloudflare."
          ]
        },
        {
          role: "Client Web Developer",
          company: "Studio Avenue & PolarityVisions",
          duration: "Dec 2023 - Jul 2026",
          description: "Delivered production portfolios for creative teams with polished editorial workflows and type-safe data architecture.",
          highlights: [
            "Built Studio Avenue's Sanity-powered site for a team with Marc Jacobs, Golden State Warriors, and BLACKPINK credits.",
            "Modeled PolarityVisions' media and partner data in MySQL with Drizzle ORM behind a tRPC API."
          ]
        }
      ],
      cta: "Have a product, engineering role, or collaboration in mind? I would be glad to hear about it."
    }),
  },
];
