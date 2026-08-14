import { typedEntries } from "app/lib/types";
import Link from "next/link";
import { CV_FILE_NAME } from "@/lib/constants";
import { isAuthenticated } from "../admin/actions";
import { metaData } from "../lib/config";
import { ThemeSwitch } from "./theme-switch";

const navItems = {
  "/blog": { name: "Blog" },
  "/skills": { name: "Skills" },
  // "/photos": { name: "Photos" },
  [CV_FILE_NAME as "/"]: {
    name: "Resume",
  },
};

export async function Navbar() {
  const authed = await isAuthenticated();
  return (
    <nav className="mb-12 py-5 lg:mb-16">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="font-semibold text-3xl tracking-tight text-[var(--text)]"
          >
            {metaData.title}
          </Link>
        </div>
        <div className="mt-6 flex flex-row items-center gap-4 md:mt-0 md:ml-auto">
          {authed ? (
            <Link
              href="/admin"
              className="relative flex align-middle text-base text-[var(--dim)] transition-all hover:text-[var(--accent)]"
            >
              Admin
            </Link>
          ) : null}

          {typedEntries(navItems).map(([path, { name, ...rest }]) => (
            <Link
              key={path}
              href={path}
              className="relative flex align-middle text-base text-[var(--dim)] transition-all hover:text-[var(--accent)]"
              {...rest}
            >
              {name}
            </Link>
          ))}

          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}