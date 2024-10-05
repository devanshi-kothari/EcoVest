import './Home.css';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

// Overview Page
function Investments() {
  return (
    <div className="home-container">
      <Sidebar />
      <div className='content'>
      <h2> Hello, welcome to your investments. </h2>
      
      </div>

    </div>
  );
}

export default Investments;