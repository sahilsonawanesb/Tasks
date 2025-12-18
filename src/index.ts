import  {fetchFearGreed} from "./fetchFearGreed.js";
import { storeDataCSV } from "./storeCsvData.js";
import { storeData} from "./storeData.js"
import dotenv from "dotenv";



dotenv.config();


// Javascript function to fetch data..

// (async() => {

//     try{

//         const data = await fetchFearGreed(30);
//         storeData(data);
//         storeDataCSV(data);
//         console.log("Fear and Greed data stored successfully");

//     }catch(error){
//         console.log(error.msg);
//     }

// })();


// // TypeScript Main function.
// async function main(): Promise<void> {
//   try {
//     const data = await fetchFearGreed(30);
//     if (!data) return;

//     console.log("Fetched data:", data);

//     storeData(data);
//     storeDataCSV(data);

//     console.log("Fear and Greed data stored successfully");
//   } catch (error: any) {
//     console.error("Unhandled error in main():", error.message || error);
//   }
// }

// main();
