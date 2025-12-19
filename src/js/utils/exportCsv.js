import fs from "fs";
import { parse } from "json2csv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function exportFilteredCSV(data, fileName = "fear_greed_all.csv") {
  try {
    if (!data || data.length === 0) return;

    const folderPath = path.join(__dirname, "data");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.join(folderPath, fileName);

    const csv = parse(data, { header: !fs.existsSync(filePath) });

    
    fs.appendFileSync(filePath, csv + "\n");

    console.log(`CSV exported successfully: ${filePath}`);
  } catch (error) {
    console.log("Error exporting CSV:", error.message);
  }
}
