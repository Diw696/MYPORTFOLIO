import { useState } from "react";
import { allSkills, skillGroups } from "../../data/skills";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillGroup } from "./SkillGroup";
import { UsagePanel } from "./UsagePanel";

export function Skills() {
  const [selected, setSelected] = useState("PostgreSQL");
  const [preview, setPreview] = useState<string | null>(null);

  const shown = allSkills.find((s) => s.name === (preview ?? selected)) ?? allSkills[0];

  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <SectionHeading
          index="04"
          kicker="Toolkit"
          titleId="skills-title"
          title="Tools, mapped to where I've used them"
          lead="Select a technology to see which parts of the work on this page it actually shows up in."
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2" onMouseLeave={() => setPreview(null)}>
            {skillGroups.map((group, i) => (
              <SkillGroup
                key={group.id}
                group={group}
                selected={selected}
                onSelect={setSelected}
                onPreview={setPreview}
                delay={i * 0.06}
              />
            ))}
          </div>

          <aside className="hidden lg:block" aria-label="Where the selected technology is used">
            <div className="sticky top-28">
              <UsagePanel skill={shown} />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
