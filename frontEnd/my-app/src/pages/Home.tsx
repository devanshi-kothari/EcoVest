import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="content">
        <h1>Sustainability That Grows: Invest with Purpose</h1>
        <div className="links">
          <Link to="/login">Login</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;