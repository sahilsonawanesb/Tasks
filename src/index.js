import { fetchFearGreed } from "./fetchFearGreed.js";
import dotenv from "dotenv";
dotenv.config();
(async() => {

    try{

        const data = await fetchFearGreed(30);

        console.log(data);

    }catch(error){
        console.log(error.msg);
    }

})();