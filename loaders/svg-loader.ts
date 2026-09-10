const { optimize } = require("svgo");
const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = function (content: string) {
  (this as { cacheable?: () => void }).cacheable?.();

  const optimized = optimize(content);
  const src = svgToMiniDataURI(optimized.data);
  const result = {
    src,
    width: 128,
    height: 128,
  };

  return `export default ${JSON.stringify(result)};`;
};
