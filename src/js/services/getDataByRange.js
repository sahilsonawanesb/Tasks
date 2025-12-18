import { fetchFearGreed } from "../api/fetchFearGreed.js";


export async function getDataByRange(start, end){
    try{

        const getAllData = await fetchFearGreed(100);

        if(!getAllData) return [];

        const startDate = new Date(start);
        const endDate = new Date(end);

        return getAllData.filter(item => {
           const itemDate = new Date(Number(item.timestamp) * 1000);
            return itemDate >= startDate && itemDate <= endDate;
        });


    }catch(error){
        console.log(error.message);
    }
}