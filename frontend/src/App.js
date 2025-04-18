import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bands" element={<Bands />} />
        <Route path="/events" element={<Events />} />
        <Route path="/users" element={<Users />} />
        <Route path="/bands/create" element={<CreateBand />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/bands/edit/:id" element={<EditBand />} />
        <Route path="/events/edit/:id" element={<EditEvent />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
