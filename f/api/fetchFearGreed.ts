// @ts-ignore
import axios from "axios";

declare const CMC_API_KEY: string;

type FearGreedRecord = {
  timestamp: string;
  value: number;
  value_classification: string;
};

type FearGreedAPIResponse = {
  data: FearGreedRecord[];
  status: {
    timestamp: string;
    error_code: string;
    error_message: string;
    elapsed: number;
    credit_count: number;
  };
};


export async function fetchFearGreed(
  limit: number = 100
): Promise<FearGreedRecord[] | null> {
  const API_URL =
    "https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical";

  try {
    const response = await axios.get<FearGreedAPIResponse>(API_URL, {
      headers: {
        "X-CMC_PRO_API_KEY": CMC_API_KEY,
      },
      params: { limit },
    });

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Axios error:",
        error.response.status,
        error.response.data || error.message
      );
    } else {
      console.error("Unknown error:", error);
    }
    return null;
  }
}
