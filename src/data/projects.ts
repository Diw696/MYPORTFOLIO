import type { WorkRef } from "./work";

export type MotifKind = "pipeline" | "memory" | "analytics" | "network";

export type Project = {
  slug: string;
  ref: WorkRef;
  index: string;
  name: string;
  date: string;
  tagline: string;
  summary: string;
  purpose: string;
  built: string[];
  features: string[];
  outcome: string;
  stack: string[];
  motif: MotifKind;
  motifLabel: string;
  links: {
    github: string;
    demo?: string;
  };
  /**
   * Put files in public/images/projects/<slug>/ and reference them here,
   * e.g. cover: "/images/projects/pipeone/cover.webp". Empty = styled placeholder.
   */
  images: {
    cover?: string;
    architecture?: string;
    walkthrough?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "pipeone",
    ref: "pipeone",
    index: "P—01",
    name: "Pipeone",
    date: "Jul 2026",
    tagline: "End-to-end ELT pipeline",
    summary:
      "An ELT pipeline running on Dockerized PostgreSQL, with dbt handling transformations and Apache Airflow orchestrating and scheduling the workflow.",
    purpose:
      "Demonstrate ELT and data-warehousing concepts in a pipeline that actually runs end to end: data moves through clearly separated layers, transformations live in dbt, and workflows are scheduled through Airflow for reliable execution.",
    built: [
      "Engineered an end-to-end ELT pipeline using Dockerized PostgreSQL, dbt, and Apache Airflow.",
      "Applied Bronze, Silver, and Gold layers to organize and process data across pipeline stages.",
      "Orchestrated data transformations and scheduled workflows for reliable pipeline execution.",
    ],
    features: [
      "PostgreSQL running in Docker as the warehouse",
      "Bronze → Silver → Gold layering across pipeline stages",
      "Transformations modelled with dbt",
      "Orchestration and scheduling with Apache Airflow",
    ],
    outcome:
      "Built a scalable data pipeline demonstrating practical ELT and data warehousing concepts.",
    stack: ["PostgreSQL", "dbt", "Apache Airflow", "Python", "Docker"],
    motif: "pipeline",
    motifLabel: "bronze → silver → gold",
    links: { github: "https://github.com/Diw696/pipeone-github-analytics" },
    images: {},
  },
  {
    slug: "memory-visualizer",
    ref: "memory",
    index: "P—02",
    name: "Dynamic Memory Visualizer",
    date: "Apr 2026",
    tagline: "Operating-systems learning tool",
    summary:
      "An interactive web app that simulates how an operating system allocates memory and replaces pages, alongside a live monitor of the machine it runs on.",
    purpose:
      "Make memory management and other OS concepts easier to understand by turning them into something you can see and interact with, instead of reading about them.",
    built: [
      "Developed a full stack interactive web application simulating memory allocation and operating system concepts.",
      "Implemented First Fit, Best Fit, Worst Fit, FIFO, LRU, and Optimal algorithms with fragmentation analysis.",
      "Integrated a live system monitor using psutil to display real-time RAM, swap, and process usage.",
    ],
    features: [
      "First Fit, Best Fit and Worst Fit allocation with fragmentation analysis",
      "FIFO, LRU and Optimal page-replacement algorithms",
      "Live RAM, swap and process monitoring through psutil",
      "Flask backend with a JavaScript and Chart.js front end",
    ],
    outcome: "Created a visual learning tool for understanding memory management and OS concepts.",
    stack: ["Python", "Flask", "JavaScript", "Chart.js", "psutil"],
    motif: "memory",
    motifLabel: "allocation strategies",
    links: { github: "https://github.com/Diw696/Dynamic_Memory_Management_Visualizer" },
    images: {},
  },
  {
    slug: "learning-analytics",
    ref: "learning",
    index: "P—03",
    name: "Online Learning Engagement Analytics",
    date: "Nov 2025",
    tagline: "API-backed analytics platform",
    summary:
      "A FastAPI-based analytics platform with JWT authentication and PostgreSQL, paired with interactive Dash and Plotly dashboards for learner engagement and performance.",
    purpose:
      "Give learner engagement and performance data a structured home, a secured API over a relational database, and make it explorable through interactive dashboards.",
    built: [
      "Developed a FastAPI-based analytics platform with JWT authentication and PostgreSQL.",
      "Created interactive Dash and Plotly dashboards to analyze learner engagement and performance.",
      "Implemented RESTful APIs and CRUD operations for structured learner data management.",
    ],
    features: [
      "JWT-based authentication on the API",
      "RESTful endpoints with CRUD operations for learner data",
      "PostgreSQL for structured storage",
      "Interactive Dash and Plotly dashboards",
    ],
    outcome:
      "Delivered an integrated analytics platform combining backend APIs, data processing, and visualization.",
    stack: ["Python", "FastAPI", "PostgreSQL", "JWT", "Dash", "Plotly"],
    motif: "analytics",
    motifLabel: "engagement dashboard",
    links: { github: "https://github.com/Diw696/OnlineLearningEngagementAnalytics" },
    images: {},
  },
  {
    slug: "network-dashboard",
    ref: "network",
    index: "P—04",
    name: "Real-Time Network Analysis Dashboard",
    date: "Feb 2025",
    tagline: "Traffic monitoring & anomaly detection",
    summary:
      "A dashboard that captures live network traffic, breaks it down to packet-level detail and flags activity that matches DDoS or brute-force patterns.",
    purpose:
      "Build a security-focused tool for watching network traffic as it happens and surfacing suspicious patterns in real time.",
    built: [
      "Developed a real-time network monitoring dashboard for capturing and analyzing live traffic.",
      "Implemented anomaly detection for suspicious activity including DDoS and brute-force patterns.",
      "Captured packet-level information including IP addresses, ports, protocols, and packet sizes.",
    ],
    features: [
      "Live network traffic capture",
      "Packet-level detail: IP addresses, ports, protocols and packet sizes",
      "Anomaly detection for DDoS and brute-force patterns",
      "Flask web dashboard with MySQL",
    ],
    outcome:
      "Built a security-focused monitoring tool for real-time traffic analysis and anomaly detection.",
    stack: ["Python", "Flask", "Scapy", "MySQL"],
    motif: "network",
    motifLabel: "packet stream",
    links: { github: "https://github.com/Diw696/Network-Analysis" },
    images: {},
  },
];
