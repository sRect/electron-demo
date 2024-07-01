import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Home:React.FC = () => {
  return (
    <div>
      <Link to="/">回到首页</Link>
      <br />
      <Link to="/foo">goto foo</Link>
      <br />
      <Link to="/openBrowser">gotoOpenBrowser</Link>
      <br />
      <Link to="/readFile">gotoReadFile</Link>
      <br />
      <Link to="/todolist" >gotoTodolist</Link>
      <br />
      <Link to="/loginReduxDemo" >loginReduxDemo</Link>
      <br />
      <Link to="/result/404">404</Link>
      <br />
      <Link to="/abc">error page</Link>
      <br />

      <Outlet />
    </div>
  );
};

export default Home;
