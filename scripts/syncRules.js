const fs = require("fs");
const path = require("path");

const rulesDir = path.join(__dirname, "../.cursor/rules");
const outputFile = path.join(__dirname, "../.windsurfrules");

fs.readdir(rulesDir, (err, files) => {
  if (err) {
    console.error("Error reading rules directory:", err);
    return;
  }

  let combinedContent = "";

  files.forEach((file) => {
    const filePath = path.join(rulesDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    combinedContent += content + "\n";
  });

  fs.writeFileSync(outputFile, combinedContent, "utf8");
  console.log("Rules have been synchronized into .windsurfrules");
});
