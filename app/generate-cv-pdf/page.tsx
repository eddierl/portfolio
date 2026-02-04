import ReactPDF from "@react-pdf/renderer";
import { CVDocument } from "@/app/components/cv/document";
import { CV_FILE_NAME } from "@/lib/constants";

export default async function CreateCVPdf() {
  await ReactPDF.renderToFile(<CVDocument />, `./public${CV_FILE_NAME}`);
  return null;
}
