import { FearGreedCSVRecord } from "../types.js";
import { exportFilteredCSV } from "../utils/exportCsv.js";
import { readCSV } from "../utils/readCsv.js";

const SINGLE_CSV_FILE = "fear_greed_all.csv";

export async function getDataByRangeCSV(start : string, end : string, filePath : string) : Promise<FearGreedCSVRecord[]>{
    try{

        const getAllData = await readCSV(filePath);
        if(!getAllData || getAllData.length === 0) return [];

        const startDate = new Date(start);
        const endDate = new Date(end);

        const filteredData : FearGreedCSVRecord[] = getAllData.filter(
            (item : FearGreedCSVRecord) => {
                const itemDate = new Date(Number(item.timestamp)* 1000);
                return itemDate >= startDate && itemDate <= endDate;
            }
        );

        filteredData.forEach(
            item => (item.fetch_type = `range_${start}_to_${end}`)
        );

        exportFilteredCSV(filteredData, SINGLE_CSV_FILE);

        return filteredData;
    }catch(error){
        if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unknown error in getDataByRangeCSV");
    }
    return [];
    }
}