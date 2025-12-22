// Windmill script: get_data_by_date
import { parse } from "json2csv";
import fs from "fs";
import path from "path";

export type FearGreedCSVRecord = {
  fetch_type: string;
  date: string;
  timestamp: string;
  value: string;
  value_classification: string;
};

/**
 * Read CSV function (embedded inside Windmill script)
 */
export async function readCSV(filePath: string): Promise<FearGreedCSVRecord[]> {
  return new Promise((resolve, reject) => {
    const results: FearGreedCSVRecord[] = [];
    fs.createReadStream(filePath)
      .on("error", (err) => reject(err))
      .pipe(require("csv-parser")())
      .on("data", (data: FearGreedCSVRecord) => results.push(data))
      .on("end", () => resolve(results));
  });
}

/**
 * Export filtered CSV function (embedded inside Windmill script)
 */
export async function exportCSV(
  data: FearGreedCSVRecord[],
  outputDir: string = "data",
  fileName: string = "fear_greed_all.csv"
): Promise<string | null> {
  if (!data || data.length === 0) return null;

  const folderPath = path.resolve(process.cwd(), outputDir);
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

  const filePath = path.join(folderPath, fileName);
  const csv = parse(data, { header: !fs.existsSync(filePath) });
  fs.appendFileSync(filePath, csv + "\n");

  return filePath;
}

/**
 * Main Windmill function
 */
export async function getDataByDateCSV(
  date: string,
  filePath: string
): Promise<FearGreedCSVRecord | null> {
  try {
    const allData = await readCSV(filePath);
    if (!allData || allData.length === 0) return null;

    const targetDate = new Date(date).toISOString().split("T")[0];

    const filteredData = allData.filter((item) => {
      const itemDate = new Date(Number(item.timestamp) * 1000).toISOString().split("T")[0];
      return itemDate === targetDate;
    });

    filteredData.forEach((item) => (item.fetch_type = `specific_date_${date}`));

    await exportCSV(filteredData);

    return filteredData[0] || null;
  } catch (error) {
    console.error("Error in getDataByDateCSV:", error);
    return null;
  }
}
