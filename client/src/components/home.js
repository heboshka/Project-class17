import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome To houses page</h1>
      <div >
        <NavLink className="Nav_link" to="/houses">Houses</NavLink>
        <NavLink className="Nav_link" to="/contribute">Contribute</NavLink>
      </div>
    </div>
  );
};

export default Home;