import { getDataByDateCSV } from "./services/getDataByDate.js";
import { getDataByDaysCSV } from "./services/getDataByDays.js";
import { getDataByRangeCSV } from "./services/getDataByRange.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "../../.env")
});

const filePath = "./data/fear_greed.csv";

(async () => {

    console.log("Last 7 days");
    const last7days = await getDataByDaysCSV(7, filePath); 
    console.log(last7days);

    console.log("Specific Date");
    const specificDate = await getDataByDateCSV("2025-12-10", filePath); 
    console.log(specificDate);

    console.log("Date by range");
    const rangeDate = await getDataByRangeCSV("2025-12-10", "2025-12-15", filePath); 
    console.log(rangeDate);

})();
