import React, { FC, memo, useState } from 'react';
import { readFile, getAppPath } from '@/utils';

interface IProps {
  [propsName: string]: unknown;
}

const ReadFile: FC<IProps> = () => {
  const [content, setContent] = useState<string>('');

  const handleReadFile = async (): Promise<void> => {
    if (content) return;

    // 相对路径也可以读取
    // 绝对路径可以读取
    // const result: string = await readFile(
    //   '/Users/fangchaoqun/code/electron-demo/app/renderer/static/test.txt'
    // );

    // 这种方式也可以读取
    // const result: string = await readFile(path.join(process.cwd(), 'app/renderer/static/test.txt'));

    const appPath: string = await getAppPath();
    const result: string = await readFile(`${appPath}/app/renderer/static/test.txt`);

    setContent(result);
  };

  return (
    <>
      <button onClick={handleReadFile}>readFile</button>
      <br />
      <div>
        <p>读取结果：</p>
        <p>{content}</p>
      </div>
    </>
  );
};

export default memo(ReadFile);
