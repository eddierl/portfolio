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
    sidebarWidth: 200,
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
  profile: `Senior Software Engineer with 10 years of experience building scalable web and mobile applications. Strong in TypeScript, React, testing, and <b>AWS cloud services</b> including Lambda, SQS, SNS, S3, ECS, and CloudFront. Proven in system migrations, performance improvements, and <b>AI-assisted development</b> using tools such as <b>Gemini, Claude, RooCode, Codex</b>, and MCP-based workflows. Holds full working rights in Australia.`,
  education: [
    {
      degree: "B.Sc. in Computer Science, Ben Gurion University",
      dateRange: "OCTOBER 2012 — MARCH 2016",
    },
  ],
  employment: [
    {
      title: "Senior Software Engineer",
      company: "Rhino Eco",
      dateRange: "MARCH 2023 — JULY 2025",
      techStack: [
        "React",
        "Next.js",
        "MongoDB",
        "GCP",
        "Playwright",
        "Tailwind",
      ].join(", "),
      achievements: [
        "Delivered a financing platform for solar installers, an intuitive and efficient solar system design tool that reduced lead-to-offer time from <b>4 days to minutes</b>.",
        "Migrated test suites from Cypress to Playwright, enhancing E2E <b>performance by 30%</b>.",
        "Championed Tailwind adoption for improved UI consistency across the project.",
        "Integrated GCP services for secure data storage and scaling.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Venn",
      dateRange: "JULY 2021 — MARCH 2023",
      techStack: ["React Native", "AWS", "Microservices", "GraphQL", "NX"].join(
        ", ",
      ),
      achievements: [
        "Developed a React Native mobile app serving neighborhoods in 7 U.S. states, improving <b>engagement by 35%</b>.",
        "Maintained and evolved a distributed AWS-based microservices architecture with <b>10+ services</b>.",
        "Set up a monorepo with NX, reducing build complexity and developer onboarding.",
        "Contributed to a Remix-based back office platform.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Autodesk",
      dateRange: "APRIL 2019 — JULY 2021",
      techStack: ["TypeScript", "Design Systems", "Jest", "Cypress"].join(", "),
      achievements: [
        "Maintained a TypeScript-based design library used by <b>20+ global teams</b>.",
        "Spearheaded the creation and rollout of comprehensive unit testing strategy using Jest and Cypress, resulting in a <b>40% reduction</b> in critical bugs post-release.",
        "Migrated <b>100+ UI components</b> to a modern, scalable architecture.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Wix.com",
      dateRange: "DECEMBER 2015 — APRIL 2019",
      techStack: ["Angular", "React", "TypeScript"].join(", "),
      achievements: [
        "Acted as technical lead in the Wix Inbox team (<b>1M+ users</b>), guiding a team through a large-scale migration from AngularJS to React.",
        "Delivered a ReasonML workshop for <b>100+ engineers</b>, fostering adoption of modern functional programming techniques.",
        "Contributed to internal design systems and open-source libraries, accelerating company-wide development.",
      ],
    },
  ],
  details: {
    location: "Morley, WA 6062",
    country: "Australia",
    phone: "0461 467 018",
    email: "eddie@erlich.dev",
  },
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
    "MongoDB",
    "GraphQL",
    "React Native",
    "Turborepo",
  ],
  languages: ["English (Fluent)", "Hebrew (Native)"],
};
