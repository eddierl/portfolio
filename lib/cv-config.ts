// Styling configuration
export const cvStyles = {
  colors: {
    black: "#000000",
    darkSidebar: "#1b212f",
    white: "#ffffff",
    gray: "#666666",
    lightGray: "#999999",
  },
  fonts: {
    primary: "Lato",
    secondary: "Oswald",
  },
  sizes: {
    name: 32,
    title: 9,
    sectionHeader: 12,
    jobTitle: 9.25,
    bodyText: 9.25,
    dateText: 5,
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
};

// CV Content configuration
export const cvContent = {
  personal: {
    name: "Edward Erlich",
    title: "SENIOR SOFTWARE ENGINEER",
    email: "eddie@erlich.dev",
  },
  profile: `Senior Software Engineer with <b>9+ years'</b> experience delivering scalable web and mobile apps. Skilled in TypeScript, React, and modern testing, with proven success driving system migrations, boosting performance, and mentoring teams. Recently expanded into AI‑integrated development using agents.md, skills.md, MCPs, and various AI providers. Currently exploring <b>Go</b> for fun to strengthen backend and systems skills. Holds full working rights in Australia.`,
  education: [
    {
      degree: "B.Sc. in Computer Science, Ben Gurion University",
      dateRange: "OCT 2012 — MAR 2016",
    },
  ],
  employment: [
    {
      title: "Senior Software Engineer",
      company: "Rhino Eco",
      dateRange: "MAR 2022 — JUL 2025",
      techStack: "React, Next.js, MongoDB, GCP, Playwright, Tailwind",
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
      dateRange: "JUL 2021 — MAR 2022",
      techStack: "React Native, NX, GraphQL",
      achievements: [
        "Developed a React Native mobile app serving neighborhoods in 7 U.S. states, improving <b>engagement by 35%</b>.",
        "Set up a monorepo with NX, reducing build complexity and developer onboarding.",
        "Maintained complex infrastructure of over <b>10 microservices</b>.",
        "Contributed to a Remix-based back office platform.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Autodesk",
      dateRange: "APR 2019 — JUL 2021",
      techStack: "TypeScript, Design Systems, Jest, Cypress",
      achievements: [
        "Maintained a TypeScript-based design library used by <b>20+ global teams</b>.",
        "Spearheaded the creation and rollout of comprehensive unit testing strategy using Jest and Cypress, resulting in a <b>40% reduction</b> in critical bugs post-release.",
        "Migrated <b>100+ UI components</b> to a modern, scalable architecture.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Wix.com",
      dateRange: "DEC 2015 — APR 2019",
      techStack: "Angular, React, TypeScript",
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
    phone: "0461 447 018",
    email: "eddie@erlich.dev",
  },
  links: [
    {
      label: "linkedin.com/in/eddierl",
      url: "https://linkedin.com/in/eddierl",
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
  languages: ["Hebrew (Native)", "English (Fluent)"],
};
