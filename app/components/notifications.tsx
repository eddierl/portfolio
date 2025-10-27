"use client";
import { Toaster } from "app/components/sonner";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useReadLocalStorage } from "usehooks-ts";

export const Notifications = (props: { isThereNewBlog: boolean }) => {
  const lastSeenDate =
    useReadLocalStorage<string>("last-seen") || new Date(0).toISOString();

  const showNotification = dayjs(lastSeenDate).isBefore(
    dayjs().subtract(14, "day")
  );

  useEffect(() => {
    if (props.isThereNewBlog && showNotification) {
      const id = toast.success(
        <div className="flex items-center justify-between w-full animate-in slide-in-from-top-2 duration-300 gap-8">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 animate-in fade-in duration-500 delay-100">
              🎉 New Blog Post!
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400 animate-in fade-in duration-500 delay-200">
              Fresh content just published
            </span>
          </div>

          <Link
            href="/blog"
            onClick={() => toast.dismiss(id)}
            className="group inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 rounded-full transition-all"
          >
            <span className="mr-1">Read Now</span>
            <svg
              className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Right Arrow</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>,
        {
          duration: 8000,
          className: "animate-in slide-in-from-top-2 duration-300",
        }
      );
    }
  }, [props.isThereNewBlog, showNotification]);

  return <Toaster position="top-center" />;
};
