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
import { AuthProvider } from './context/AuthContext';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/bands"
            element={
              <ProtectedRoute>
                <Bands />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <Users />
              </ProtectedRoute>
            }
          />
          <Route path="/bands/create" element={<CreateBand />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route
            path="/users/create"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route path="/bands/edit/:id" element={<EditBand />} />
          <Route path="/events/edit/:id" element={<EditEvent />} />
          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminUsers />
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
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </Router>
    </AuthProvider>

  );
}

export default App;
