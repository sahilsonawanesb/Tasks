// import { readCSV } from "../utils/readCsv.js";


// export async function getDataByRangeCSV(start, end, filePath){
//     try{

//         // const getAllData = await fetchFearGreed(100);
//         const getAllData = await readCSV(filePath)

//         if(!getAllData) return [];

//         const startDate = new Date(start);
//         const endDate = new Date(end);

//         return getAllData.filter(item => {
//            const itemDate = new Date(Number(item.timestamp) * 1000);
//             return itemDate >= startDate && itemDate <= endDate;
//         });


//     }catch(error){
//         console.log(error.message);
//     }
// }

// import { readCSV } from "../utils/readCsv.js";
// import { exportFilteredCSV } from "../utils/exportCsv.js";
// export async function getDataByRangeCSV(start, end, filePath, exportCsv = false) {
//     try {
//         const getAllData = await readCSV(filePath);
//         if (!getAllData) return [];

//         const startDate = new Date(start);
//         const endDate = new Date(end);

//         const filtered = getAllData.filter(item => {
//             const itemDate = new Date(Number(item.timestamp) * 1000);
//             return itemDate >= startDate && itemDate <= endDate;
//         });

//         if (exportCsv) {
//             exportFilteredCSV(
//                 filtered,
//                 `range: ${start} to ${end}`,
//                 `fear_greed_${start}_to_${end}.csv`
//             );
//         }

//         return filtered;
//     } catch (error) {
//         console.log(error.message);
//     }
// }

import { readCSV } from "../utils/readCsv.js";
import { exportFilteredCSV } from "../utils/exportCsv.js";

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

    const fileName = `range_${start}_to_${end}.csv`;
    exportFilteredCSV(filteredData, fileName);

    return filteredData;
  } catch (error) {
    console.log(error.message);
  }
}

