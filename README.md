# divHacks2024

## Frontend

inside frontend -> my-app <br />
Runs on ```http://localhost:5173/``` <br />
```npm install``` <br />
```npm run dev```

## app

inside of app/ directory, run the following to start the flask API:
`python app/run.py` 

Then request this endpoint: http://localhost:5000/api/investments/recommend

Here's an example of a curl request:

`curl -X POST -H "Content-Type: application/json" -d '{"preferences": {"solar_energy": 0.8, "wind_energy": 0.5, "biodiversity": 0.7,"low_carbon_footprint": 0.9,"renewable_energy_investment": 1.0, "fossil_fuel_divestment": 1.0}, "current_portfolio": {"AAPL": 50, "TSLA": 30, "AMZN": 20, "GOOGL": 40, "MSFT": 60}}' http://localhost:5000/api/investments/recommend`

## user
run `npm start` will start the api running on localhost 5109
### Routes
run `npm start` will start the api running on localhost 5109
Routes:
- POST user data: http://localhost:5109/api/transactions
sample body
`{
  "userId": "user123",
  "stockSymbol": "NVDA",
  "transactionType": "sell",
  "quantity": 13,
  "price": 99
}`

- GET user data based on the id http://localhost:5109/api/transactions/:id
