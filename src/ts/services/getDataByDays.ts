import { FearGreedCSVRecord } from "../types.js";
import { exportFilteredCSV } from "../utils/exportCsv.js";
import { readCSV } from "../utils/readCsv.js";


const SINGLE_CSV_FILE = "fear_greed_all.csv";

export async function getDataByDaysCSV(days : number = 7, filePath : string) : Promise<FearGreedCSVRecord[]>{
    try{

        const getAllData = await readCSV(filePath);
        if(!getAllData || getAllData.length === 0) return [];

        const today = new Date();
        const startDate = new Date();

        startDate.setDate(today.getDate() - days + 1);

        const filteredData : FearGreedCSVRecord[] = getAllData.filter(
            (item : FearGreedCSVRecord) => {
                const itemDate = new Date(Number(item.timestamp)*1000);
                return itemDate >= startDate && itemDate <= today;
            }
        )

        filteredData.forEach(item => (
            item.fetch_type = `last_${days}_days`
        ));


        exportFilteredCSV(filteredData, SINGLE_CSV_FILE );

        return filteredData;

    }catch(error){
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unknown error in getDataByDaysCSV");
    }
    return [];
    }
}