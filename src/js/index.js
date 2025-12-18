import { fetchFearGreed } from "./api/fetchFearGreed.js";
import dotenv from "dotenv";

dotenv.config();

// javascipt function to fetch data..

(async() => {
    try{
        const data = await fetchFearGreed(100);
        if(!data){
            console.log("No data fetched");
            return;
        }
        console.log("Fear and Greed data fetch successfully");
        console.log(data);

    }catch(error){
        console.log(error.msg);
    }

})();