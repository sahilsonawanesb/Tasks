import axios from "axios";
import type { FearGreedRecord, FearGreedAPIResponse } from "./types.js";

const API_URL = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical";

export async function fetchFearGreed(limit:number = 100): Promise<FearGreedRecord[] | null> {
  try {
    console.log(API_URL);
    const response = await axios.get<FearGreedAPIResponse>(API_URL, {
      headers: { "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY },
      params: { limit },
    });

    return response.data.data; 
  } catch (error: any) {
    if (error.response) {
      console.error("Axios error:", error.response.status, error.response.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return null;
}

  }

