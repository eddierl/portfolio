import PdfPreview from "@/app/components/pdf-preview";
import RefreshButton from "@/app/components/refresh-button";

export default function AdminPDFPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-900">
      <div className="border-neutral-200 border-b bg-white px-6 py-4 dark:border-neutral-800 dark:bg-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-2xl text-neutral-900 dark:text-neutral-100">
              PDF Preview
            </h1>
          </div>
          <RefreshButton className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600" />
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="h-full w-full flex-1 overflow-hidden">
        <PdfPreview />
      </div>
    </div>
  );
}
