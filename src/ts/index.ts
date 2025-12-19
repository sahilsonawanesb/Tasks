import { fetchFearGreed } from "./api/fetchFearGreed.js";
import dotenv from "dotenv";
import path from "path";


dotenv.config({
    path : path.resolve(process.cwd(), ".env")
});

// main typescript functions as follows..

async function main() : Promise<void>{
    try{

        const data = await fetchFearGreed(100);
        if(!data) return;

        console.log("Fetched data", data);


    }catch(error:any){
        console.log("Unhandled error in main function:", error.message || error);
    }
}

main();