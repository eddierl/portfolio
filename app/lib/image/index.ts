import fs from "node:fs";
import path from "node:path";
import sharp, { type Sharp } from "sharp";

export const getSharpImage = (imagePath: string) => {
  const imageFullPath = path.join(process.cwd(), "public", imagePath);
  const imageBuffer = fs.readFileSync(imageFullPath);
  const sharpImage = sharp(imageBuffer);
  return sharpImage;
};

export const getBlurBuffer = async (image: Sharp) => {
  return image.resize(16).blur().toBuffer();
};
