import React, { useEffect, useState } from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
  _id: string;
  userId: string;
  stockSymbol: string;
  quantity: number;
  __v: number;
}

function Investments() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const userId = 'user123'; // Replace with the actual user ID


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:5109/api/transactions/${userId}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('response data:', data);
          setTransactions(data);
        } else {
          const errorText = await response.text();
          console.error('Unexpected content type:', contentType);
          console.error('Error response:', errorText);
          throw new Error('Unexpected content type');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [userId]);

  const pieData = {
    labels: transactions.map(transaction => transaction.stockSymbol),
    datasets: [
      {
        label: 'Stock Quantity',
        data: transactions.map(transaction => transaction.quantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <div className="recommendations-container">
        <h2>Hello, welcome to your investments.</h2>
        <h3> Current Portfolio </h3>
        <Pie data={pieData} />
        <ul className='no-bullets'>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              {transaction.quantity} shares of {transaction.stockSymbol} 
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}

export default Investments;