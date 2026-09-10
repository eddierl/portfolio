const { optimize } = require("svgo");
const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = function (content: string) {
  (this as { cacheable?: () => void }).cacheable?.();

  const optimized = optimize(content);
  const src = svgToMiniDataURI(optimized.data);
  const bounds =
    content.match(/\sviewBox=(['"])(.+?)\1/i)?.[2] || "0 0 128 128";
  console.log({ bounds });
  const [, , width, height] = bounds.split(/\s+/);
  const result = {
    src,
    width,
    height,
  };

  return `export default ${JSON.stringify(result)};`;
};
