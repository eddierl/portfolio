"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { CVDocument } from "@/app/components/cv-document";

export default function PDFViewerWrapper() {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <CVDocument />
    </PDFViewer>
  );
}
