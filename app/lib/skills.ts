type Skill = {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
};

type SkillGroup = {
  category: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages & Frameworks",
    skills: [
      {
        name: "Next.js",
        icon: require("@/public/icons/nextjs-original.svg").default,
      },
      {
        name: "React",
        icon: require("@/public/icons/react-original.svg").default,
      },
      {
        name: "Tailwind",
        icon: require("@/public/icons/tailwindcss-original.svg").default,
      },
      {
        name: "TypeScript",
        icon: require("@/public/icons/typescript-original.svg").default,
      },
      {
        name: "React Native",
        icon: require("@/public/icons/reactnative-original.svg").default,
      },
      {
        name: "Sequelize",
        icon: require("@/public/icons/sequelize-original.svg").default,
      },
    ],
  },
  {
    category: "Testing",
    skills: [
      {
        name: "Playwright",
        icon: require("@/public/icons/playwright-original.svg").default,
      },
      {
        name: "Jest",
        icon: require("@/public/icons/jest-plain.svg").default,
      },
      {
        name: "Cypress",
        icon: require("@/public/icons/cypressio-original.svg").default,
      },
    ],
  },
  {
    category: "Cloud & Databases",
    skills: [
      {
        name: "GCP",
        icon: require("@/public/icons/googlecloud-original.svg").default,
      },

      {
        name: "MongoDB",
        icon: require("@/public/icons/mongodb-original.svg").default,
      },
      {
        name: "GraphQL",
        icon: require("@/public/icons/graphql-plain.svg").default,
      },
      {
        name: "AWS",
        icon: require("@/public/icons/amazonwebservices-plain-wordmark.svg")
          .default,
      },
      {
        name: "PostgreSQL",
        icon: require("@/public/icons/postgresql-original.svg").default,
      },
    ],
  },
  {
    category: "Tools",
    skills: [
      {
        name: "GitHub",
        icon: require("@/public/icons/github-original.svg").default,
        className: "dark:invert",
      },
      {
        name: "CircleCI",
        icon: require("@/public/icons/circleci-plain.svg").default,
        className: "dark:invert",
      },
    ],
  },
];
