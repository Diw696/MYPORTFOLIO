export type MilestoneKind = "education" | "learning" | "build" | "work";

export type Milestone = {
  year: string;
  month: string;
  title: string;
  detail: string;
  kind: MilestoneKind;
  href: string;
};

// Only dated items from the CV. Undated achievements live in the credentials section.
export const milestones: Milestone[] = [
  { year: "2024", month: "Aug", title: "Started B.Tech at LPU", detail: "CSE · AI & Data Engineering", kind: "education", href: "#education" },
  { year: "2024", month: "Aug", title: "AI Tools & ChatGPT Workshop", detail: "B10X", kind: "learning", href: "#credentials" },
  { year: "2025", month: "Feb", title: "Real-Time Network Analysis Dashboard", detail: "Project", kind: "build", href: "#project-network-dashboard" },
  { year: "2025", month: "Apr", title: "Introduction to Data Engineering", detail: "IBM · Coursera", kind: "learning", href: "#credentials" },
  { year: "2025", month: "May", title: "Generative AI", detail: "IBM · Coursera", kind: "learning", href: "#credentials" },
  { year: "2025", month: "Nov", title: "Online Learning Engagement Analytics", detail: "Project", kind: "build", href: "#project-learning-analytics" },
  { year: "2026", month: "Apr", title: "Dynamic Memory Visualizer", detail: "Project", kind: "build", href: "#project-memory-visualizer" },
  { year: "2026", month: "Jun", title: "Data Engineering Intern, Futurense", detail: "Internship · Jun–Jul", kind: "work", href: "#experience" },
  { year: "2026", month: "Jul", title: "Pipeone", detail: "Project", kind: "build", href: "#project-pipeone" },
  { year: "2026", month: "Aug", title: "Java Programming Fundamentals", detail: "Infosys Springboard", kind: "learning", href: "#credentials" },
];

export const milestoneKinds: Record<MilestoneKind, string> = {
  build: "Built",
  work: "Worked",
  learning: "Learned",
  education: "Studied",
};
