export type EducationEntry = {
  institution: string;
  location: string;
  qualification: string;
  field?: string;
  start: string;
  end: string;
  score: { label: string; value: string };
  current: boolean;
};

export const education: EducationEntry[] = [
  {
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    qualification: "Bachelor of Technology",
    field: "Computer Science and Engineering (Artificial Intelligence & Data Engineering)",
    start: "Aug 2024",
    end: "Present",
    score: { label: "CGPA", value: "8.05" },
    current: true,
  },
  {
    institution: "Kendriya Vidyalaya ONGC",
    location: "Dehradun, Uttarakhand",
    qualification: "Senior Secondary",
    field: "Physics, Chemistry, Mathematics (PCM)",
    start: "Mar 2023",
    end: "May 2024",
    score: { label: "Percentage", value: "73.4%" },
    current: false,
  },
];
