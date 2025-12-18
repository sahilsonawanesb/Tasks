import { fetchFearGreed } from "../api/fetchFearGreed.js";


// functions getDataByDate :- 
export async function getDataByDate(date) {
    try{

        const getAllData = await fetchFearGreed(100);


    if (!getAllData) return null;

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return getAllData.find(item => {
        const itemDate = new Date(Number(item.timestamp) * 1000);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === targetDate.getTime();
    }) || null;

    }catch(error){
        console.log(error.message);
    }
}

