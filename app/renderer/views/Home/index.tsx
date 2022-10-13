import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      home component
      <br />
      <Link to="/foo">goto foo</Link>
      <br />
      <Link to="/openBrowser">gotoOpenBrowser</Link>
      <br />
      <Link to="/readFile">gotoReadFile</Link>
    </div>
  );
};

export default Home;
