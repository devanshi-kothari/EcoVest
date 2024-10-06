import React, { useEffect, useState } from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';

function Investments() {
  interface Transaction {
    _id: string;
    transactionType: string;
    quantity: number;
    stockSymbol: string;
    price: number;
  }
  // Need to add in auth for user 
   
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const userId = 'user123'; 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:5109/api/transactions/${userId}`);
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error('Network response was not ok');
        }
        const errorText = await response.text();
        console.error('Error response:', errorText);
        const data = await response.json();
        console.log('response data:', data);
        const transactionsData = Array.isArray(data) ? data : [data];
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
  
    fetchTransactions();
  }, [userId]);


  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h2>Hello, welcome to your investments.</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              {transaction.transactionType} {transaction.quantity} shares of {transaction.stockSymbol} at ${transaction.price} each
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default Investments;