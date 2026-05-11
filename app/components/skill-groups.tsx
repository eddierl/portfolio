import { skillGroups } from "../lib/skills";

export default function SkillGroups() {
  return (
    <section className="mt-8">
      <h2 className="mb-4 font-medium text-2xl">Latest Skills</h2>
      <div className="space-y-6">
        {skillGroups.map((group, _groupIndex) => (
          <div key={group.category}>
            <h3 className="mb-2 font-medium text-lg">{group.category}</h3>
            <div className="flex flex-wrap gap-4">
              {group.skills.map(({ name, Icon, className }) => (
                <div
                  key={name}
                  className="group flex select-none items-center space-x-2 grayscale-50 transition-transform duration-200 hover:scale-105 hover:grayscale-0"
                >
                  <span className="text-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                    <Icon className={["size-6", className].join(" ")} />
                  </span>
                  <span className="text-sm">{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
