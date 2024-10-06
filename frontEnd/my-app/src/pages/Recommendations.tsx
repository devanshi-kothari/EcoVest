import React, { useEffect, useState } from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useAuth0 } from '@auth0/auth0-react';
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
  const { isAuthenticated, loginWithRedirect } = useAuth0();


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
  const [acceptedRecommendations, setAcceptedRecommendations] = useState([]);
  const [rejectedRecommendations, setRejectedRecommendations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/recommendations')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
    setData(data); // set this to data when the flask backend is running
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

  
  const sustainableBarData = {
    labels: ['Old Sustainability', 'New Sustainability'],
    datasets: [
      {
        label: 'Percentage Returns',
        data: [oldSustainability, newSustainability],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const handleAccept = (type, key) => {
    setAcceptedRecommendations([...acceptedRecommendations, { type, key }]);
    sendFeedback(type, key, 'yes', data);
  };

  const handleReject = (type, key) => {
    setRejectedRecommendations([...rejectedRecommendations, { type, key }]);
    sendFeedback(type, key, 'no', data);
  };

  const isAcceptedOrRejected = (type, key) => {
    return (
      acceptedRecommendations.some(rec => rec.type === type && rec.key === key) ||
      rejectedRecommendations.some(rec => rec.type === type && rec.key === key)
    );
  };

  const sendFeedback = async (type, key, userResponse, data) => {
    const portfolio = data[1].new_portfolio;
    const sells = data[4].sells; // Extract sells data
    const currentBuys = data[3].current_buys; // Extract current buys data

    let change = {};

    if (type === 'sells') {
      const changeValue = userResponse === 'yes' ? (sells[key] || 0) : 0;
      change = {
        [key]: changeValue,
      };
    } else if (type === 'current_buys') {
      const changeValue = userResponse === 'yes' ? (currentBuys[key] || 0) : 0;
      change = {
        [key]: changeValue,
      };
    }

    const payload = {
      portfolio,
      change,
      user_response: userResponse,
    };

    try {
      const response = await fetch('http://localhost:5000/api/investments/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('Feedback response:', result);
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="content">
        <h2>You need to be authenticated to view this page.</h2>
        <button className="login-button" onClick={loginWithRedirect}>Log In</button>
      </div>
    );
  }


  return (
    <div className="home-container">
      <Sidebar />
      {isAuthenticated && (
      <div className="content">
        <div className="recommendations-wrapper">
          <div className="recommendations-container">
            <h2>Hello, Welcome to your Recommendations.</h2>

            <h3>Portfolio Comparison</h3>
            <Bar data={barData} options={barOptions} />

            <h3>New Buys</h3>
            <Doughnut data={doughnutData} options={{ responsive: true }} />

            <h3>Investment Returns</h3>
            <Bar data={horizontalBarData} options={{ responsive: true }} />
            
            <h3>Sustainability</h3>
            <Bar data={horizontalBarData} options={{ responsive: true }} />
          </div>
          <div className="actions-container">
            
            <h2>Recommended Buys</h2>
              <ul className="no-bullets">
                {Object.entries(currentBuys).map(([key, value]) => (
                  !isAcceptedOrRejected('current_buys', key) && (
                    
                    <li key={key}>
                      <span className="key-button">{key}: {value} 
                        <>
                        <br />
                        <button className="accept-button" onClick={() => handleAccept('current_buys', key)}>Accept</button>
                        <button className="reject-button" onClick={() => handleReject('current_buys', key)}>Reject</button>
                      </>
                      </span>
                    </li>
                  )
                ))}
              </ul>

              <h2>Recommended Sells</h2>
              <ul className="no-bullets">
                {Object.entries(sells).map(([key, value]) => (
          
                    !isAcceptedOrRejected('sells', key) && (
                        <li key={key}>
                        <span className="key-button">{key}: {value} 
                      <>
                      <br />
                        <button className="accept-button" onClick={() => handleAccept('sells', key)}>Accept</button>
                        <button className="reject-button" onClick={() => handleReject('sells', key)}>Reject</button>
                      </>
                      </span>
                    </li>
                    )
                ))}
              </ul>
            </div>
            <div className="actions-container">
              <h2>Actions</h2>
              <h3>Accepted Recommendations</h3>
              <ul>
                {acceptedRecommendations.map((rec, index) => (
                  <li key={index}>{rec.type} - {rec.key}</li>
                ))}
              </ul>
              <h3>Rejected Recommendations</h3>
              <ul>
                {rejectedRecommendations.map((rec, index) => (
                  <li key={index}>{rec.type} - {rec.key}</li>
                ))}
              </ul>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Recommendations;