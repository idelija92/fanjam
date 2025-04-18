import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Bands from './pages/Bands';
import Events from './pages/Events';
import Users from './pages/Users';
import CreateBand from './pages/CreateBand';
import CreateEvent from './pages/CreateEvent';
import CreateUser from './pages/CreateUser';

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

      </Routes>
    </Router>
  );
}

export default App;
