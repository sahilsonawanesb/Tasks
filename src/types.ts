// types.ts
export interface FearGreedRecord {
  timestamp: string;
  value: number;
  value_classification: string;
}

export interface FearGreedAPIResponse {
  data: FearGreedRecord[];
  status: {
    timestamp: string;
    error_code: string;
    error_message: string;
    elapsed: number;
    credit_count: number;
  };
}
