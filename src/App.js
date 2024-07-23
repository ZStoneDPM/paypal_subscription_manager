import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateSubscription from './pages/CreateSubscription';
import ManageSubscriptions from './pages/ManageSubscriptions';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-subscription" element={<CreateSubscription />} />
        <Route path="/manage-subscriptions" element={<ManageSubscriptions />} />
      </Routes>
    </div>
  );
}

export default App;
