import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      home component
      <br />
      <Link to="/foo">goto foo</Link>
    </div>
  );
};

export default Home;
