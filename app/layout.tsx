import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Notifications } from "app/components/notifications";
import { getBlogPosts } from "app/lib/posts";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import { ThemeProvider } from "./components/theme-switch";
import { metaData } from "./lib/config";

const mainFontFamily = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
  openGraph: {
    images: metaData.ogImage,
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: metaData.name,
    card: "summary_large_image",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allBlogs = getBlogPosts();
  const aWeekAgo = dayjs().subtract(1, "week");
  const isThereNewBlog = allBlogs.some((blog) =>
    dayjs(blog.metadata.publishedAt).isAfter(aWeekAgo),
  );

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${mainFontFamily.className}`}
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title="RSS Feed"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          href="/atom.xml"
          title="Atom Feed"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href="/feed.json"
          title="JSON Feed"
        />
        <script async src="https://scripts.simpleanalyticscdn.com/latest.js" />
      </head>
      <body className="antialiased flex flex-col items-center justify-center mx-auto mt-2 lg:mt-8 mb-12">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex-auto min-w-0 mt-2 md:mt-6 flex flex-col px-6 sm:px-4 md:px-0 max-w-[624px] w-full">
            <Navbar />
            {children}
            <Notifications isThereNewBlog={isThereNewBlog} />
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
