import React, { useEffect, useState } from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

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
  const userId = 'user123'; // Replace with the actual user ID

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`/api/transactions/${userId}`);
        console.log('response' + response);
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setTransactions(data);
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