import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { shell } from 'electron';

const OpenBrowser = () => {
  const history = useHistory();

  const handleOpenBrowser = () => {
    shell.openExternal('https://baidu.com');
  };

  const gotoHome = () => {
    history.push('/');
  };

  return (
    <div>
      <button onClick={handleOpenBrowser}>打开浏览器</button>
      <br />
      <button onClick={gotoHome}>回到主页</button>
    </div>
  );
};

export default memo(OpenBrowser);
