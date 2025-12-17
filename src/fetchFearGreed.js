import axios from "axios";
const API_URL = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical";


export async function fetchFearGreed(limit = 30){
    try{

        const res = await axios.get(API_URL, {
            headers : {
                "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
            
            },
            params : {limit}
        });

        return res.data.data;

    }catch(error){
        console.log("Error while fetching fear and greed index data", error.message);
        throw error;
    }
}

