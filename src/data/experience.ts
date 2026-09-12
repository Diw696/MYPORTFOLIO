export const internship = {
  company: "Futurense Technologies",
  role: "Data Engineering Intern",
  start: { label: "Jun 2026", iso: "2026-06" },
  end: { label: "Jul 2026", iso: "2026-07" },
  type: "Internship",
  summary:
    "A data engineering internship focused on building ELT workflows and working through an end-to-end project the way it is done in industry.",
  areas: [
    { name: "Pipeline development", tools: "Python · SQL · Docker" },
    { name: "Orchestration", tools: "Apache Airflow" },
    { name: "Transformation", tools: "dbt" },
    { name: "Data warehousing", tools: "PostgreSQL" },
  ],
  responsibilities: [
    "Worked with SQL, PostgreSQL, dbt, Apache Airflow, Docker, and Python in data engineering workflows.",
    "Developed ELT workflows and applied modern data warehousing concepts to structured datasets.",
    "Collaborated on an end-to-end data engineering project following industry practices.",
  ],
  outcome:
    "Gained hands-on experience in pipeline development, orchestration, transformation, and data warehousing.",
  stack: ["SQL", "PostgreSQL", "dbt", "Apache Airflow", "Docker", "Python"],
} as const;
