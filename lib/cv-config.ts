// Styling configuration
export const cvStyles = {
  colors: {
    black: "#000000",
    darkSidebar: "#1b212f",
    white: "#ffffff",
    lightGray: "#999999",
  },
  fonts: {
    primary: "Lato",
    secondary: "Oswald",
  },
  sizes: {
    name: 24,
    title: 8,
    sectionHeader: 12,
    jobTitle: 9.25,
    bodyText: 9.25,
    dateText: 7,
    sidebarHeader: 10,
    sidebarText: 8,
  },
  spacing: {
    pageMargin: 24,
    sidebarWidth: 160,
    sectionGap: 3,
    jobGap: 4,
    bulletIndent: 10,
  },
} as const;

// CV Content configuration
export const cvContent = {
  personal: {
    name: "Eddie Erlich",
    title: "SENIOR SOFTWARE ENGINEER",
    email: "eddie@erlich.dev",
  },
  profile: `Senior Software Engineer with <b>over 10 years</b> of experience designing and delivering scalable web and mobile applications. Demonstrates strong expertise in TypeScript and React, with a solid foundation in testing practices and cloud-native development on <b>AWS</b>, including services such as Lambda, SQS, SNS, S3, ECS, and CloudFront. Proven track record in leading system migrations, optimizing performance, and accelerating development through <b>AI-assisted tools</b> and workflows, including <b>Gemini, Claude, RooCode, Codex, and MCP-based</b> approaches. Holds full working rights in Australia.`,

  employment: [
    {
      title: "Senior Software Engineer",
      company: "Rhino Eco",
      dateRange: "MARCH 2023 — JULY 2025",
      techStack: [
        "Next.js",
        "React",
        "MongoDB",
        "GCP",
        "Zod",
        "Redis",
        "Playwright",
        "Tailwind",
      ].join(", "),
      achievements: [
        "Built a solar financing platform that transformed a 4-day manual quoting process into an automated single-screen application, reducing turnaround time to <b>minutes</b>.",
        "Migrated E2E testing from Cypress to Playwright, improving test execution performance by <b>30%</b> and enhancing CI/CD reliability.",
        "Implemented Tailwind CSS across the codebase, standardizing styling and significantly improving developer experience (DevEx).",
        "Managed GCP integration and optimized CI/CD pipelines to streamline deployment workflows and improve release frequency.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Venn",
      dateRange: "JULY 2021 — MARCH 2023",
      techStack: [
        "React Native",
        "AWS",
        "Microservices",
        "GraphQL",
        "Postgres",
        "NX",
      ].join(", "),
      achievements: [
        "Led development of a React Native mobile application deployed across 7 U.S. states, increasing user engagement by <b>35%</b>.",
        "Migrated the codebase to an NX monorepo architecture, reducing onboarding time for new engineers and optimizing build processes.",
        "Maintained and optimized a distributed system of <b>10+ microservices</b>, ensuring high availability and system reliability.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Autodesk",
      dateRange: "APRIL 2019 — JULY 2021",
      techStack: ["TypeScript", "Design Systems", "Jest", "Cypress"].join(", "),
      achievements: [
        "Maintained a core TypeScript design system used by <b>20+ global engineering teams</b>, ensuring backward compatibility and stability.",
        "Implemented a comprehensive testing strategy using Jest and Cypress, reducing critical production bugs by <b>40%</b>.",
        "Led the migration of <b>100+ legacy UI components</b> to a modern, scalable architecture, improving maintainability and performance.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Wix.com",
      dateRange: "DECEMBER 2015 — APRIL 2019",
      techStack: ["Angular", "React", "TypeScript"].join(", "),
      achievements: [
        "Technical Lead for the Wix Inbox team (<b>1M+ users</b>), guiding the migration from AngularJS to React.",
        // "Delivered internal workshops on ReasonML to 100+ engineers, promoting adoption of functional programming patterns.",
        "Contributed to internal design systems and open-source libraries, accelerating company-wide development efforts.",
      ],
    },
  ],
  details: {
    location: "Morley, WA 6062",
    country: "Australia",
    phone: "0461 467 018",
    email: "eddie@erlich.dev",
  },
  education: [
    "B.Sc. in Computer Science",
    "Ben Gurion University",
    "OCT 2012 — MARCH 2016",
  ],
  links: [
    {
      label: "linkedin.com/in/eddie-erlich",
      url: "https://linkedin.com/in/eddie-erlich",
    },
    {
      label: "github.com/eddierl",
      url: "https://github.com/eddierl",
    },
    {
      label: "erlich.dev",
      url: "https://erlich.dev",
    },
  ],
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind",
    "Jest",
    "Playwright",
    "TDD",
    "AWS",
    "GCP",
    "Async Processing",
    "MongoDB",
    "GraphQL",
    "React Native",
    "Zod",
    "Turborepo",
  ],
  languages: ["English (Fluent)", "Hebrew (Native)"],
  references: ["Available on request"],
};
