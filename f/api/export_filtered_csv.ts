import fs from "fs";
import path from "path";
import { parse } from "json2csv";

export type FearGreedCSVRecord = {
  fetch_type: string;
  date: string;
  timestamp: string;
  value: string;
  value_classification: string;
};

/**
 * Windmill script: Export filtered data to CSV
 */
export async function main(
  data: FearGreedCSVRecord[],
  outputDir: string = "data",
  fileName: string = "fear_greed_all.csv"
): Promise<string | null> {
  try {
    if (!data || data.length === 0) {
      console.log("No data to export");
      return null;
    }

    const folderPath = path.resolve(process.cwd(), outputDir);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.join(folderPath, fileName);

    const csv = parse(data, {
      header: !fs.existsSync(filePath),
    });

    fs.appendFileSync(filePath, csv + "\n");

    console.log(`CSV exported successfully: ${filePath}`);
    return filePath;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`CSV export failed: ${error.message}`);
    }
    throw new Error("Unknown error while exporting CSV");
  }
}
