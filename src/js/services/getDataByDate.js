
import { readCSV } from "../utils/readCsv.js";
import { exportFilteredCSV } from "../utils/exportCsv.js";


const SINGLE_CSV_FILE = "fear_greed_all.csv";

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

  
    exportFilteredCSV(filteredData, SINGLE_CSV_FILE);

    return filteredData[0] || null;
  } catch (error) {
    console.log(error.message);
  }
}





