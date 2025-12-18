
import { readCSV } from "../utils/readCsv.js";
import { exportFilteredCSV } from "../utils/exportCsv.js";

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

    // Add fetch_type for clarity
    filteredData.forEach(item => (item.fetch_type = `last_${days}_days`));

    // Export CSV
    const fileName = `last_${days}_days.csv`;
    exportFilteredCSV(filteredData, fileName);

    return filteredData;
  } catch (error) {
    console.log(error.message);
  }
}

