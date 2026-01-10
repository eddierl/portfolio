import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { PDFDocument } from "pdf-lib";

test("generate cv as pdf", async ({ page }) => {
  await page.goto("/cv");
  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    printBackground: true,
    scale: 1,
  });
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pageCount = pdfDoc.getPageCount();

  expect(pageCount, "PDF page count").toBe(1);

  console.log("✅ CV PDF generated: 1 page ✓");

  fs.writeFileSync(
    path.join(process.cwd(), "public", "Edward_Erlich_CV.pdf"),
    pdfBuffer,
  );
});
