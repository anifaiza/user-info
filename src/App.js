import React from 'react';
import UserInfo from './Pages/UserList/UserInfo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<UserInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
