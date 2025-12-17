import fs from "fs";
import { parse } from "json2csv";

export function storeDataCSV(data){
    try{
        // JSON Array to csv..
        const csv = parse(data);
        fs.writeFileSync("./data/fear_greed.csv", csv);
        console.log("Data saved to fear_greed.csv");
    }catch(error){
        console.log("Error converting to CSV:", error.message);
    }
}