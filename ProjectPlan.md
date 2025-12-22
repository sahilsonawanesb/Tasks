# CoinMarketCap Fear & Greed Data Utility Production level  - Project Plan

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

## EndPoint
  - `GET https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical`

## Supported Query Parameters
  - start - Integer - User demanded date.
  - Limit - Integer - Maximum numbers of records to return.

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


### Summary of What You Can Customize.
| Goal                         | How To Do It                                           |
| ---------------------------- | ------------------------------------------------------ |
| **Get all historical data**  | Use `/v3/fear-and-greed/historical` with large `limit` |
| **Paginate historical data** | Use `start` + `limit`                                  |
| **Filter dates or ranges**   | Fetch data then filter on `timestamp` in your app      |
| **Get latest value only**    | Use `/v3/fear-and-greed/latest`                        |


## High level Architecture 
User Input
   ↓
Validate Input
   ↓
Resolve User Intent → Fetch Strategy
   ↓
Calculate start & limit (offset math)
   ↓
Fetch from CoinMarketCap
   ↓
Normalize & Validate Response
   ↓
Store as CSV (smart naming / append)
   ↓
Return success metadata


## User-Input Design 
type FetchMode =
  | "LATEST"
  | "SPECIFIC_DATE"
  | "LAST_N_DAYS"
  | "CUSTOM_RANGE";


## Dynamic Inputes:-
| Mode          | Required Inputs        |
| ------------- | ---------------------- |
| LATEST        | none                   |
| SPECIFIC_DATE | `date`                 |
| LAST_N_DAYS   | `nDays`                |
| CUSTOM_RANGE  | `startDate`, `endDate` |

### Core Technical Assumptions..
  -1. One record per calendar day.
  -2. Records are ordered newest → oldest.
  -3. No missing historical days.
  -4. Timestamps are UTC.
  -5. Pagination index maps linearly to days.


### Offset-Based Pagination Strategy.
  -1. offsetDate = today - (start - 1)
  -2. limit = number of required days


  | Requirement | Strategy              |
| ----------- | --------------------- |
| Old data    | Calculate `start`     |
| Month data  | `limit = daysInMonth` |
| Efficiency  | Single API call       |
| Safety      | Validate `start >= 1` |


### Date Math Utilities

Responsibilities:
Leap year handling
Month length
Date difference
UTC normalization
This module should be pure, no API calls.

### Fetch Layer
Responsibilities:
Call CoinMarketCap
Handle HTTP errors
Retry logic (optional)

### Data Validator
Responsibilities:
Ensure returned records ≥ expected
Detect missing days
Detect future timestamps


### Real-life example to understand API Working:--

  - Target
     - Month: January 2021
    - Days in month: 31

  - Calculating Days Different..
      daysFromToday = difference(today, 2021-01-31)
      ≈ 1817 days   (example)

  - Calculate Start offeset..
    start = daysFromToday - (daysInMonth - 1)
    start = 1817 - 30 = 1787

  - API Call 
    GET /v3/fear-and-greed/historical
    ?start=1787
    &limit=31

  - Result
    You receive exactly January 1 → January 31, 2021.


### Production Grade Formula to implement..
  -1. Days Difference Utility:-
  -2. Calculate Start & limit..

### Edge Cases to handle..
  -1. Future dates.
  -2. API Limit.
  -3. TimeZone Safety.

### File Naming Strategy..
  -1. Avoiding :- fear_greed_167899123.csv 
  -2. Prefer :- fear_greed_2021-01.csv

Why?
  Re-running same script = safe
  No duplicates
  Predictable storage



### Windmill Execution Plan..
  - Input Form Design
    Radio group for mode
    Conditional fields
    Input validation (min/max)

### Secrets
  - API key stored in Windmill Secrets
  - Never passed from UI

| Job                 | Frequency |
| ------------------- | --------- |
| Latest fetch        | Daily     |
| Month fetch         | On demand |
| Historical backfill | Manual    |


### Cost & Resource Management..
  - API Cost
    Single API call per request
    Hard cap on limit

  - Compute Cost
    O(n) CSV operations
    No in-memory large arrays

  - Storage Cost
    Monthly files
    Deduplication

### Failure Scenarios & Handling 

| Failure       | Handling                |
| ------------- | ----------------------- |
| API down      | Retry / fail gracefully |
| Wrong date    | Input validation        |
| Data gap      | Abort & alert           |
| File locked   | Retry write             |
| Duplicate run | Deduplication           |


### 2.2 Data Storage
- Single CSV file for all filtered data
- Add `fetch_type` field:
  - `last_7_days`
  - `specific_date_YYYY-MM-DD`
  - `range_START_to_END`
- Automatically create missing directories

## 4. Edge Cases
- API rate limit → retry or log error
- No data for requested date → log
- CSV folder/file missing → create folder/file
- Daily runs → single CSV prevents multiple files

---
