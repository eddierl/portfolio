import { pdf } from "@react-pdf/renderer";
import { CVDocument } from "@/app/components/cv-document";

export const dynamic = "force-dynamic";
export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  try {
    const buffer = await pdf(<CVDocument />).toBuffer();

    return new Response(buffer as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Edward_Erlich_-_Senior_Software_Engineer_CV.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new Response("Failed to generate PDF", { status: 500 });
  }
}
