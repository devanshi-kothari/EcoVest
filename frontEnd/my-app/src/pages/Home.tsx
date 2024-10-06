import Sidebar from '../components/Sidebar';
import './Home.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';

function Home() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userId");
    if (isAuthenticated && user && !isLoggedIn) {
      registerUserInDB(user);
    }
    if (user) {
      localStorage.setItem("userId", user.nickname);
    }
  }, [isAuthenticated, user]);

  
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1>Sustainability That Grows: Invest with Purpose</h1>
        <div className="links">
          <Link to="/login">Login</Link>  
        </div>
      </div>
    </div>
  );
}

export default Home;