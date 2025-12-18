import { getDataByDate } from "./services/getDataByDate.js";
import { getDataByDays } from "./services/getDataByDays.js";
import { getDataByRange } from "./services/getDataByRange.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "../../.env")
});

// test functions to fetch data..

(async () => {

    console.log("Last 7 days");
    const last7days = await getDataByDays(7);
    console.log(last7days);

    console.log("Specific Date");
    const specificDate = await getDataByDate("2025-12-10");
    console.log(specificDate);

    console.log("Date by range");
    const rangeDate = await getDataByRange("2025-12-10", "2025-12-15");
    console.log(rangeDate);

})();