"use client";

import { PDFViewer } from "@react-pdf/renderer";

import { CVDocument } from "@/app/components/cv/document";
export default function AdminPDFPage() {
  const reload = () => {
    window.location.reload();
  };
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 bg-white dark:bg-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              PDF Preview
            </h1>
          </div>
          <button
            onClick={reload}
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Refresh Now
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden w-full h-full">
        <PDFViewer className="h-screen w-full">
          <CVDocument />
        </PDFViewer>
      </div>
    </div>
  );
}
