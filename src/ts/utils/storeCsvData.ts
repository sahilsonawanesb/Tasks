import fs from "fs";
import path from "path";
import {parse} from "json2csv";
import {FearGreedRecord, FearGreedCSVRecord} from "../types.js";



const dir = path.join(process.cwd(), "src", "ts", "dataCsv");
const filePath = path.join(dir, "fear_greed.csv");

function timestampToDate(ts: string): string {
  return new Date(Number(ts) * 1000).toISOString().split("T")[0];
}

export function storeDataCSV(data : FearGreedRecord[], fetchType:string) : void{
    try{

        if(!data || data.length === 0){
            console.log("No data to store");
            return;
        }

        if(!fs.existsSync(dir)) fs.mkdirSync(dir, {
            recursive : true,
        });

        // format data as csv.
        const formattedData : FearGreedCSVRecord[] = data.map(item => ({

            fetch_type : fetchType,
            date : timestampToDate(item.timestamp),
            timestamp : item.timestamp,
            value : String(item.value),
            value_classification : item.value_classification

        }));

        const fields: (keyof FearGreedCSVRecord)[] = [
        "fetch_type",
        "date",
        "timestamp",
        "value",
        "value_classification"
     ];

    //  parse to csv.
    const csv = parse(formattedData, {
    fields,
    header: !fs.existsSync(filePath) // include header only if file doesn't exist
  });

    fs.appendFileSync(filePath, csv + "\n");
    console.log(`Stored ${data.length} rows (${fetchType})`);

    }catch(error:any){
        console.log("Unhandled error in main function:", error.message || error);
    }
}

export function getAllCSVData(): string[] {
  if (!fs.existsSync(filePath)) {
    console.log("CSV file not found");
    return [];
  }

  const content = fs.readFileSync(filePath, "utf-8");
  return content.split("\n").filter(line => line.trim() !== "");
}