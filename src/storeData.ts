import fs from "fs";
import type { FearGreedRecord } from "./types.js";
// import path from "path";


// export function storeData(data) {
//     const folderPath = path.join(".", "data");

//     if (!fs.existsSync(folderPath)) {
//         fs.mkdirSync(folderPath);
//     }

//     fs.writeFileSync(
//         path.join(folderPath, "fear_greed.json"),
//         JSON.stringify(data, null, 2)
//     );
// }


// TypeScript function to stored data..
export function storeData(data: FearGreedRecord[]): void {
  fs.writeFileSync("./data/fear_greed.json", JSON.stringify(data, null, 2));
  console.log("Data saved to fear_greed.json");
}
