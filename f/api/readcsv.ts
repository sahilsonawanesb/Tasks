import fs from "fs";
import csv from "csv-parser";

export type FearGreedCSVRecord = {
  fetch_type: string;
  date: string;
  timestamp: string;
  value: string;
  value_classification: string;
};

/**
 * Windmill script: Read CSV file and return rows
 */
export async function main(filePath: string): Promise<FearGreedCSVRecord[]> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`CSV file not found at path: ${filePath}`));
    }

    const results: FearGreedCSVRecord[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push(row as FearGreedCSVRecord);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
