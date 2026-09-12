import type { WorkRef } from "./work";

export type Skill = {
  name: string;
  /** Where the CV shows this tool being used. Empty = listed under skills only. */
  usedIn: WorkRef[];
};

export type SkillGroup = {
  id: string;
  title: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "Python", usedIn: ["futurense", "pipeone", "memory", "learning", "network"] },
      { name: "Java", usedIn: ["java"] },
      { name: "SQL", usedIn: ["futurense"] },
      { name: "HTML", usedIn: [] },
      { name: "CSS", usedIn: [] },
      { name: "JavaScript", usedIn: ["memory"] },
      { name: "React", usedIn: [] },
    ],
  },
  {
    id: "data-engineering",
    title: "Data engineering",
    skills: [
      { name: "dbt", usedIn: ["futurense", "pipeone"] },
      { name: "Apache Airflow", usedIn: ["futurense", "pipeone"] },
      { name: "ELT pipelines", usedIn: ["futurense", "pipeone"] },
      { name: "Data warehousing", usedIn: ["futurense", "pipeone"] },
      { name: "Bronze / Silver / Gold layers", usedIn: ["pipeone"] },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      { name: "PostgreSQL", usedIn: ["futurense", "pipeone", "learning"] },
      { name: "MySQL", usedIn: ["network"] },
      { name: "MongoDB", usedIn: [] },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    skills: [
      { name: "FastAPI", usedIn: ["learning"] },
      { name: "Flask", usedIn: ["memory", "network"] },
      { name: "Node.js", usedIn: [] },
      { name: "REST APIs", usedIn: ["learning"] },
      { name: "JWT authentication", usedIn: ["learning"] },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & visualisation",
    skills: [
      { name: "Dash", usedIn: ["learning"] },
      { name: "Plotly", usedIn: ["learning"] },
      { name: "Chart.js", usedIn: ["memory"] },
      { name: "Scapy", usedIn: ["network"] },
    ],
  },
  {
    id: "tooling",
    title: "Systems & tooling",
    skills: [
      { name: "Docker", usedIn: ["futurense", "pipeone"] },
      { name: "GitHub", usedIn: ["pipeone", "memory", "learning", "network"] },
      { name: "psutil", usedIn: ["memory"] },
    ],
  },
  {
    id: "soft-skills",
    title: "Soft skills",
    skills: [
      { name: "Problem-Solving", usedIn: [] },
      { name: "Team Player", usedIn: [] },
      { name: "Adaptability", usedIn: [] },
    ],
  },
];

export const allSkills: Skill[] = skillGroups.flatMap((group) => group.skills);
