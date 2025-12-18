import { fetchFearGreed } from "../api/fetchFearGreed.js";

// Javascript functions to getData by days..
export async function getDataByDays(days = 7){
    try{

        const getAllData = await fetchFearGreed(100);

        if(!getAllData) return [];

        const today = new Date();
        const startDate = new Date();
        startDate.setDate(today.getDate() - days + 1);

        return getAllData.filter(item => {
            const itemDate = new Date(Number(item.timestamp) * 1000);
            
            return itemDate >= startDate && itemDate <= today;
        });


    }catch(error){
        console.log(error.message);
    }
}