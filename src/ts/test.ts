import path from "path";
import dotenv from "dotenv";
import { FearGreedCSVRecord } from "./types.js";
import { getDataByDaysCSV } from "./services/getDataByDays.js";
import { getDataByDateCSV } from "./services/getDataByDate.js";
import { getDataByRangeCSV } from "./services/getDataByRange.js";

dotenv.config({
    path : path.resolve(process.cwd(), "../../.env")
});

const filePath : string = path.resolve(
    process.cwd(),
    "src",
    "ts",
    "dataCsv",
    "fear_greed.csv"
)

async function main(): Promise<void>{
    try{

        console.log("Last 7 days");
        const last7days : FearGreedCSVRecord[] = await getDataByDaysCSV(7, filePath);
        console.log(last7days);

        console.log("Specific Date");
        const specificDate : FearGreedCSVRecord | null = await getDataByDateCSV("2025-12-15", filePath);
        console.log(specificDate);

         console.log("Date by range");
         const rangeDate: FearGreedCSVRecord[] =
         await getDataByRangeCSV("2025-12-10", "2025-12-15", filePath);
         console.log(rangeDate);

    }catch(error){
        if (error instanceof Error) {
      console.log("Error in index.ts:", error.message);
    } else {
      console.log("Unknown error in index.ts");
    }
    }
}

main();