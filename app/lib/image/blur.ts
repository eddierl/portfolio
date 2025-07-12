import path from "path";
import fs from "fs";
import sharp from "sharp";

export const blur = async (image: string) => {
  const imagePath = path.join(process.cwd(), "public", image);

  const imageBuffer = fs.readFileSync(imagePath);

  const filteredBuffer = await sharp(imageBuffer).resize(16).blur().toBuffer();

  const base64Image = `data:image/jpeg;base64,${filteredBuffer.toString(
    "base64"
  )}`;

  console.log(base64Image);
  return base64Image;
};
