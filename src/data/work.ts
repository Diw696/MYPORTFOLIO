// A registry of the concrete pieces of work on the CV, so skills and
// visualisations can point at where a tool was actually used.

export type WorkRef = "futurense" | "pipeone" | "memory" | "learning" | "network" | "java";

export type WorkEntry = {
  label: string;
  short: string;
  kind: "Internship" | "Project" | "Certificate";
  date: string;
  href: string;
};

export const workRefs: Record<WorkRef, WorkEntry> = {
  futurense: {
    label: "Data Engineering Intern, Futurense Technologies",
    short: "Futurense internship",
    kind: "Internship",
    date: "Jun 2026",
    href: "#experience",
  },
  pipeone: {
    label: "Pipeone",
    short: "Pipeone",
    kind: "Project",
    date: "Jul 2026",
    href: "#project-pipeone",
  },
  memory: {
    label: "Dynamic Memory Visualizer",
    short: "Memory Visualizer",
    kind: "Project",
    date: "Apr 2026",
    href: "#project-memory-visualizer",
  },
  learning: {
    label: "Online Learning Engagement Analytics",
    short: "Learning Analytics",
    kind: "Project",
    date: "Nov 2025",
    href: "#project-learning-analytics",
  },
  network: {
    label: "Real-Time Network Analysis Dashboard",
    short: "Network Dashboard",
    kind: "Project",
    date: "Feb 2025",
    href: "#project-network-dashboard",
  },
  java: {
    label: "Java Programming Fundamentals",
    short: "Java certificate",
    kind: "Certificate",
    date: "Aug 2026",
    href: "#credentials",
  },
};

export const workOrder: WorkRef[] = ["futurense", "pipeone", "memory", "learning", "network", "java"];
