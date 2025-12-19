import fs from "fs";
import csv from "csv-parser";
import { FearGreedCSVRecord } from "../types.js";


export function readCSV(filePath : string) : Promise<FearGreedCSVRecord[]>{
return new Promise((resolve, reject) => {

    const results : FearGreedCSVRecord[] = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data : FearGreedCSVRecord) => {
            results.push(data);
        })
        .on("end", () => {
            resolve(results);
        })
        .on("error", (err) => {
            reject(err);
        })
});

}
