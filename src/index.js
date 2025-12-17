import { fetchFearGreed } from "./fetchFearGreed.js";
import dotenv from "dotenv";
import { storeData } from "./storeData.js";
import { storeDataCSV } from "./storeCsvData.js";
dotenv.config();
(async() => {

    try{

        const data = await fetchFearGreed(30);
        storeData(data);
        storeDataCSV(data);
        console.log("Fear and Greed data stored successfully");

    }catch(error){
        console.log(error.msg);
    }

})();