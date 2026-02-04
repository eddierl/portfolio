import PdfPreview from "@/app/components/pdf-preview";
import RefreshButton from "@/app/components/refresh-button";

export default function AdminPDFPage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 bg-white dark:bg-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              PDF Preview
            </h1>
          </div>
          <RefreshButton className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors" />
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden w-full h-full">
        <PdfPreview />
      </div>
    </div>
  );
}
