import SkillGroups from "app/components/skill-groups";
import { metaData } from "@/app/lib/config";
import { skillGroups } from "@/app/lib/skills";

export default () => (
  <section>
    <script
      type="application/ld+json"
      suppressHydrationWarning
      // biome-ignore lint/security/noDangerouslySetInnerHtml: I guess this is need for application/ld+json
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Skills",
          description: `${metaData.name}'s technical skills across languages and frameworks, testing, cloud and databases, and developer tools.`,
          url: `${metaData.baseUrl}/skills`,
          hasPart: skillGroups.map(({ category, skills }) => ({
            "@type": "DefinedTermSet",
            name: category,
            hasDefinedTerm: skills.map((skill) => ({
              "@type": "DefinedTerm",
              name: skill.name,
              inDefinedTermSet: {
                "@type": "DefinedTermSet",
                name: category,
              },
            })),
          })),
        }),
      }}
    />
    <SkillGroups />
  </section>
);
