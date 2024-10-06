import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './Home.css';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('userId');
    if (isAuthenticated && user && !isLoggedIn) {
      console.log(user);
      //registerUserInDB(user);
    }
    if (user) {
      // localStorage.setItem('userId', user.nickname);
    }
  }, [isAuthenticated, user]);

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        ) : (
          <div>
            {user && <h2>Hello, {user.nickname}</h2>}
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
            </div>
        )}
      </div>
    </div>
  );
}

export default Home;