"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

// Dynamically load the PDF viewer wrapper with ssr: false
const PDFViewerWrapper = dynamic(
  () => import("@/app/cv-preview/pdf-viewer-wrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full text-neutral-500">
        Loading PDF...
      </div>
    ),
  },
);

function CVPreviewContent() {
  return <PDFViewerWrapper />;
}

export default function CVPreview() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">CV Preview</h1>
            <div className="flex gap-4">
              <a
                href="/api/cv-pdf"
                download="Edward_Erlich_-_Senior_Software_Engineer_CV.pdf"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Download PDF
              </a>
              <Link
                href="/"
                className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
              >
                Back
              </Link>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full text-neutral-500">
                Loading viewer...
              </div>
            }
          >
            <CVPreviewContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
