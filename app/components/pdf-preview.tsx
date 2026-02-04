"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { CVDocument } from "@/app/components/cv/document";

export default () => {
  return (
    <PDFViewer className="h-screen w-full">
      <CVDocument />
    </PDFViewer>
  );
};
