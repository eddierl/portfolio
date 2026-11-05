import { ProjectCard } from "app/components/project-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured projects by Eddie Erlich — Tic-Tac-Toe, Portfolio, and DocFlow.",
  alternates: { canonical: "https://www.erlich.dev/projects" },
};

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="section-heading mb-8">Projects</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Tic-Tac-Toe */}
        <ProjectCard
          title="Tic-Tac-Toe"
          description="A multiplayer game with real-time WebSockets, unbeatable AI (Minimax), full accessibility, and Playwright E2E tests."
          tags={["React", "TanStack Start", "WebSockets", "Playwright", "TDD"]}
          liveUrl="https://ttt.erlich.dev"
          codeUrl="https://github.com/eddierl/tic-tac-toe"
          imageUrl="/tic-tac-toe.png"
        />

        {/* Portfolio */}
        <ProjectCard
          title="Portfolio"
          description="This site — Next.js App Router, Tailwind, MDX blog, Supabase, sitemap, and Open Graph integration."
          tags={["Next.js", "TypeScript", "Tailwind", "MDX", "Supabase"]}
          liveUrl="https://www.erlich.dev"
          codeUrl="https://github.com/eddierl/portfolio"
          imageUrl="/logo.png"
        />

        {/* DocFlow */}
        <ProjectCard
          title="DocFlow"
          description="Event-driven monorepo with AWS SQS, Dead Letter Queues, Terraform IaC, Docker, and Playwright E2E tests."
          tags={[
            "Turborepo",
            "AWS SQS",
            "Terraform",
            "Docker",
            "Playwright",
            "PostgreSQL",
          ]}
          codeUrl="https://github.com/eddierl/docflow"
          imageUrl="/icons/amazonwebservices-plain-wordmark.svg"
        />
      </div>
    </section>
  );
}
