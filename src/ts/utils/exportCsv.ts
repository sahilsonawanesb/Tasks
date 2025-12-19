import fs from "fs";
import path from "path";
import {parse} from "json2csv";
import { fileURLToPath } from "url";
import {FearGreedCSVRecord} from "../types.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// export the filtered data to CSV.
export function exportFilteredCSV(data : FearGreedCSVRecord[],fileName : string = "fear_greed_all.csv"
) : void{
    try{

        if(!data || data.length === 0){
            console.log("No data to export");
            return;
        }

        const folderPath = path.join(__dirname, "data");

        if (!fs.existsSync(folderPath)) {
         fs.mkdirSync(folderPath, { recursive: true });
         }

         const filePath = path.join(folderPath, fileName);

         const csv  = parse(data, {
            header : !fs.existsSync(filePath)
         });

        //  append to file..
        fs.appendFileSync(filePath, csv + "\n");

        console.log(`CSV exported successfully: ${filePath}`);
    }catch(error){
        if(error instanceof Error){
            console.log("Error exporting CSV:", error.message);
        }else{
            console.log("Unknown error exporting CSV");
        }
    }

}   