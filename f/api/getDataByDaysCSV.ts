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

export async function getDataByDaysCSV(
  days: number = 7,
  filePath: string
): Promise<FearGreedCSVRecord[]> {
  const allData = await readCSV(filePath);
  if (!allData || allData.length === 0) return [];

  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - days + 1);

  const filteredData = allData.filter((item) => {
    const itemDate = new Date(Number(item.timestamp) * 1000);
    return itemDate >= startDate && itemDate <= today;
  });

  filteredData.forEach((item) => (item.fetch_type = `last_${days}_days`));

  await exportCSV(filteredData);

  return filteredData;
}
