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
import EditSetlist from './pages/EditSetlist';
import About from './pages/About';
import { AuthProvider } from './context/AuthContext';
import './App.css'; // For full-height CSS //added rc
import 'bootstrap/dist/css/bootstrap.min.css'; // added rc
import { Button, Navbar, Nav } from 'react-bootstrap'; //added rc


function App() {
  return (

    <AuthProvider>
      <Router>
      <div className="d-flex flex-column min-vh-100"> {/* //Added Rc */}
        <Header />{/* //Added Rc */}
        <main className="flex-fill py-3"> {/* //Added Rc */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bands" element={<Bands />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId/winners" element={<EventWinnersPage />} />
          <Route path="/about" element={<About />} />

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
            path="/events/:eventId/setlist"
            element={
              <ProtectedRoute requiredRoles={['BAND']}>
                <EditSetlist />
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
        </main> {/* //Added Rc */}

 <footer className="bg-light text-center text-lg-start mt-auto py-3 border-top"> {/* //Added Rc */}
            <div className="container text-center"> {/* //Added Rc */}
              <span className="text-muted">&copy; {new Date().getFullYear()} FanJam. All rights reserved.</span>
            </div> {/* //Added Rc */}
          </footer>  {/* //Added Rc */}
        </div> {/* //Added Rc */}


        <ToastContainer position="top-center" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}


export default App;
