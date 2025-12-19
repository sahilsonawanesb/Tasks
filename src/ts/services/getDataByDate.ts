import { FearGreedCSVRecord } from "../types.js";
import { readCSV } from "../utils/readCsv.js";
import { exportFilteredCSV } from "../utils/exportCsv.js";


const SINGLE_CSV_FILE = "fear_greed_all.csv";

export async function getDataByDateCSV(date : string, filePath : string) : Promise<FearGreedCSVRecord | null>{

    try{

    const getAllData = await readCSV(filePath);

    if(!getAllData || getAllData.length === 0) return null;

    const targetDate = new Date(date).toISOString().split("T")[0];
    // targetDate.setHours(0,0,0,0);

    const filteredData : FearGreedCSVRecord[] = getAllData.filter(
        (item : FearGreedCSVRecord) => {
            const itemDate = new Date(Number(item.timestamp)*1000).toISOString().split("T")[0];
            // itemDate.setHours(0,0,0,0);
            return itemDate === targetDate;
        }
    );

    filteredData.forEach(
        item => (item.fetch_type = `specific_date_${date}`)
    );

    exportFilteredCSV(filteredData, SINGLE_CSV_FILE);

    return filteredData[0] || null;

    }catch(error){
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unknown error in getDataByDateCSV");
    }
    return null;
    }
}