# CoinMarketCap Fear & Greed Data Utility - Project Plan

## 1. Objective
Build a reusable, maintainable data utility to fetch, filter, and store CoinMarketCap Fear & Greed index data.

- Fetch historical data by:
  - Specific date
  - Last N days
  - Custom date range
- Store filtered results in a single CSV: `fear_greed_all.csv`
- Enable daily automated runs in Windmill



## 2. Technical Approach

### 2.1 Fetching Data
- Use **Axios** to call CoinMarketCap API
- Use **Windmill Secrets** for `CMC_API_KEY`
- Return typed objects (`FearGreedRecord[]`)

### 3. Data Types
ts
- **number**        // value, timestamps
- **string**        // date, classification
- **interface**     // API response structure
 -**array**         // list of daily records
- **Promise<T>**    // async API calls

### 4. Understand API

### Required headers :- API KEY
    - `Parameters (limit, date range)`  
     -`Response structure :- `
	- `{`
	- `"timestamp": "1726617600",`
	"value": 38,
	"value_classification": "Fear"
	},


### Request Allowed Per Minute : 
	- 1. Basic Free Plan 30 Requests per minute
	- 2. High Paid plans paid upto - 120+ API Calls.

### Requests Allowed Per Day / Credits
	- 1.Each API call typically consume 1 credit.
	- 2. 10,000 credits per month, 

### Credit Usage Per API Call
	- 1. Credit per API call: 1 credit per request regardless of size in parameters limit/start.
	- 2. Make Larger Limits - request larger limit eg. (100 to 500) 



### 2.2 Data Storage
- Single CSV file for all filtered data
- Add `fetch_type` field:
  - `last_7_days`
  - `specific_date_YYYY-MM-DD`
  - `range_START_to_END`
- Automatically create missing directories

### 2.3 Filtering Functions
1. **By Specific Date** - filter CSV rows for given date
2. **Last N Days** - filter rows between `today-N+1` and `today`
3. **Date Range** - filter rows between start and end dates
- Append all filtered data to `fear_greed_all.csv`

---

## 3. Logical Flow
1. Fetch data from API
2. Store raw data locally (optional)
3. Filter by method
4. Append filtered data to `fear_greed_all.csv`
5. Mark each row with `fetch_type`
6. Handle errors:
   - API failures → log & continue
   - Empty results → log "No data"
   - Missing directories → auto-create

---

## 4. Edge Cases
- API rate limit → retry or log error
- No data for requested date → log
- CSV folder/file missing → create folder/file
- Daily runs → single CSV prevents multiple files

---

## 5. Windmill Migration Plan
1. Move TS scripts to `src/ts/windmill/`
2. Use `export default async function run()`
3. Replace `.env` with **Windmill Secrets**
4. Use relative paths for CSV
5. Setup triggers:
   - Daily EOD
   - Manual run
6. Add logs for success/failure

---

## 6. Deliverables
- TS functions for fetch, filter, store
- Single CSV file: `fear_greed_all.csv`
- Windmill daily automated script
- Logs for errors and success
- Future extension ready

---

## 7. Optional Enhancements
- Retry logic for API errors
- Date validation for ranges
- Slack/email alerts on failures
