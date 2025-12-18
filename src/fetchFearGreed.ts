import axios from "axios";
import type { FearGreedRecord, FearGreedAPIResponse } from "./types.js";

const API_URL = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical";

export async function fetchFearGreed(limit = 30): Promise<FearGreedRecord[] | null> {
  try {
    const response = await axios.get<FearGreedAPIResponse>(API_URL, {
      headers: { "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY },
      params: { limit },
    });

    return response.data.data; 
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}
