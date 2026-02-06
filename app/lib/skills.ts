type Skill = {
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
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
        Icon: require("@/public/icons/nextjs-original.svg").default,
      },
      {
        name: "React",
        Icon: require("@/public/icons/react-original.svg").default,
      },
      {
        name: "Tailwind",
        Icon: require("@/public/icons/tailwindcss-original.svg").default,
      },
      {
        name: "TypeScript",
        Icon: require("@/public/icons/typescript-original.svg").default,
      },
      {
        name: "React Native",
        Icon: require("@/public/icons/reactnative-original.svg").default,
      },
      {
        name: "Sequelize",
        Icon: require("@/public/icons/sequelize-original.svg").default,
      },
    ],
  },
  {
    category: "Testing",
    skills: [
      {
        name: "Playwright",
        Icon: require("@/public/icons/playwright-original.svg").default,
      },
      {
        name: "Jest",
        Icon: require("@/public/icons/jest-plain.svg").default,
      },
      {
        name: "Cypress",
        Icon: require("@/public/icons/cypressio-original.svg").default,
      },
    ],
  },
  {
    category: "Cloud & Databases",
    skills: [
      {
        name: "GCP",
        Icon: require("@/public/icons/googlecloud-original.svg").default,
      },

      {
        name: "MongoDB",
        Icon: require("@/public/icons/mongodb-original.svg").default,
      },
      {
        name: "GraphQL",
        Icon: require("@/public/icons/graphql-plain.svg").default,
      },
      {
        name: "AWS",
        Icon: require("@/public/icons/amazonwebservices-plain-wordmark.svg")
          .default,
      },
      {
        name: "PostgreSQL",
        Icon: require("@/public/icons/postgresql-original.svg").default,
      },
    ],
  },
  {
    category: "Tools",
    skills: [
      {
        name: "GitHub",
        Icon: require("@/public/icons/github-original.svg").default,
        className: "dark:invert",
      },
      {
        name: "CircleCI",
        Icon: require("@/public/icons/circleci-plain.svg").default,
        className: "dark:invert",
      },
    ],
  },
];
