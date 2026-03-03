import { createBrowserRouter } from "react-router";
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';



export const router = createBrowserRouter([
  { path: "/", Component: HomePage,  },
  { path: "signup", Component: Signup },
  { path: "/login", Component: Login },
]);

