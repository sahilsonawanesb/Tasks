// type for api record
export interface FearGreedRecord{
    timestamp : string;
    value : number;
    value_classification : string;
}

// api response types
export interface FearGreedAPIResponse{
    data : FearGreedRecord[],
    status : {
        timestamp : string;
        error_code : number;
        error_message : string | null;
        elapsed: number;
        credit_count : number;
    }
}

// fearGreedCSV types
export interface FearGreedCSVRecord{
    fetch_type : string,
    date : string,
    timestamp : string,
    value : string,
    value_classification : string,
}

