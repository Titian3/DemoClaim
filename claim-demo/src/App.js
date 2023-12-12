// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import SubmitClaim from './SubmitClaim';
import RetrieveClaim from './RetrieveClaim';

function App() {
  return (
    <Router>
      <Nav /> {/* Include the Nav component */}
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<SubmitClaim />} />
          <Route path="/retrieve-claim" element={<RetrieveClaim />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
