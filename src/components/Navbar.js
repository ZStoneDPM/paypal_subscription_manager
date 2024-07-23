import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/create-subscription">Create Subscription</Link></li>
      <li><Link to="/manage-subscriptions">Manage Subscriptions</Link></li>
    </ul>
  </nav>
);

export default Navbar;
