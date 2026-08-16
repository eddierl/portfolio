import { skillGroups } from "../lib/skills";

export default function SkillGroups() {
  return (
    <section className="mt-10">
      <h2 className="section-heading">Skills</h2>
      <div className="space-y-8">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="mb-3 font-medium text-base text-[var(--color-dim)]">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map(({ name, Icon, className }) => (
                <span key={name} className="skill-chip">
                  <span className={["size-5", className].join(" ")}>
                    <Icon />
                  </span>
                  <span>{name}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
