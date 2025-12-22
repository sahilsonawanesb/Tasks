import dotenv from "dotenv";
import path from "path";
import { fetchFearGreed } from "./fetchFearGreed.js";
import { storeDataCSV } from "./storeDataCSV.js";
import { getDataByDaysCSV } from "./getDataByDaysCSV.js";
import { getDataByDateCSV } from "./getDataByDateCSV.js";
import { getDataByRangeCSV } from "./getdatabyrangecsv.js";


dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

async function main(): Promise<void> {
  try {
    const dataFilePath = path.resolve(".", "data", "fear_greed.csv");

    console.log("=== Fetching Fear-Greed Data ===");
    const data = await fetchFearGreed(100);
    if (data && data.length > 0) {
      await storeDataCSV(data, "daily_fetch"); // stores CSV
      console.log("Fear-Greed data fetched and stored successfully!");
    } else {
      console.log("No data fetched from API.");
    }

    console.log("\n=== Reading Last 7 Days Data ===");
    const last7days = await getDataByDaysCSV(7, dataFilePath);
    console.log(last7days);

    console.log("\n=== Reading Specific Date Data ===");
    const specificDate = await getDataByDateCSV("2025-12-15", dataFilePath);
    console.log(specificDate);

    console.log("\n=== Reading Data by Range ===");
    const rangeData = await getDataByRangeCSV(
      "2025-12-10",
      "2025-12-15",
      dataFilePath
    );
    console.log(rangeData);

  } catch (error: any) {
    console.error("Unhandled error in main:", error.message || error);
  }
}

main();
