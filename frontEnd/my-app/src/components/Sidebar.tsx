import { Link } from 'react-router-dom';
import './Sidebar.css';
import { useAuth0 } from '@auth0/auth0-react';

interface SidebarProps {
  user: {
    name: string;
  } | null;
}

function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth0();

  return (
    <div className="sidebar">
      <ul>
      {isAuthenticated && (
          <>
            <li>Welcome, {user?.nickname}</li>
            <li><Link to="/investments">Overview</Link></li>
            <li><Link to="/preferences">Preferences</Link></li>
            <li><Link to="/recommendations">Recommendations</Link></li>
            <br />
            <br />
            <br />
            <li><Link to="/search" className='sidebarfinance'>Link with Plaid</Link></li>
            <li><Link to="/search" className='sidebarfinance'>Link with Robinhood</Link></li>
            <br />
            <br />
            <li><button className='logout-button' onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button></li>

          </>
        )}
          <li><Link to="/search">Search</Link></li>

      </ul>
    </div>
  );
}

export default Sidebar;