# Fear & Greed Index Data Ingestion Service

## 1. Overview

This service is a **production-ready Windmill TypeScript job** responsible for ingesting **Fear & Greed Index historical data** from the **CoinMarketCap API**, normalizing the response, and persisting the results into a structured CSV file.

The service supports **multiple retrieval strategies**, enabling flexible data consumption for analytics, reporting, and downstream automation workflows.

---

## 2. High-Level Responsibilities

* Resolve date ranges based on business-level input
* Securely retrieve API credentials from Windmill
* Fetch historical Fear & Greed Index data
* Normalize API responses into a consistent schema
* Persist data reliably into a CSV file
* Return execution metadata for observability

---

## 3. Technology Stack

| Layer         | Technology                       |
| ------------- | -------------------------------- |
| Language      | TypeScript                       |
| Runtime       | Node.js                          |
| Orchestration | Windmill                         |
| External API  | CoinMarketCap Fear & Greed Index |
| Storage       | CSV (Filesystem)                 |

---

## 4. Configuration & Secrets Management

### Windmill Variable

| Variable Key                                | Purpose                          |
| ------------------------------------------- | -------------------------------- |
| `f/historical_fear_greed_index/CMC_API_KEY` | CoinMarketCap API authentication |

* Retrieved securely at runtime
* Never hardcoded or logged
* Suitable for production environments

---

## 5. Data Persistence Strategy

### Output File

```
/tmp/fear_greeds_index.csv
```

### Behavior

* File is auto-created if missing
* Header is written once
* New records are appended
* Historical data is preserved across executions

---

## 6. Input Contract

```ts
{
  fetchMode: "LATEST" | "SPECIFIC_DATE" | "LAST_N_DAYS" | "CUSTOM_RANGE",
  date?: string,
  nDays?: number,
  startDate?: string,
  endDate?: string
}
```
```
- Specific Date - date
- Last N Days - nDays
- Custom_Range - startDate, endDate.
```


## Execution Flow :-
 - Step 1:- Resolve Date Range :-  Converts business-level input into API-compatible parameters.
 - Step 2:- Fetch API Key Securely :- Uses Windmill secrets.
 - Step 3:- Fetch Data from CoinMarketCap :- Handles external API Communication.
 - Step 4:- Normalize API Response :- To ensures consistent CSV Schema.
 - Step 5:- Append Data to CSV


## 7. Supported Fetch Modes

| Mode            | Description                                  |
| --------------- | -------------------------------------------- |
| `LATEST`        | Retrieves the most recent Fear & Greed index |
| `SPECIFIC_DATE` | Retrieves data for a single date             |
| `LAST_N_DAYS`   | Retrieves data for the last N calendar days  |
| `CUSTOM_RANGE`  | Retrieves data between two dates             |

---

## 8. Detailed Execution Examples

### 8.1 Fetch Latest Record

#### Input

```json
{
  "fetchMode": "LATEST"
}
```

#### Runtime Behavior

* Resolves API parameters for latest available data
* Fetches one record
* Normalizes and appends a single CSV row

#### Normalized Output

```ts
[
  {
    date: "2025-12-23",
    timestamp: 1766448000,
    value: 29,
    classification: "Fear"
  }
]
```

#### Function Response

```json
{
  "status": "stored",
  "added": 1,
  "total": 2,
  "file": "/tmp/fear_greeds_index.csv"
}
```

---

### 8.2 Fetch Data for a Specific Date

#### Input

```json
{
  "fetchMode": "SPECIFIC_DATE",
  "date": "2025-12-20"
}
```

#### Runtime Behavior

* Resolves `start` and `limit` for the given date
* Fetches index value for that date only
* Appends one normalized record

#### Normalized Output

```ts
[
  {
    date: "2025-12-20",
    timestamp: 1766188800,
    value: 27,
    classification: "Fear"
  }
]
```

#### Function Response

```json
{
  "status": "stored",
  "added": 1,
  "total": 3,
  "file": "/tmp/fear_greeds_index.csv"
}
```

---

### 8.3 Fetch Last N Days

#### Input

```json
{
  "fetchMode": "LAST_N_DAYS",
  "nDays": 10
}
```

#### Runtime Behavior

* Resolves date range for last 10 days
* Fetches historical data in descending order
* Normalizes each record
* Appends multiple rows in a single execution

#### Normalized Output

```ts
FetchData: [
  { date: "2025-12-23", timestamp: 1766448000, value: 29, classification: "Fear" },
  { date: "2025-12-22", timestamp: 1766361600, value: 29, classification: "Fear" },
  { date: "2025-12-21", timestamp: 1766275200, value: 28, classification: "Fear" },
  { date: "2025-12-20", timestamp: 1766188800, value: 27, classification: "Fear" },
  { date: "2025-12-19", timestamp: 1766102400, value: 21, classification: "Fear" },
  { date: "2025-12-18", timestamp: 1766016000, value: 22, classification: "Fear" },
  { date: "2025-12-17", timestamp: 1765929600, value: 25, classification: "Fear" },
  { date: "2025-12-16", timestamp: 1765843200, value: 22, classification: "Fear" },
  { date: "2025-12-15", timestamp: 1765756800, value: 24, classification: "Fear" },
  { date: "2025-12-14", timestamp: 1765670400, value: 27, classification: "Fear" }
]
```

#### Function Response

```json
{
  "status": "stored",
  "added": 10,
  "total": 11,
  "file": "/tmp/fear_greeds_index.csv"
}
```

---

### 8.4 Fetch Custom Date Range

#### Input

```json
{
  "fetchMode": "CUSTOM_RANGE",
  "startDate": "2025-12-15",
  "endDate": "2025-12-20"
}
```

#### Runtime Behavior

* Resolves start and end boundaries
* Fetches all records within the range
* Normalizes and persists batch data

#### Normalized Output (Excerpt)

```ts
[
  { date: "2025-12-20", timestamp: 1766188800, value: 27, classification: "Fear" },
  { date: "2025-12-19", timestamp: 1766102400, value: 21, classification: "Fear" },
  { date: "2025-12-18", timestamp: 1766016000, value: 22, classification: "Fear" }
]
```

#### Function Response

```json
{
  "status": "stored",
  "added": 6,
  "total": 17,
  "file": "/tmp/fear_greeds_index.csv"
}
```


## 9. CSV Schema

```csv
date,timestamp,value,classification
```
* Schema is fixed and deterministic
* Designed for analytics and ETL consumption












