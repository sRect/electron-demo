import React from 'react';
import lessStyle from './title.less';
import testImg from '@/assets/test.jpg';

interface IProps {
  text: string;
  styles: React.CSSProperties;
}

function Title({ text, styles }: IProps) {
  return (
    <div className={lessStyle.wrap}>
      <b className={lessStyle.b}>child components:</b> <span style={styles}>{text}</span>
      <img src={testImg} width="100" height="100" alt="img"></img>
    </div>
  );
}

export default Title;
