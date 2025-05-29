const fs = require("node:fs");
const path = require("node:path");

const rulesDir = path.join(__dirname, "../.cursor/rules");
const outputFile = path.join(__dirname, "../.windsurfrules");

fs.readdir(rulesDir, (err, files) => {
  if (err) {
    console.error("Error reading rules directory:", err);
    return;
  }

  let combinedContent = "";

  for (const file of files) {
    const filePath = path.join(rulesDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    combinedContent += `${content}\n`;
  }

  fs.writeFileSync(outputFile, combinedContent, "utf8");
  console.log("Rules have been synchronized into .windsurfrules");
});
