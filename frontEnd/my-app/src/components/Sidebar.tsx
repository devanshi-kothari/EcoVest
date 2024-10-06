import { Link } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  user: {
    name: string;
  } | null;
}

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/investments">Overview</Link></li>
        <li><Link to="/preferences">Preferences</Link></li>
        <li><Link to="/recommendations">Recommendations</Link></li>
        <li><Link to="/search">Search</Link></li>
        <br />
        <br />
        <br />
        <li><Link to="/search" className='sidebarfinance'>Link with Plaid</Link></li>
        <li><Link to="/search" className='sidebarfinance'>Link with Robinhood</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;