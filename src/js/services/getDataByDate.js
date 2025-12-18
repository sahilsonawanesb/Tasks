
import { readCSV } from "../utils/readCsv.js";
import { exportFilteredCSV } from "../utils/exportCsv.js";

export async function getDataByDateCSV(date, filePath) {
  try {
    const getAllData = await readCSV(filePath);
    if (!getAllData) return null;

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const filteredData = getAllData.filter(item => {
      const itemDate = new Date(Number(item.timestamp) * 1000);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate.getTime() === targetDate.getTime();
    });

    filteredData.forEach(item => (item.fetch_type = `specific_date_${date}`));

    const fileName = `specific_date_${date}.csv`;
    exportFilteredCSV(filteredData, fileName);

    return filteredData[0] || null;
  } catch (error) {
    console.log(error.message);
  }
}

