export type Achievement = {
  id: string;
  title: string;
  event: string;
  place: string;
  description: string;
  marker: string;
  highlight: boolean;
};

export type Certificate = {
  name: string;
  issuer: string;
  platform?: string;
  date: string;
  iso: string;
};

export const achievements: Achievement[] = [
  {
    id: "codecarvan",
    title: "Finalist",
    event: "CODECARVAN 3.0 Hackathon",
    place: "Lovely Professional University, Punjab",
    description:
      "Selected as a finalist after competing in a 24-hour hackathon, collaborating in a team to develop a full-stack solution under time constraints.",
    marker: "24-hour hackathon",
    highlight: true,
  },
  {
    id: "taekwondo",
    title: "Bronze Medalist",
    event: "Taekwondo Open Internationals",
    place: "Delhi",
    description:
      "Secured a Bronze Medal at the Taekwondo Open Internationals in Delhi, competing against athletes from across Asia.",
    marker: "Off-screen",
    highlight: false,
  },
];

export const certificates: Certificate[] = [
  { name: "Java Programming Fundamentals", issuer: "Infosys Springboard", date: "Aug 2026", iso: "2026-08" },
  { name: "Generative AI", issuer: "IBM", platform: "Coursera", date: "May 2025", iso: "2025-05" },
  { name: "Introduction to Data Engineering", issuer: "IBM", platform: "Coursera", date: "Apr 2025", iso: "2025-04" },
  { name: "AI Tools & ChatGPT Workshop", issuer: "B10X", date: "Aug 2024", iso: "2024-08" },
];
