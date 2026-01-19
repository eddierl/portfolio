type Skill = {
  name: string;
  icon: string;
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
        icon: "./icons/nextjs-original.svg",
      },
      {
        name: "React",
        icon: "./icons/react-original.svg",
      },
      {
        name: "Tailwind",
        icon: "./icons/tailwindcss-original.svg",
      },
      {
        name: "TypeScript",
        icon: "./icons/typescript-original.svg",
      },
      {
        name: "React Native",
        icon: "./icons/reactnative-original.svg",
      },
      {
        name: "Sequelize",
        icon: "./icons/sequelize-original.svg",
      },
    ],
  },
  {
    category: "Testing",
    skills: [
      {
        name: "Playwright",
        icon: "./icons/playwright-original.svg",
      },
      {
        name: "Jest",
        icon: "./icons/jest-plain.svg",
      },
      {
        name: "Cypress",
        icon: "./icons/cypressio-original.svg",
      },
    ],
  },
  {
    category: "Cloud & Databases",
    skills: [
      {
        name: "GCP",
        icon: "./icons/googlecloud-original.svg",
      },

      {
        name: "MongoDB",
        icon: "./icons/mongodb-original.svg",
      },
      {
        name: "GraphQL",
        icon: "./icons/graphql-plain.svg",
      },
      {
        name: "AWS",
        icon: "./icons/amazonwebservices-plain-wordmark.svg",
      },
      {
        name: "PostgreSQL",
        icon: "./icons/postgresql-original.svg",
      },
    ],
  },
  {
    category: "Tools",
    skills: [
      {
        name: "GitHub",
        icon: "./icons/github-original.svg",
        className: "dark:invert",
      },
      {
        name: "CircleCI",
        icon: "./icons/circleci-plain.svg",
        className: "dark:invert",
      },
    ],
  },
];
