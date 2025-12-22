// @ts-ignore
import { writeFileSync } from "fs";
// @ts-ignore
import { parse } from "json2csv";

/* ---------------- TYPES (INLINE – REQUIRED IN WINDMILL) ---------------- */

type FearGreedRecord = {
  timestamp: string;
  value: number;
  value_classification: string;
};

/* ---------------- HELPERS ---------------- */

function timestampToDateTime(ts: string | number): string {
  return new Date(Number(ts) * 1000).toISOString();
}

/* ---------------- MAIN WINDMILL FUNCTION ---------------- */

/**
 * Stores Fear & Greed data as CSV
 * @param data API records
 * @returns CSV string (for next Windmill steps)
 */
export async function storeDataCSV(data: FearGreedRecord[], fetchType: string) {
  if (!data || data.length === 0) {
    throw new Error("No data received to store as CSV");
  }

  // Enrich data
  const enrichedData = data.map((record) => ({
    fetch_type: fetchType,
    timestamp: record.timestamp,
    date_time: timestampToDateTime(record.timestamp),
    value: record.value,
    value_classification: record.value_classification,
  }));

  // Convert to CSV
  const csv = parse(enrichedData, {
    fields: ["timestamp", "date_time", "value", "value_classification"],
  });

  // Temporary file path (Windmill-safe)
  const filePath = "/tmp/fear_greed.csv";

  writeFileSync(filePath, csv);

  console.log(`CSV written to ${filePath}`);

  return {
    file_path: filePath,
    rows: enrichedData.length,
    csv, // important: lets next steps reuse data
  };
}
