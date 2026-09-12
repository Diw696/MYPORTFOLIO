export type NavItem = {
  id: string;
  label: string;
  /** Other section ids that should mark this item as current. */
  covers?: string[];
};

export const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education", covers: ["credentials"] },
  { id: "contact", label: "Contact" },
];

/** Every observed section, in document order. */
export const sectionIds = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "credentials",
  "contact",
] as const;
