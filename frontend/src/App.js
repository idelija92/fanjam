import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Bands from './pages/Bands';
import Events from './pages/Events';
import Users from './pages/Users';
import CreateBand from './pages/CreateBand';
import CreateEvent from './pages/CreateEvent';
import CreateUser from './pages/CreateUser';
import EditBand from './pages/EditBand';
import EditEvent from './pages/EditEvent';
import EditUser from './pages/EditUser';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminUsers from './pages/AdminUsers';
import Profile from './pages/Profile';
import EventVotingPage from './pages/EventVotingPage';
import EventWinnersPage from './pages/EventWinnersPage';
import BandDashboard from './pages/BandDashboard';
import VenueDashboard from './pages/VenueDashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bands" element={<Bands />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId/winners" element={<EventWinnersPage />} />

          <Route
            path="/events/:eventId/vote"
            element={
              <ProtectedRoute requiredRoles={['USER', 'ADMIN']}>
                <EventVotingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bands/create"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <CreateBand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/create"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/create"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'VENUE']}>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bands/edit/:id"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <EditBand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/edit/:id"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'VENUE', 'BAND']}>
                <EditEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/band/dashboard"
            element={
              <ProtectedRoute requiredRoles={['BAND']}>
                <BandDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/venue/dashboard"
            element={
              <ProtectedRoute requiredRoles={['VENUE']}>
                <VenueDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
