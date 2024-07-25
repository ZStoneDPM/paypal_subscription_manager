import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <ul className="flex space-x-4">
      <li>
        <Link to="/" className="text-white hover:text-gray-400">Home</Link>
      </li>
      <li>
        <Link to="/manage-subscriptions" className="text-white hover:text-gray-400">Manage Subscriptions</Link>
      </li>
      <li>
        <Link to="/bulk-create-subscription" className="text-white hover:text-gray-400">Create Subscription</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
