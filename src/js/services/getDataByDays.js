
import { readCSV } from "../utils/readCsv.js";
import { exportFilteredCSV } from "../utils/exportCsv.js";


const SINGLE_CSV_FILE = "fear_greed_all.csv";

export async function getDataByDaysCSV(days = 7, filePath) {
  try {
    const getAllData = await readCSV(filePath);
    if (!getAllData) return [];

    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - days + 1);

    const filteredData = getAllData.filter(item => {
      const itemDate = new Date(Number(item.timestamp) * 1000);
      return itemDate >= startDate && itemDate <= today;
    });

    filteredData.forEach(item => (item.fetch_type = `last_${days}_days`));

 
    exportFilteredCSV(filteredData, SINGLE_CSV_FILE);

    return filteredData;
  } catch (error) {
    console.log(error.message);
  }
}

