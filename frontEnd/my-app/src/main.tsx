import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Investments from "./pages/Investments.tsx";
import Preferences from "./pages/Preferences.tsx";
import Search from "./pages/Search.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/investments",
      element: <Investments />
    },
    {
      path: "/preferences",
      element: <Preferences />
    },
    {
      path: "/search",
      element: <Search />
    },
])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
