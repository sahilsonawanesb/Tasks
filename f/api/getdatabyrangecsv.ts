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

export async function getDataByRangeCSV(
  start: string,
  end: string,
  filePath: string
): Promise<FearGreedCSVRecord[]> {
  const allData = await readCSV(filePath);
  if (!allData || allData.length === 0) return [];

  const startDate = new Date(start);
  const endDate = new Date(end);

  const filteredData = allData.filter((item) => {
    const itemDate = new Date(Number(item.timestamp) * 1000);
    return itemDate >= startDate && itemDate <= endDate;
  });

  filteredData.forEach((item) => (item.fetch_type = `range_${start}_to_${end}`));

  await exportCSV(filteredData);

  return filteredData;
}
