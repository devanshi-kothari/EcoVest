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
        <li><Link to="/search">Search</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;