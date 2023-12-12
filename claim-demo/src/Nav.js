// Nav.js

import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/">Submit Claim</Link>
        </li>
        <li>
          <Link to="/retrieve-claim">Retrieve Claim</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
