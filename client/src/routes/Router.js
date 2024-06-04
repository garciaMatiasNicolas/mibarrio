import React from 'react';
import { BrowserRouter as Router, Routes, Route, /* Navigate */ } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/Login';
import Dashboard from '../pages/Dashboard/Dashboard';

/* const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined && token !== '';
}; */

/* const PrivateRoute = ({element}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  } else {
    return {element}
  }

}; */


// Router principal
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>} />} /> */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
