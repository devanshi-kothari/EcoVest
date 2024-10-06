import React, { useEffect, useState } from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
const mockData = [
  {
    "old_portfolio": {
      "AAPL": 50, 
      "AMZN": 20, 
      "GOOGL": 40, 
      "MSFT": 60, 
      "TSLA": 30
    }
  }, 
  {
    "new_portfolio": {
      "AAPL": 50, 
      "AMZN": 0, 
      "ENPH": 20, 
      "GOOGL": 20, 
      "MSFT": 30, 
      "NEE": 10, 
      "NIO": 10, 
      "TSLA": 40
    }
  }, 
  {
    "new_buys": {
      "ENPH": 20, 
      "NEE": 10, 
      "NIO": 10
    }
  }, 
  {
    "current_buys": {
      "TSLA": 10
    }
  }, 
  {
    "sells": {
      "AMZN": -20, 
      "GOOGL": -20, 
      "MSFT": -30
    }
  }, 
  {
    "old_returns": "25.99%"
  }, 
  {
    "new_returns": "17.43%"
  }, 
  {
    "returns_difference": "-8.56%"
  }, 
  {
    "old_sustainability": "91.36"
  }, 
  {
    "new_sustainability": "105.06"
  }, 
  {
    "sustainability_improvement": "15.00%"
  }
];


function Recommendations() {
  interface PortfolioData {
    old_portfolio: Record<string, number>;
    new_portfolio: Record<string, number>;
    new_buys: Record<string, number>;
    current_buys: Record<string, number>;
    sells: Record<string, number>;
    old_returns: string;
    new_returns: string;
    returns_difference: string;
    old_sustainability: string;
    new_sustainability: string;
    sustainability_improvement: string;
  }

  const [data, setData] = useState<PortfolioData[] | null>(null);


  useEffect(() => {
    // Fetch the data from the API
    /*
    fetch('http://localhost:5000/api/recommendations')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error)); */
    setData(mockData);
  }, []);

  if (!data) {
    return     <div className="home-container">
      <Sidebar />
      <div className='content'>Loading...</div>
      </div>;
  }

  const oldPortfolio = data[0].old_portfolio;
  const newPortfolio = data[1].new_portfolio;
  const newBuys = data[2].new_buys;
  const currentBuys = data[3].current_buys;
  const sells = data[4].sells;
  const oldReturns = parseFloat(data[5].old_returns.replace('%', ''));
  const newReturns = parseFloat(data[6].new_returns.replace('%', ''));
  const returnsDifference = data[7].returns_difference;
  const oldSustainability = data[8].old_sustainability;
  const newSustainability = data[9].new_sustainability;
  const sustainabilityImprovement = data[10].sustainability_improvement;

  const barData = {
    labels: Object.keys(oldPortfolio),
    datasets: [
      {
        label: 'Old Portfolio',
        data: Object.values(oldPortfolio),
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
      },
      {
        label: 'New Portfolio',
        data: Object.values(newPortfolio),
        backgroundColor: 'rgb(180, 139, 0)',
      },
    ],
  };

    
  const barOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      y: {
        grid: {
          color:'rgba(255, 255, 255, 0.7)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  };

  const doughnutData = {
    labels: Object.keys(newBuys),
    datasets: [
      {
        label: 'New Buys',
        data: Object.values(newBuys),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  
  const horizontalBarData = {
    labels: ['Old Returns', 'New Returns'],
    datasets: [
      {
        label: 'Percentage Returns',
        data: [oldReturns, newReturns],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const horizontalBarOptions = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.5)', // White color with 50% opacity
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.5)', // White color with 50% opacity
        },
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <div className="recommendations-container">
        <h2>Hello, Welcome to your Recommendations.</h2>

        <h3>Portfolio Comparison</h3>
        <Bar data={barData} options={barOptions} />

        <h3>New Buys</h3>
        <Doughnut data={doughnutData} options={{ responsive: true }} />

        <h3>Current Buys</h3>
        <ul>
          {Object.entries(currentBuys).map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>

        <h3>Sells</h3>
        <ul>
          {Object.entries(sells).map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>


        <h3>Returns and Sustainability</h3>
        <Bar data={horizontalBarData} options={horizontalBarOptions} />

      </div>
      </div>
    </div>
  );
}

export default Recommendations;