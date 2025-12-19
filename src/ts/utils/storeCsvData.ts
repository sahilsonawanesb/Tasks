import fs from "fs";
import path from "path";
import {FearGreedRecord, FearGreedCSVRecord} from "../types.js";



const dir = path.join(".", "data");
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

        // format data as csc

    }catch(error:any){
        console.log("Unhandled error in main function:", error.message || error);
    }
}