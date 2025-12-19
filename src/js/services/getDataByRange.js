
import { readCSV } from "../utils/readCsv.js";
import { exportFilteredCSV } from "../utils/exportCsv.js";


const SINGLE_CSV_FILE = "fear_greed_all.csv";
export async function getDataByRangeCSV(start, end, filePath) {
  try {
    const getAllData = await readCSV(filePath);
    if (!getAllData) return [];

    const startDate = new Date(start);
    const endDate = new Date(end);

    const filteredData = getAllData.filter(item => {
      const itemDate = new Date(Number(item.timestamp) * 1000);
      return itemDate >= startDate && itemDate <= endDate;
    });

    filteredData.forEach(
      item => (item.fetch_type = `range_${start}_to_${end}`)
    );


    exportFilteredCSV(filteredData, SINGLE_CSV_FILE);

    return filteredData;
  } catch (error) {
    console.log(error.message);
  }
}
