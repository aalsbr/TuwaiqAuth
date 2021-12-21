import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import jwt_decode from "jwt-decode";
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import User from './pages/User';
import NotFound from './pages/Page404';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';
import LoginPublic from './pages/LoginPublic';
import RegisterPublic from './pages/RegisterPublic';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element:(localStorage.getItem("token") ?(jwt_decode(localStorage.getItem('token')).role==='admin'? <DashboardApp />:<Settings />):<Navigate to="/login" /> )},
        { path: 'user', element:localStorage.getItem("token") ? (jwt_decode(localStorage.getItem('token')).role==='admin'? <User />:<Settings />):<Navigate to="/login" /> },
        { path: 'order', element:localStorage.getItem("token") ? (jwt_decode(localStorage.getItem('token')).role==='admin'? <Orders />:<Settings />):<Navigate to="/login" /> },
        { path: 'settings', element:localStorage.getItem("token") ? <Settings />:<Navigate to="/login" /> },
        


      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'landing', element: <LandingPage /> },
        { path: 'landing/:id', element: <LandingPage /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'login/:id', element: <LoginPublic /> },
        { path: 'register/:id', element: <RegisterPublic /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element:<Navigate to="/landing" />},
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
