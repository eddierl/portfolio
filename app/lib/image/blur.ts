import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

export const blur = async (image: string) => {
  try {
    const imagePath = path.join(process.cwd(), "public", image);

    const imageBuffer = fs.readFileSync(imagePath);

    const filteredBuffer = await sharp(imageBuffer)
      .resize(16)
      .blur()
      .toBuffer();

    const base64Image = `data:image/jpeg;base64,${filteredBuffer.toString(
      "base64",
    )}`;

    return [undefined, base64Image] as const;
  } catch (e) {
    return [e, undefined] as const;
  }
};
