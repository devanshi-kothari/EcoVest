import './Home.css';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

// Overview Page
function Investments() {
  return (
    <div className="home-container">
      <Sidebar />
      <div className='content'>
      Hello, welcome to your investments.
      
      </div>

    </div>
  );
}

export default Investments;