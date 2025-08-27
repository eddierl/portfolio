"use client";
import { Toaster } from "app/components/sonner";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { useReadLocalStorage } from "usehooks-ts";

export const Notifications = (props: { isThereNewBlog: boolean }) => {
  const lastSeenDate =
    useReadLocalStorage<string>("last-seen") || new Date().toISOString();

  const showNotification = dayjs(lastSeenDate).isBefore(
    dayjs().subtract(7, "day")
  );

  useEffect(() => {
    if (props.isThereNewBlog && showNotification)
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
