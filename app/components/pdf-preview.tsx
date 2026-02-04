"use client";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then(({ PDFViewer }) => PDFViewer),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

import { CVDocument } from "@/app/components/cv/document";

export default () => {
  return (
    <PDFViewer className="h-screen w-full">
      <CVDocument />
    </PDFViewer>
  );
};
