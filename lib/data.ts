export const contact = {
  email: "jacenvsalvador@gmail.com",
  github: "https://github.com/jacenv",
  linkedin: "https://linkedin.com/in/jacensalvador",
  resume: "/jacen-resume.pdf",
};

export type Status = { label: string; tone: "live" | "shipped" | "lab" };

export type Project = {
  id: string;
  org: string;
  title: string;
  status: Status;
  deck: string;
  stack: string[];
  url?: string;
  linkLabel?: string;
  notes: { title: string; detail: string }[];
  proof?: { mark: string; text: string };
};

export const featuredProjects: Project[] = [
  {
    id: "yearning",
    org: "Personal product",
    title: "Yearning",
    status: { label: "Live on the App Store", tone: "live" },
    deck: "Closure with someone who was never going to text back.",
    stack: ["Expo", "React Native", "Convex", "DeepSeek", "RevenueCat", "Cloudflare"],
    url: "https://apps.apple.com/us/app/yearning/id6778991849",
    linkLabel: "View on the App Store",
    notes: [
      {
        title: "A persona, not a chatbot",
        detail:
          "Onboarding captures how an ex actually texted and how the relationship ended. A pure prompt module turns that into a persona, then layers the room you are in \u2014 the thread that got cut off, the one question, the apology, the goodbye \u2014 each with different rules for who leads.",
      },
      {
        title: "Coaching that can't leak into character",
        detail:
          "One DeepSeek call returns a Zod-validated object: the ex\u2019s in-character reply and a separate out-of-character note from the guide. Two fields, one round trip, no chance of the coach bleeding into the persona.",
      },
      {
        title: "Their side only, on the device",
        detail:
          "ML Kit reads a conversation screenshot on the phone and keeps only left-aligned bubbles, dropping timestamps, read receipts, and app chrome. Their texting voice becomes context without the image ever leaving the device.",
      },
      {
        title: "Bounded before it ships",
        detail:
          "Server-verified RevenueCat entitlements gate the model, and a token-bucket burst limit, free and premium daily budgets, and sharded global caps keep one account \u2014 or a hundred \u2014 from running up the bill.",
      },
    ],
    proof: {
      mark: "66",
      text: "registered accounts. Real users, real conversations, and a reason to get the details right.",
    },
  },
  {
    id: "studio-avenue",
    org: "Client work",
    title: "Studio Avenue",
    status: { label: "Shipped", tone: "shipped" },
    deck: "A media and VFX studio\u2019s portfolio, and a CMS shaped around the files it actually ships.",
    stack: ["Next.js", "Sanity", "Cloudflare Workers", "R2", "Alchemy", "GSAP"],
    url: "https://studioavenue.co",
    linkLabel: "Visit the live site",
    notes: [
      {
        title: "A studio that uploads its own reels",
        detail:
          "Sanity\u2019s asset pipeline isn\u2019t built for multi-gigabyte video, so editors get a custom Studio input that presigns a direct-to-R2 upload \u2014 5 GB ceiling, ten-minute URLs, MIME and origin allow-lists. A publish action sweeps orphaned objects so storage never drifts from the CMS.",
      },
      {
        title: "The homepage reel swaps in place",
        detail:
          "The hero reel lives at one fixed key, so a new upload overwrites the old file instead of accumulating. Its public URL carries a per-upload cache-buster, so browsers and the CDN pick up the change the moment it lands.",
      },
      {
        title: "Edits they can see before publishing",
        detail:
          "Sanity\u2019s Live Content API with draft perspectives and stega, so the team previews unpublished changes on the real page. Queries are GROQ with generated types, and images carry blur placeholders, hotspot, and crop.",
      },
      {
        title: "Infrastructure as code, not a dashboard",
        detail:
          "Next.js runs on Cloudflare Workers through OpenNext, with the worker, bucket, and bindings declared in an Alchemy script \u2014 so the production environment is reviewable and reproducible.",
      },
    ],
    proof: {
      mark: "studioavenue.co",
      text: "Live and maintained by the studio, whose credits include Marc Jacobs, the Golden State Warriors, and BLACKPINK.",
    },
  },
];

export const explorations = [
  {
    name: "Systems & Cloud Lab",
    description:
      "OpenBSD, Ubuntu, Solaris, and AIX on Proxmox with networking and DNS. Docker and Kubernetes services on Azure with NFS and self-managed GitLab.",
    stack: "Proxmox · Kubernetes · Azure",
    kind: "terminal" as const,
  },
  {
    name: "Speech Emotion Recognition",
    description:
      "A four-class SVM classifier over 84 speech clips using MFCC and energy features. 76.2% accuracy on a stratified 21-clip test set.",
    stack: "Python · scikit-learn · Librosa",
    kind: "wave" as const,
  },
  {
    name: "IoT Water Boiling Monitor",
    description:
      "A OneWire temperature sensor sampled every 10 seconds over Wi-Fi, with a 100°C boil alert, duplicate suppression, and re-arming below 95°C.",
    stack: "Arduino · C++ · HTTP",
    kind: "gauge" as const,
  },
];

export const lastUpdated = "11/26";
