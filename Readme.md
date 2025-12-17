#Tasks: Fetch and Store Historical Fear and Greed Index

#1. Created an account on coinmarketapi. Get access of an API.
#2. Generate an API key.
#3. Keep it private in .env file...

#4. Maintain a seperate github repository to keep track of code as --Tasks

#5. API END POINT :- 
#. GET :- https://pro-api.coinmarketcap.com/v3/fear-and-greed/historical

# Data Return :- 200 ok: 
{
"data": [
{
"timestamp": "1726617600",
"value": 38,
"value_classification": "Fear"
},
{
"timestamp": "1726531200",
"value": 34,
"value_classification": "Fear"
},
{
"timestamp": "1726444800",
"value": 36,
"value_classification": "Fear"
},
{
"timestamp": "1726358400",
"value": 38,
"value_classification": "Fear"
},
{
"timestamp": "1726272000",
"value": 38,
"value_classification": "Fear"
}
],
"status": {
"timestamp": "2025-12-16T07:15:26.677Z",
"error_code": 0,
"error_message": "",
"elapsed": 10,
"credit_count": 1,
"notice": ""
}
}

Install dependeices :-
1. npm install axios dotenv


#Sample response feilds :- 
{
  "value": "74",
  "value_classification": "Greed",
  "timestamp": "2023-12-01T00:00:00Z"
}

Common errors: 
| Error | Meaning                    |
| ----- | -------------------------- |
| 401   | Invalid API key            |
| 429   | Rate limit exceeded        |
| 400   | Invalid params             |
| 500   | CoinMarketCap server issue |


# Created function to fetch data :- In fetchFearGreed.js file
# Inside Index.js file  fetchFearGreed.js file and loading data.

# Run :- npm start -- to fetch data.

