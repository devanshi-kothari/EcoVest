import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './pages/Home';
import Investments from './pages/Investments';
import Recommendations from './pages/Recommendations';
import Search from './pages/Search';
import Preferences from './pages/Preferences';

// const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/preferences",
    element: <Preferences />
  },
  {
    path: "/investments",
    element: <Investments />
  },
  {
    path: "/recommendations",
    element: <Recommendations />
  },
  {
    path: "/search",
    element: <Search />
  },
]);

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-o58o3flhjkvh2etf.us.auth0.com"
    clientId="4xsOtjKYXHPp7L803zj6oHg5x75PMawr"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);