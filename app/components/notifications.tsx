"use client";
import { Toaster } from "app/components/sonner";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export const Notifications = (props: { isThereNewBlog: boolean }) => {
  useEffect(() => {
    if (props.isThereNewBlog)
      toast.info(
        <div>
          There is{" "}
          <Link
            className="transition-all hover:text-neutral-800 underline dark:hover:text-neutral-200 relative"
            href="/blog"
          >
            a new blog!
          </Link>
        </div>
      );
  }, []);

  return <Toaster position="top-center" />;
};
