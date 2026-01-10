import type React from "react";

const CV: React.FC = () => {
  return (
    <div className="mx-auto relative p-8 text-black  overflow-hidden">
      {/* Header */}
      <div className="bottom-0 w-screen bg-white absolute top-0 left-0 -z-10"></div>
      <header className="mb-8 font-cv-header">
        <h1 className="text-4xl font-bold text-gray-900">Edward Erlich</h1>
        <h2 className="text-xs text-gray-700 mt-2">SENIOR SOFTWARE ENGINEER</h2>
      </header>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        <div className="md:col-span-2">
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Profile
            </h3>
            <p className="text-xs leading-relaxed">
              Senior Software Engineer with 9+ years' experience delivering
              scalable web and mobile apps. Skilled in TypeScript, React, and
              modern testing, with a record of driving system migrations,
              boosting performance, and mentoring teams. Known for strong
              problem-solving, collaboration, and communication skills, with
              experience in global companies. Holds full working rights in
              Australia and eager to contribute expertise to the Australian
              market.
            </p>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Education
            </h3>
            <div className="text-xs">
              <p className="font-medium">
                B.Sc. in Computer Science, Ben Gurion University
              </p>
              <p className="text-gray-600">OCTOBER 2012 — MARCH 2016</p>
            </div>
          </section>

          {/* Employment History */}
          <section>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              Employment History
            </h3>

            {/* Rhino Eco */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold">
                  Senior Software Engineer, Rhino Eco
                </h4>
                <span className="text-xs text-gray-600">
                  MARCH 2023 — JULY 2025
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Tech stack: React, Next.js, MongoDB, GCP, Playwright, Tailwind
              </p>
              <ul className="text-xs list-disc list-inside space-y-1">
                <li>
                  Delivered a financing platform for solar installers, an
                  intuitive and efficient solar system design tool that reduced
                  lead-to-offer time from 4 days to minutes.
                </li>
                <li>
                  Migrated test suites from Cypress to Playwright, enhancing E2E
                  performance by 30%.
                </li>
                <li>
                  Championed Tailwind adoption for improved UI consistency
                  across the project.
                </li>
                <li>
                  Integrated GCP services for secure data storage and scaling.
                </li>
              </ul>
            </div>

            {/* Venn */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold">
                  Senior Software Engineer, Venn
                </h4>
                <span className="text-xs text-gray-600">
                  JULY 2021 — MARCH 2023
                </span>
              </div>
              <ul className="text-xs list-disc list-inside space-y-1">
                <li>
                  Developed a React Native mobile app serving neighborhoods in 7
                  U.S. states, improving neighborhood engagement by 35%.
                </li>
                <li>
                  Set up a monorepo with NX, reducing build complexity and
                  developer onboarding.
                </li>
                <li>
                  Maintained a complex infrastructure of over 10 microservices.
                </li>
                <li>Contributed to a Remix-based back office platform.</li>
              </ul>
            </div>

            {/* Autodesk */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold">
                  Senior Software Engineer, Autodesk
                </h4>
                <span className="text-xs text-gray-600">
                  APRIL 2019 — JULY 2021
                </span>
              </div>
              <ul className="text-xs list-disc list-inside space-y-1">
                <li>
                  Maintained a TypeScript-based design library used by 20+
                  global teams.
                </li>
                <li>
                  Spearheaded the creation and rollout of comprehensive unit
                  testing strategy using Jest and Cypress, resulting in a 40%
                  reduction in critical bugs post-release.
                </li>
                <li>
                  Migrated 100+ UI components to a modern, scalable
                  architecture.
                </li>
              </ul>
            </div>

            {/* Wix.com */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold">
                  Software Engineer, Wix.com
                </h4>
                <span className="text-xs text-gray-600">
                  DECEMBER 2015 — APRIL 2019
                </span>
              </div>
              <ul className="text-xs list-disc list-inside space-y-1">
                <li>
                  Acted as technical lead in the Wix Inbox team (1M+ users),
                  guiding a team through a large-scale migration from AngularJS
                  to React.
                </li>
                <li>
                  Delivered a ReasonML workshop for 100+ engineers, fostering
                  adoption of modern functional programming techniques.
                </li>
                <li>
                  Contributed to internal design systems and open-source
                  libraries, accelerating company-wide development.
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="md:col-span-1  text-white">
          <div className="bottom-0 w-screen bg-[#1B212F]  absolute top-0 -z-10 -ml-4"></div>
          {/* Details */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 ">Details</h3>
            <div className="text-xs  space-y-1">
              <p>Morley, WA 6062</p>
              <p>Australia</p>
              <p>0461 467 018</p>
              <p>eddie@erlich.dev</p>
            </div>
          </section>

          {/* Links */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Links</h3>
            <div className="text-xs space-y-1">
              {[
                "https://linkedin.com/eddierl",
                "https://github.com/eddierl",
                "https://erlich.dev",
              ].map((url) => (
                <a key={url} href={url} className="block">
                  {url.split(/https:\/\//)[1]}
                </a>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 ">Skills</h3>
            <ul className="text-xs list-none list-inside space-y-1">
              <li>TypeScript</li>
              <li>React</li>
              <li>Next.js</li>
              <li>Tailwind</li>
              <li>Jest</li>
              <li>Playwright</li>
              <li>TDD</li>
              <li>AWS</li>
              <li>GCP</li>
              <li>MongoDB</li>
              <li>GraphQL</li>
              <li>React Native</li>
              <li>Turborepo</li>
            </ul>
          </section>

          {/* Languages */}
          <section>
            <h3 className="text-xl font-semibold mb-4 ">Languages</h3>
            <div className="text-xs space-y-1">
              <p>Hebrew (Native)</p>
              <p>English (Fluent)</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CV;
