import axios from "axios";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env")
});

const API_URL = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical";

export async function fetchFearGreed(limit = 100) {
  try {
    const res = await axios.get(API_URL, {
         headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
                 Accept: "application/json"
      },
      params: { limit }
    });

    return res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}
