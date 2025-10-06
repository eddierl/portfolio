import { skillGroups } from "../lib/skills";

export default function SkillGroups() {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-medium">Latest Skills</h2>
      <div className="space-y-6">
        {skillGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="text-lg font-medium mb-2">{group.category}</h3>
            <div className="flex flex-wrap gap-4">
              {group.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-200  grayscale-50 hover:grayscale-0 select-none"
                >
                  <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    {skill.icon.startsWith("http") ? (
                      <img
                        className={["size-6", skill?.className].filter(Boolean).join(
                          " "
                        )}
                        src={skill.icon}
                        alt={skill.name}
                      />
                    ) : (
                      skill.icon
                    )}
                  </span>
                  <span className="text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}