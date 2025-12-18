import { fetchFearGreed } from "./api/fetchFearGreed.js";
import { storeDataCSV } from "./utils/storeCsvData.js";
import dotenv from "dotenv";
import path from "path";


dotenv.config({
  path: path.resolve(process.cwd(), "../../.env")
});

// javascipt function to fetch data..

(async() => {
    try{
        const data = await fetchFearGreed(100);
        if(!data){
            console.log("No data fetched");
            return;
        }

        storeDataCSV(data, "all_data");
        console.log("Fear and Greed data fetch successfully");
        console.log(data);

    }catch(error){
        console.log(error.msg);
    }

})();