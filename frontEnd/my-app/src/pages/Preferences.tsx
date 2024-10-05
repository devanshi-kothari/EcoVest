import './Home.css';
import { Link } from 'react-router-dom';
import Search from './Search';
import Sidebar from '../components/Sidebar';

function Preferences() {
  return (
    
    <div className="home-container">
    <Sidebar />
      <div className='content'>
        Set your preferences here:
        
      </div>
    </div>
  );
}

export default Preferences;