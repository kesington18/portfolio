// ✏️ Edit this file: it's the only place you need to change content.
export const profile = {
  name: "Abdulwakeel Kesington",
  title: "Software Engineer",
  tagline: "I build dependable APIs and data systems that real people use every day.",
  about: {
    intro: "I’m a 400-level Computer Science student at the University of Lagos and a software engineer who loves building the backend architecture of real-world projects.",
    studying: "Computer Science, University of Lagos (400L)",
    builds: ["REST APIs", "data models", "background workers"],
    built: [
      { name: "COMPSSA Hostel Hub", line: "a hostel allocation platform for University of Lagos College of Medicine students that handles room allocation, roommate pairing and waitlists." },
      { name: "Noticeboard", line: "a digital information radiator for student environments that keeps the key information created by the admin in one place, so students don’t have to hunt for it in group chats." },
    ],
    hobbies: ["Drawing cartoon characters", "Gaming to unwind", "Basketball", "Reading novels (just getting started)", "Solving real-world problems with code"],
    team: "I love working in teams where I can learn new things and share my ideas.",
  },
  email: "abdulwakeelkesington@gmail.com",
  github: "https://github.com/kesington18",
  linkedin: "https://www.linkedin.com/in/kesington-abdulwakeel",
};

export const projects = [
  {
    name: "COMPSSA Hostel Hub",
    role: "Sole backend engineer",
    image: "/previews/compssa-hostel-hub.webp",
    blurb: "Hostel allocation platform for University of Lagos College of Medicine students (200–600 level). A separate React/Next.js team consumes the REST API I built.",
    points: [
      "Two-phase allocation engine: rule-based placement for 300–600L, random draw for 200L, with roommate pairs placed together and an automatic waitlist.",
      "Role-based access (student vs admin), JWT auth, document verification with ImageKit storage, appeals, notifications and Excel/PDF reports.",
      "Deployed on Pxxl with Neon PostgreSQL and Redis; 570 rooms imported to production.",
    ],
    stack: ["FastAPI", "SQLModel", "PostgreSQL", "Redis", "JWT", "Docker", "Neon"],
    links: [{ label: "Live site", href: "https://compssa-hostel-hub.vercel.app/" }],
  },
  {
    name: "Noticeboard",
    role: "Engineer, Telegram ingestion, push notifications & deployment",
    image: "/previews/noticeboard.webp",
    blurb: "A digital information radiator for student environments: it keeps the key information created by the admin in one place, so students don’t have to search group chats for it.",
    points: [
      "Built the Telegram ingestion pipeline and the single-use-code flow that lets a class governor claim their group.",
      "Implemented web push notifications and Celery/Redis background workers; handled production deployment fixes across Pxxl, Neon and Vercel.",
      "Built with a three-engineer team.",
    ],
    stack: ["FastAPI", "Celery", "Redis", "PostgreSQL", "Telegram Bot API", "Web Push", "React"],
    links: [{ label: "Live app", href: "https://noticeboard-alpha.vercel.app/" }],
  },
];

export const skills = {
  "Backend": ["Python", "FastAPI", "SQLModel", "REST API design", "JWT & RBAC"],
  "Data": ["PostgreSQL", "Redis", "Alembic migrations", "Neon"],
  "Async & Integrations": ["Celery", "Telegram Bot API", "Web Push", "Resend / email", "ImageKit"],
  "Delivery": ["Docker", "Pxxl", "Vercel", "uv", "Git"],
};


export const contact = {
  line: "I’m open to software engineering roles, and to collaborating on projects that solve real problems.",
  open: ["Internship", "Full-time", "Startup", "Collaboration"],
};

// Rotating hero title (typewriter)
export const titles = ["Software Engineer", "Fullstack Engineer", "Backend Developer"];

