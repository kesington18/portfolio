// ✏️ Edit this file: it's the only place you need to change content.
export const profile = {
  name: "Abdulwakeel Kesington",
  title: "Backend Software Engineer",
  tagline: "I build dependable APIs and data systems that real people use every day.",
  about: [
    "I'm a backend engineer who enjoys turning messy real-world processes into clean, well-structured systems: from hostel allocation for a medical college to announcement pipelines that reach students instantly.",
    "I work mostly with FastAPI and PostgreSQL, care about clear data models, sensible auth, and shipping things that actually go live. I'm comfortable owning a backend end to end, from schema to deployment.",
  ],
  email: "abdulwakeelkesington@gmail.com",
  github: "https://github.com/your-handle",// TODO
  linkedin: "https://linkedin.com/in/your-handle", // TODO
};

export const projects = [
  {
    name: "COMPSSA Hostel Hub",
    role: "Sole backend engineer",
    blurb: "Hostel allocation platform for University of Lagos College of Medicine students (200–600 level). A separate React/Next.js team consumes the REST API I built.",
    points: [
      "Two-phase allocation engine: rule-based placement for 300–600L, random draw for 200L, with roommate pairs placed together and an automatic waitlist.",
      "Role-based access (student vs admin), JWT auth, document verification with ImageKit storage, appeals, notifications and Excel/PDF reports.",
      "Deployed on Pxxl with Neon PostgreSQL and Redis; 570 rooms imported to production.",
    ],
    stack: ["FastAPI", "SQLModel", "PostgreSQL", "Redis", "JWT", "Docker", "Neon"],
    links: [{ label: "API docs", href: "https://compssa-hostel-hub.pxxl.dev/docs" }],
  },
  {
    name: "Noticeboard",
    role: "Engineer, Telegram ingestion, push notifications & deployment",
    blurb: "A centralized announcement system: add the bot to a Telegram group and every message becomes an announcement with instant notifications for followers.",
    points: [
      "Built the Telegram ingestion pipeline and the single-use-code flow that lets a class governor claim their group.",
      "Implemented web push notifications and Celery/Redis background workers; handled production deployment fixes across Pxxl, Neon and Vercel.",
      "Built with a three-engineer team; designed for anyone, in any school.",
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

// Lines the hero types out, one after another
export const typed = [
  "Hello, world.",
  "I design REST APIs.",
  "I model data in PostgreSQL.",
  "I ship FastAPI services.",
  "I make systems that run in production.",
];
