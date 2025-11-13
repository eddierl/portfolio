import { typedEntries } from "app/lib/types";
import Link from "next/link";
import { isAuthenticated } from "../admin/actions";
import { metaData } from "../lib/config";
import { ThemeSwitch } from "./theme-switch";

const navItems = {
  "/blog": { name: "Blog" },
  "/skills": { name: "Skills" },
  // "/photos": { name: "Photos" },
  "/Edward_Erlich_-_Senior_Software_Engineer_CV.pdf": {
    name: "Resume",
    target: "_blank",
  },
};

export async function Navbar() {
  const authed = await isAuthenticated();
  return (
    <nav className="lg:mb-16 mb-12 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-3xl font-semibold">
            {metaData.title}
          </Link>
        </div>
        <div className="flex flex-row gap-4 mt-6 md:mt-0 md:ml-auto items-center">
          {authed ? (
            <Link
              href="/admin"
              className="transition-all hover:text-neutral-800 hover:underline dark:hover:text-neutral-200 flex align-middle relative"
            >
              Admin
            </Link>
          ) : null}

          {typedEntries(navItems).map(([path, { name, ...rest }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-neutral-800 
              hover:underline dark:hover:text-neutral-200 flex align-middle relative"
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
