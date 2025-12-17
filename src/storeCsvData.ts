import fs from "fs";
import { parse } from "json2csv";
import type { FearGreedRecord } from "./types.js";
import path from "path";

export function storeDataCSV(data: FearGreedRecord[]): void {
  if (!data || data.length === 0) {
    console.error("No data to store in CSV");
    return;
  }

  try {
    const csv = parse(data, { fields: ["timestamp", "value", "value_classification"] });

    const dir = path.join(".", "data");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fs.writeFileSync(path.join(dir, "fear_greed.csv"), csv);

    console.log(`CSV saved with ${data.length} rows`);
  } catch (err: any) {
    console.error("Error converting/writing CSV:", err.message);
  }
}
