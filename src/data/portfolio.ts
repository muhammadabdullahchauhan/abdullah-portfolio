export const PERSON = {
  name: "Muhammad Abdullah Chauhan",
  short: "MAC",
  title: "MERN Stack Software Engineer",
  description:
    "I build scalable, modern and interactive full-stack web applications using MongoDB, Express.js, React.js and Node.js.",
  secondary:
    "Turning ideas into reliable digital products through clean architecture, modern UI and robust APIs.",
  email: "raoabdullah111111@gmail.com",
  github: "https://github.com/muhammadabdullahchauhan",
  linkedin: "https://www.linkedin.com/in/muhammadabdullahchauhan/",
};

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export type SkillGroup = { category: string; items: string[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  { category: "Backend", items: ["Node.js", "Express.js", "REST API Development"] },
  { category: "Database", items: ["MongoDB", "MongoDB Atlas", "Basic SQL / MySQL"] },
  {
    category: "Authentication",
    items: ["JWT", "Role-Based Authentication", "Protected Routes"],
  },
  { category: "State & Data", items: ["Redux", "Zustand", "TanStack Query"] },
  { category: "Styling", items: ["Tailwind CSS", "Sass / SCSS", "Shadcn UI"] },
  { category: "Animation", items: ["Framer Motion", "GSAP", "CSS Animations"] },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "Cursor AI", "Figma", "Vercel"],
  },
];

export const CONSTELLATION = {
  core: "MERN",
  inner: [
    { name: "MongoDB", note: "Document database, schema design, aggregation, Atlas." },
    { name: "Express", note: "Routing, middleware, controllers, error handling." },
    { name: "React", note: "Component architecture, hooks, state, performance." },
    { name: "Node.js", note: "Server runtime, services, async I/O, tooling." },
  ],
  outer: [
    { name: "JavaScript", note: "Core language, async patterns, ES modules." },
    { name: "TypeScript", note: "Typed contracts across API and UI layers." },
    { name: "Next.js", note: "Routing, SSR/SSG, API routes, deployment." },
    { name: "REST APIs", note: "Resource design, versioning, status semantics." },
    { name: "JWT", note: "Token auth, refresh flow, protected routes." },
    { name: "Git", note: "Branching, reviews, CI-friendly workflows." },
  ],
};

export const EXPERIENCE = [
  {
    company: "Zayexa",
    role: "Frontend Developer — Trainee → Junior",
    period: "Jan 2025 — Sep 2025",
    summary:
      "Worked inside a full product team, shipping client-facing web applications and collaborating closely with backend development on API contracts and data flow.",
    points: [
      "Developed modern web interfaces",
      "Built reusable React components",
      "Worked with Next.js",
      "Integrated REST APIs",
      "Collaborated with backend development",
      "Implemented responsive layouts",
      "Worked with real-world client projects",
      "Debugged application issues",
      "Used Git/GitHub workflows",
      "Worked in remote and hybrid environments",
    ],
  },
];

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  role: string;
  visual: "waveform" | "document" | "browser" | "commerce" | "care" | "invoice";
  stack: { frontend: string[]; backend?: string[]; database?: string[]; apis?: string[] };
  features: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  challenges: string[];
  implementation: string[];
  apiFlow: string[];
  database: string[];
  results: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "tone-weaver",
    index: "01",
    title: "Tone Weaver",
    subtitle: "Creative Voice & Accent Changing Platform",
    role: "Frontend Lead / Full-Stack Collaboration",
    visual: "waveform",
    stack: {
      frontend: ["Next.js", "JavaScript", "Tailwind CSS", "Shadcn UI"],
      backend: ["FastAPI"],
      apis: ["REST APIs"],
    },
    features: [
      "Voice upload",
      "Audio processing interface",
      "Audio playback",
      "API communication",
      "Responsive interface",
      "Asynchronous states",
      "Error handling",
    ],
    overview:
      "Tone Weaver is a creative audio platform where users upload a voice sample and transform its tone and accent through a processing pipeline exposed as a REST service.",
    problem:
      "Audio transformation is slow and asynchronous. The interface had to stay responsive and communicative while long-running jobs executed on the server.",
    solution:
      "A Next.js client with an explicit state machine for upload, processing, ready and failed states, backed by a FastAPI service consumed over REST.",
    architecture: [
      "Next.js app router client with route-level code splitting",
      "Upload handler streaming files to the processing API",
      "Polling layer for asynchronous job status",
      "Player component driven by processed audio URLs",
    ],
    challenges: [
      "Handling large audio payloads without blocking the UI thread",
      "Designing retry and error states for unstable long jobs",
      "Keeping playback state consistent across re-renders",
    ],
    implementation: [
      "Reusable Shadcn-based component system for consistent controls",
      "Abstracted API client with typed responses and error normalization",
      "Skeleton and progress states for every asynchronous boundary",
    ],
    apiFlow: [
      "Client uploads audio (multipart/form-data)",
      "API validates format and size, enqueues job",
      "Client polls job status endpoint",
      "Processed asset URL returned",
      "Player streams the result",
    ],
    database: [
      "Jobs collection: id, status, input reference, output reference, timestamps",
      "Users: profile, quota and history references",
    ],
    results: [
      "Clear feedback across every processing stage",
      "Reusable audio UI primitives shared across the product",
    ],
  },
  {
    slug: "quespapergen",
    index: "02",
    title: "QuesPaperGen",
    subtitle: "Dynamic Question Paper Generation Web Application",
    role: "Full-Stack Development",
    visual: "document",
    stack: {
      frontend: ["React", "Next.js", "Tailwind CSS"],
      backend: ["Node.js", "Express.js"],
      database: ["MongoDB"],
      apis: ["REST APIs"],
    },
    features: [
      "Dynamic content composition",
      "Reusable question components",
      "Filtering by subject and difficulty",
      "Printable paper output",
      "Responsive UI",
    ],
    overview:
      "A dynamic web application that assembles question papers from a structured question bank using configurable rules.",
    problem:
      "Manual paper creation is repetitive and error-prone, with no reuse of previously written questions.",
    solution:
      "A data-driven generator with a normalized question bank, filter rules, and a composable rendering layer.",
    architecture: [
      "React/Next.js UI with generator configuration panel",
      "Express REST API exposing question bank resources",
      "MongoDB collections for subjects, questions and generated papers",
    ],
    challenges: [
      "Modelling questions flexibly across subjects and formats",
      "Deterministic generation with balanced difficulty distribution",
    ],
    implementation: [
      "Reusable renderer components per question type",
      "Query layer with pagination and indexed filters",
      "Server-side validation of generation rules",
    ],
    apiFlow: [
      "UI submits generation config",
      "Express route validates payload",
      "Controller queries MongoDB with filters",
      "Service composes and balances the paper",
      "Structured paper returned to the UI",
    ],
    database: [
      "questions: subject, topic, difficulty, marks, body",
      "papers: config snapshot, question refs, createdAt",
    ],
    results: [
      "Paper assembly reduced from hours to seconds",
      "Question bank reused across multiple sessions",
    ],
  },
  {
    slug: "true-life-six",
    index: "03",
    title: "True Life Six",
    subtitle: "Real-World Client Web Platform",
    role: "Frontend Architecture & API Integration",
    visual: "browser",
    stack: {
      frontend: ["Next.js", "React", "Tailwind CSS"],
      apis: ["REST APIs"],
    },
    features: [
      "Modular frontend architecture",
      "Responsive implementation",
      "Reusable component library",
      "API integration where applicable",
      "Modern content-driven UI",
    ],
    overview:
      "A client platform built with a modular frontend architecture and a strong emphasis on responsive, accessible layouts.",
    problem:
      "The client needed a fast, maintainable site that could evolve with frequently changing content sections.",
    solution:
      "A component-driven Next.js implementation where each section is a configurable, reusable block.",
    architecture: [
      "Section registry mapping content types to components",
      "Shared layout primitives and design tokens",
      "REST integration layer for dynamic content",
    ],
    challenges: [
      "Keeping layout consistent across highly variable content",
      "Balancing rich visuals with load performance",
    ],
    implementation: [
      "Typed content models for every section block",
      "Image and asset optimization pipeline",
      "Mobile-first responsive rules",
    ],
    apiFlow: ["Page request", "Content fetch", "Section mapping", "Rendered layout"],
    database: ["Content documents grouped per page and section"],
    results: ["Content updates without code changes", "Consistent responsive behaviour"],
  },
  {
    slug: "moda-paya",
    index: "04",
    title: "Moda Paya",
    subtitle: "E-Commerce Inspired Client Application",
    role: "Frontend Implementation",
    visual: "commerce",
    stack: {
      frontend: ["React", "Next.js", "Tailwind CSS"],
      apis: ["REST APIs"],
    },
    features: [
      "Responsive web application",
      "Component architecture",
      "Product-focused modern UI",
      "Catalogue and detail flows",
    ],
    overview:
      "A commerce-oriented client application focused on product presentation and a clean purchasing journey.",
    problem: "Product browsing needed to feel fast and effortless on mobile devices.",
    solution:
      "A component-based catalogue with predictable state, optimized media and a responsive grid system.",
    architecture: [
      "Catalogue grid with virtualized-friendly card components",
      "Detail views driven by product identifiers",
      "Shared cart/state primitives",
    ],
    challenges: ["Media-heavy pages on low bandwidth", "Consistent card layouts at every breakpoint"],
    implementation: [
      "Reusable product card and gallery components",
      "Lazy media loading with layout-stable placeholders",
    ],
    apiFlow: ["Catalogue request", "Product list response", "Detail request", "Detail render"],
    database: ["products: title, media, price, attributes, availability"],
    results: ["Smooth mobile browsing", "Reusable commerce UI kit"],
  },
  {
    slug: "jakham-help-kadam",
    index: "05",
    title: "Jakham Help Kadam",
    subtitle: "Social Impact Client Platform",
    role: "Frontend Development",
    visual: "care",
    stack: { frontend: ["React", "Tailwind CSS"], apis: ["REST APIs"] },
    features: [
      "Responsive design",
      "User-focused interface",
      "Reusable UI system",
      "Modern development practices",
    ],
    overview:
      "A social impact platform designed around clarity, trust and accessibility for a wide range of users.",
    problem: "The audience spans varied devices and digital literacy levels.",
    solution: "A simple, high-contrast interface with predictable navigation and minimal friction.",
    architecture: ["Accessible layout primitives", "Reusable content and form components"],
    challenges: ["Accessibility across low-end devices", "Content clarity over decoration"],
    implementation: ["Semantic HTML structure", "Keyboard-navigable interactive elements"],
    apiFlow: ["Form submit", "Validation", "API request", "Confirmation state"],
    database: ["submissions: contact details, request type, status"],
    results: ["Clear, accessible user journeys"],
  },
  {
    slug: "billvok",
    index: "06",
    title: "Billvok",
    subtitle: "Billing & Business Web Application",
    role: "Web Application Development",
    visual: "invoice",
    stack: {
      frontend: ["React", "Next.js", "Tailwind CSS"],
      backend: ["Node.js", "Express.js"],
      database: ["MongoDB"],
      apis: ["REST APIs"],
    },
    features: [
      "Web application development",
      "Responsive frontend",
      "Reusable architecture",
      "Modern UI system",
    ],
    overview:
      "A business-facing web application centred on records, billing views and structured data entry.",
    problem: "Dense business data needed to stay readable and fast to operate.",
    solution: "A layout system built around tables, filters and reusable form primitives.",
    architecture: [
      "Data table abstraction with sorting and filtering",
      "Form layer with schema validation",
      "REST resource endpoints per entity",
    ],
    challenges: ["Dense data on small screens", "Form validation ergonomics"],
    implementation: ["Composable table and form components", "Optimistic UI on record updates"],
    apiFlow: ["List request", "Filtered query", "Record mutation", "Refetch & reconcile"],
    database: ["invoices, customers, line items with referenced relations"],
    results: ["Faster record entry", "Consistent data-heavy interface"],
  },
];

export const SERVICES = [
  {
    title: "Full-Stack Web Applications",
    desc: "Complete MERN applications from frontend to backend.",
    visual: "layers",
  },
  {
    title: "REST API Development",
    desc: "Clean and scalable API architecture.",
    visual: "api",
  },
  {
    title: "React / Next.js Applications",
    desc: "Modern production-ready frontend systems.",
    visual: "atom",
  },
  {
    title: "MongoDB Applications",
    desc: "Database-driven web applications.",
    visual: "cylinder",
  },
  {
    title: "Authentication Systems",
    desc: "JWT-based authentication and protected routes.",
    visual: "lock",
  },
  {
    title: "Interactive Web Experiences",
    desc: "Modern interfaces with advanced animations and interactions.",
    visual: "orbit",
  },
] as const;

export const PROCESS = [
  { step: "01", title: "Discover", object: "compass", desc: "Understand the problem, users and constraints." },
  { step: "02", title: "Plan", object: "blueprint", desc: "Scope, milestones and technical decisions." },
  { step: "03", title: "Architect", object: "nodes", desc: "Data models, API contracts and boundaries." },
  { step: "04", title: "Design", object: "cube", desc: "Interface systems, states and interactions." },
  { step: "05", title: "Develop", object: "terminal", desc: "Frontend, API and database implementation." },
  { step: "06", title: "Test", object: "shield", desc: "Edge cases, validation and error handling." },
  { step: "07", title: "Deploy", object: "rocket", desc: "Build, ship, monitor and iterate." },
];

export const CERTIFICATES = [
  { title: "Full-Stack Web Development", issuer: "Self-Directed Program", year: "2025" },
  { title: "React & Next.js Development", issuer: "Professional Training", year: "2025" },
  { title: "Backend Development with Node.js", issuer: "Professional Training", year: "2025" },
  { title: "MongoDB Fundamentals", issuer: "Professional Training", year: "2025" },
  { title: "Frontend Developer Internship", issuer: "Zayexa", year: "2025" },
  { title: "Git & GitHub Workflows", issuer: "Professional Training", year: "2024" },
];

export const API_FLOW = [
  "Browser",
  "React Application",
  "Axios / Fetch",
  "REST API",
  "Express Route",
  "Controller",
  "Service Logic",
  "MongoDB",
  "Response",
  "React UI",
];

export const COLLECTIONS = [
  {
    name: "users",
    fields: ["_id", "name", "email", "passwordHash", "role", "createdAt"],
    relation: "referenced by projects.ownerId and orders.userId",
  },
  {
    name: "projects",
    fields: ["_id", "ownerId", "title", "stack[]", "status", "updatedAt"],
    relation: "ownerId → users._id",
  },
  {
    name: "orders",
    fields: ["_id", "userId", "items[]", "total", "status", "placedAt"],
    relation: "userId → users._id",
  },
  {
    name: "authentication",
    fields: ["_id", "userId", "refreshToken", "expiresAt", "device"],
    relation: "userId → users._id",
  },
];

export const AUTH_FLOW = [
  "Login",
  "Credentials",
  "API",
  "Validation",
  "JWT",
  "Protected Route",
  "User Dashboard",
];
