import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Home:React.FC = () => {
  return (
    <div className='w-full h-screen flex flex-col gap-[20px]'>
      <div className='w-full flex flex-wrap items-center gap-[10px]'>
        <Link to="/">回到首页</Link>
        <Link to="/foo">goto foo</Link>
        <Link to="/openBrowser">gotoOpenBrowser</Link>
        <Link to="/readFile">gotoReadFile</Link>
        <Link to="/todolist" >gotoTodolist</Link>
        <Link to="/loginReduxDemo" >loginReduxDemo</Link>
        <Link to="/result/404">404</Link>
        <Link to="/abc">error page</Link>
        <Link to="/myupload">my upload</Link>
      </div>

      <Outlet />
    </div>
  );
};

export default Home;
