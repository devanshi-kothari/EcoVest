# divHacks2024

## Frontend

inside frontend -> my-app <br />
Runs on ```http://localhost:5173/``` <br />
```npm install``` <br />
```npm run dev```

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