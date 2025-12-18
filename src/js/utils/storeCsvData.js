import fs from "fs";
import path from "path";
import { parse } from "json2csv";


function timestampToDate(ts) {
  return new Date(Number(ts) * 1000).toISOString().split("T")[0];
}

const dir = path.join(".", "data");
const filePath = path.join(dir, "fear_greed.csv");


export function storeDataCSV(data, fetchType) {
  if (!data || data.length === 0) {
    console.log("No data to store");
    return;
  }

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const formattedData = data.map(item => ({
    fetch_type: fetchType,
    date: timestampToDate(item.timestamp),
    timestamp: item.timestamp,
    value: item.value,
    value_classification: item.value_classification
  }));

  const fields = [
    "fetch_type",
    "date",
    "timestamp",
    "value",
    "value_classification"
  ];

  const csv = parse(formattedData, {
    fields,
    header: !fs.existsSync(filePath)
  });

  fs.appendFileSync(filePath, csv + "\n");

  console.log(`Stored ${data.length} rows (${fetchType})`);
}


export function getAllCSVData() {
  if (!fs.existsSync(filePath)) {
    console.log("CSV file not found");
    return [];
  }

  const content = fs.readFileSync(filePath, "utf-8");
  return content;
}
